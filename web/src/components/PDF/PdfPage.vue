<template>
  <div style="padding: 10px">
    <div :style="'width: ' + pageWidth + 'px; height: ' + pageHeight + 'px; position: relative;'">
      <canvas
        style="width: 100%; height:100%;"
        ref="canvas" />
      <div
          class="textLayer"
          :style="'width: ' + pageWidth + 'px; height: ' + pageHeight + 'px;'"
          ref="tempTextLayer">
      </div>
      <PdfTextBox />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PDFPageProxy, TextLayer } from 'pdfjs-dist';
  import { usePDFStore } from '../../stores/example-store';
  import { useTemplateRef, onMounted, markRaw, ref } from 'vue';
  import PdfTextBox from './PdfTextBox.vue';

  const pdf = usePDFStore();

  const pageWidth  = ref(10);
  const pageHeight = ref(10);
  const scale = ref(1.2);


  interface Props
  {
    pdfName: string
    pageNumber: number
    pdfPage: PDFPageProxy | null
  }

  const props = withDefaults(defineProps<Props>(),
    {
    }
  );

  const canvas = useTemplateRef<HTMLCanvasElement | null>('canvas');
  const tempTextLayer = useTemplateRef('tempTextLayer');

  onMounted(async () => {
    if(canvas != undefined){
      const context = markRaw<CanvasRenderingContext2D>(
        (canvas.value?.getContext('2d')) as CanvasRenderingContext2D
      );

      const page = await pdf.getPage(props.pdfName, props.pageNumber);

      if(page != null)
      {
        var viewport = page.getViewport({ scale: scale.value });

        // Set dimensions to Canvas
        var resolution =  1; // for example

        if(canvas.value != null){
          canvas.value.height = resolution * viewport.height; //actual size
          canvas.value.width  = resolution * viewport.width;

          canvas.value.style.height = ''+viewport.height; //showing size will be smaller size
          canvas.value.style .width = ''+viewport.width;
        }

        pageWidth.value = resolution * viewport.width;
        pageHeight.value = resolution * viewport.height;

        // Prepare object needed by render method
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: [resolution, 0, 0, resolution, 0, 0] // force it bigger size
        };

        // Render PDF page
        page.render(renderContext).promise.then(
          ()=>{
            return page.getTextContent();
        }).then(
          (textContent)=>{

                if(tempTextLayer.value == null) return;
                if(canvas.value == null) return;

                console.log(textContent);

                const textLayer = new TextLayer({

                textContentSource: textContent,
                container: tempTextLayer.value as HTMLElement,
                viewport: viewport
          });

          textLayer.render();

        });
      }
    }
    //await props.pdfPage?.render(context).promise;
  });


  //pdf.getPage(props.pdfName, props.pageNumber);

</script>

<style lang="scss">
.textLayer{
  --scale-factor: v-bind('scale');
  position:absolute;
  text-align:initial;
  inset:0;
  overflow:clip;
  opacity:1;
  line-height:1;
  -webkit-text-size-adjust:none;
     -moz-text-size-adjust:none;
          text-size-adjust:none;
  forced-color-adjust:none;
  transform-origin:0 0;
  caret-color:CanvasText;
  z-index:0;
}

.textLayer.highlighting{
    touch-action:none;
  }

.textLayer :is(span,br){
    color:transparent;
    position:absolute;
    white-space:pre;
    cursor:text;
    transform-origin:0% 0%;
  }

.textLayer  > :not(.markedContent),.textLayer .markedContent span:not(.markedContent){
    z-index:1;
  }

.textLayer span.markedContent{
    top:0;
    height:0;
  }

.textLayer span[role="img"]{
    -webkit-user-select:none;
       -moz-user-select:none;
            user-select:none;
    cursor:default;
  }

.textLayer .highlight{
    --highlight-bg-color:rgb(180 0 170 / 0.25);
    --highlight-selected-bg-color:rgb(0 100 0 / 0.25);
    --highlight-backdrop-filter:none;
    --highlight-selected-backdrop-filter:none;
  }

@media screen and (forced-colors: active){

.textLayer .highlight{
      --highlight-bg-color:transparent;
      --highlight-selected-bg-color:transparent;
      --highlight-backdrop-filter:var(--hcm-highlight-filter);
      --highlight-selected-backdrop-filter:var(
        --hcm-highlight-selected-filter
      );
  }
    }

.textLayer .highlight{

    margin:-1px;
    padding:1px;
    background-color:var(--highlight-bg-color);
    -webkit-backdrop-filter:var(--highlight-backdrop-filter);
            backdrop-filter:var(--highlight-backdrop-filter);
    border-radius:4px;
  }

.appended:is(.textLayer .highlight){
      position:initial;
    }

.begin:is(.textLayer .highlight){
      border-radius:4px 0 0 4px;
    }

.end:is(.textLayer .highlight){
      border-radius:0 4px 4px 0;
    }

.middle:is(.textLayer .highlight){
      border-radius:0;
    }

.selected:is(.textLayer .highlight){
      background-color:var(--highlight-selected-bg-color);
      -webkit-backdrop-filter:var(--highlight-selected-backdrop-filter);
              backdrop-filter:var(--highlight-selected-backdrop-filter);
    }

.textLayer ::-moz-selection{
    background:rgba(0 0 255 / 0.25);
    background:color-mix(in srgb, AccentColor, transparent 75%);
  }

.textLayer ::selection{
    background:rgba(0 0 255 / 0.25);
    background:color-mix(in srgb, AccentColor, transparent 75%);
  }

.textLayer br::-moz-selection{
    background:transparent;
  }

.textLayer br::selection{
    background:transparent;
  }

.textLayer .endOfContent{
    display:block;
    position:absolute;
    inset:100% 0 0;
    z-index:0;
    cursor:default;
    -webkit-user-select:none;
       -moz-user-select:none;
            user-select:none;
  }

.textLayer.selecting .endOfContent{
    top:0;
  }
</style>
