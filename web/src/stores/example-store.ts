import { defineStore } from 'pinia';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { markRaw } from 'vue'

export const usePDFStore = defineStore('pdfLibrary', {
  state: () => ({
    pdfs: {} as DocumentDictionary,
    canRender: false
  }),
  getters: {
  },
  actions: {
    async getPage(name: string, pageNumber: number)
    {
      console.log('getting page');
      if(this.pdfs[name]?.Pages[pageNumber] == null)
      {
        const page = await this.pdfs[name]?.Proxy?.getPage(pageNumber);
        (this.pdfs[name] as DocumentRecord).Pages[pageNumber] = markRaw(page as PDFPageProxy);
        (this.pdfs[name] as DocumentRecord).Document[0].children.push({
          label: name+"-page-"+pageNumber
});
      }


      return this.pdfs[name]?.Pages[pageNumber] as PDFPageProxy;
    },
    loadPdf(path: string, name: string)
    {
      //Creates empty record
      this.pdfs[name] = null;

      //attempts to get document
      pdfjsLib.getDocument(path).promise.then(
        async (document) =>
        {
          const TempPages = [] as (PDFPageProxy | null)[];
          for(let i = 1; i <= document.numPages; i++)
          {
            TempPages[i] = null;
            //TempPages[i] = markRaw(await document.getPage(i));

          }
          //updates document
          this.pdfs[name] =
            {
              Proxy: markRaw(document),
              Pages: TempPages,
              Document: [
                {
                  label: name,
                  children: [
                    {
                      Number: 1,
                      label: name + '-page-' + 1,
                      children: [
                        {
                          label: name + '-page-' + 1 + "-" + "p" + "-" + 1,
                          location:
                          {
                            x:0,
                            y:0,
                          },
                          size:
                          {
                            x:100,
                            y:100
                          },
                          children: [
                            {
                              label: 'test',
                              location:
                              {
                                x:0,
                                y:0,
                              },
                              size:
                              {
                                x:100,
                                y:100
                              },
                            }
                          ]
                        }
                      ]

                    }
                  ]
                }
              ]
            }
            this.canRender = true;
        }
      )
    },
    loadPage(name: string, pageNumber: number) {
      this.pdfs[name]?.Proxy?.getPage(pageNumber);
      this.pdfs[name]?.Pages
    }
  },
});


interface DocumentDictionary
{
  [key: string]: DocumentRecord | null
};

interface DocumentRecord
{
  Proxy: PDFDocumentProxy | null
  Pages: (PDFPageProxy | null)[]
  Document: object//DocumentPage[]
}

interface DocumentPage
{
  Number: number,
  Label: string,
  TextBlock: TextBlock
}

interface TextBlock
{
  location: xy,
  size: xy,
  children: TextBlock[]
}

interface xy
{
  x: number,
  y: number
}
