<template>
  <div style="width: 100%; height: 100%;">
    <template
        v-if="canRender"
        >
    <q-tree
        :nodes="pdfs[props.pdfName].Document"
        dense
        node-key="label"
        v-model:expanded="expanded"
        >
        <template v-slot:default-header="{ key, node }">
          <template v-if="!node.isAddLabel">
            <pdf-tree-node :node="key" ></pdf-tree-node>
          </template>
          <q-chip size="sm" v-else square>+</q-chip>
        </template>
      </q-tree>
      </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import PdfTreeNode from './PdfTreeNode.vue'
  import { usePDFStore } from '../../stores/example-store';
  import { storeToRefs } from 'pinia';

  const PDFS = usePDFStore();
  const { canRender, pdfs } = storeToRefs(PDFS);

  interface Props {
    pathOfPDF: string;
    pdfName: string;
  }

  const props = withDefaults(defineProps<Props>(),
    {
      pdfName: 'primary'
    }
  );

  const toRender = pdfs.canRender;

  const expanded = ref<string[]>(
    ['Document', 'Page 1']
  );

  //const simple = ref([{
  //    label: 'Document',
  //    color: 'blue',
  //    children: [
  //      {
  //        label: 'Page 1',
  //        color: 'green',
  //        expandable: true,
  //        children: [
  //          {
  //            label: 'Paragraph 1',
  //            color: 'green',
  //          },
  //          {
  //            label: 'Paragraph 2',
  //            color: 'green',
  //          },
  //          {
  //            label: 'Paragraph 3',
  //            color: 'green',
  //            children: [
  //              {
  //                label: 'word 1',
  //                color: 'green',
  //              },
  //              {
  //                label: 'word 2',
  //                color: 'green',
  //              },
  //              {
  //                label: 'word 3',
  //                color: 'green',
  //              },
  //      {
  //        label: 'Add Item',
  //        color: 'blue',
  //        isAddLabel: true
  //      }
  //            ]
  //          },
  //      {
  //        label: 'Add Item',
  //        color: 'blue',
  //        isAddLabel: true
  //      }
  //        ]
  //      },
  //      {
  //        label: 'Page 2',
  //        color: 'green',
  //      },
  //      {
  //        label: 'Page 3',
  //        color: 'green',
  //      },
  //      {
  //        label: 'Add Item',
  //        color: 'blue',
  //        isAddLabel: true
  //      }
  //    ]
  //}]);

</script>
