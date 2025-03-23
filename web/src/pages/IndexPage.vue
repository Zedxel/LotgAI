<template>
  <q-page class="row items-center justify-evenly"
    >
    <div class="q-pa-md" style="height: calc(100vh - 50px); width: 100%;">
    <q-splitter
      v-model="splitter"
      style="
        height:100%;
        width:100%;
        overflow:hidden;
        border-radius:20px;"
      range="[10,80]"
    >
      <template v-slot:before>
          <div class="q-pa-md" style="background-color: aliceblue;
            width: 100%;
            height: 100%;
            " >
            <pdf-tree pathOfPDF="http://localhost:8080/pdfs/Laws of the Game 2024_25.pdf" pdfName="Trial" />
          </div>
        </template>
    <template v-slot:separator>
          <div style="background-color: lightgray; width: 5px;
            height: 100%;" >
          </div>
    </template>
        <template v-slot:after>
          <div class="col q-pa-md" style="background-color: aliceblue; width: 100%;
            height: 100%; " >
  <pdf-renderer pathOfPDF="http://localhost:8080/pdfs/Laws of the Game 2024_25.pdf" pdfName="Trial"/>
          </div>
        </template>
      </q-splitter>
      </div>
  </q-page>
</template>

<script setup lang="ts">
  //
  //<pdf-renderer pathOfPDF="http://localhost:8080/pdfs/Board Governance Policy.pdf" pdfName="Trial"/>
  //<pdf-renderer pathOfPDF="http://localhost:8080/pdfs/Laws of the Game 2024_25.pdf" pdfName="Trial"/>

  import { ref } from 'vue';
  import PdfRenderer from '../components/PDF/PdfRenderer.vue';
  import PdfTree from '../components/PDF/PdfTree.vue';
  const splitter = ref(20);

  defineOptions({
    name: 'IndexPage'
  });

</script>

<style>
.hiddenCanvasElement {
  position: absolute;
  height:0;
  width:0;
  top:0;
  z-index:-1;
}
</style>
