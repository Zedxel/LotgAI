<template>
  <div style="height: 100%;">
    <div v-if="pdfs.pdfs[props.pdfName] === null">
      loading...
    </div>
    <div v-else
      style="height: 100%;">
      <q-virtual-scroll
          style="height:100%;
                 width:100%;"
          :items=pdfs.pdfs[props.pdfName]?.Pages
          v-slot="{ item, index }"
        >
          <pdf-page
            :pdfName="props.pdfName"
            :pdfPage="item"
            :pageNumber="index">
          </pdf-page>
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as pdfjsLib from 'pdfjs-dist';
  import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
  import PdfPage from './PdfPage.vue';
  import { usePDFStore } from '../../stores/example-store';

  const pdfs = usePDFStore();

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

  interface Props {
    pathOfPDF: string;
    pdfName: string;
  }

  const props = withDefaults(defineProps<Props>(),
    {
      pdfName: 'primary'
    }
  );

  pdfs.loadPdf(props.pathOfPDF, props.pdfName);
</script>
