<template>
  <div class="textBox" v-touch-pan.prevent.mouse="MoveBox">
    <div class="top border" v-touch-pan.prevent.mouse="ResizeUp"> </div>
    <div class="top-right border" v-touch-pan.prevent.mouse="TopRight"> </div>
    <div class="right border" v-touch-pan.prevent.mouse="ResizeRight"> </div>
    <div class="bottom-right border" v-touch-pan.prevent.mouse="BottomRight"> </div>
    <div class="bottom border" v-touch-pan.prevent.mouse="ResizeDown"> </div>
    <div class="bottom-left border" v-touch-pan.prevent.mouse="BottomLeft"> </div>
    <div class="left border" v-touch-pan.prevent.mouse="ResizeLeft"> </div>
    <div class="top-left border" v-touch-pan.prevent.mouse="TopLeft"> </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const box = ref<TextBox>({
    location: {
      x: 0,
      y: 0
    },
    size: {
      x: 500,
      y: 100
    }
  });

  interface TextBox
  {
    location: {
      x: number,
      y: number
    },
    size: {
      x: number,
      y: number
    }
  }

  function MoveBox({ evt, ...newInfo }: {[key: string]: MouseEvent})
  {
    evt;
    box.value.location.x += newInfo.delta.x;
    box.value.location.y += newInfo.delta.y;
  }

  function TopRight({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    ResizeUp({evt, ...newInfo})
    ResizeRight({evt, ...newInfo})
  }

  function TopLeft({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    ResizeUp({evt, ...newInfo})
    ResizeLeft({evt, ...newInfo})
  }

  function BottomRight({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    ResizeDown({evt, ...newInfo})
    ResizeRight({evt, ...newInfo})
  }

  function BottomLeft({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    ResizeDown({evt, ...newInfo})
    ResizeLeft({evt, ...newInfo})
  }

  function ResizeRight({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    evt;
    box.value.size.x += newInfo.delta.x;
  }

  function ResizeDown({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    evt;
    box.value.size.y += newInfo.delta.y;
  }

  function ResizeLeft({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    evt;
    box.value.size.x -= newInfo.delta.x;
    box.value.location.x += newInfo.delta.x;
  }

  function ResizeUp({ evt, ...newInfo }: {[key: string]: MouseEvent} )
  {
    evt;
    box.value.size.y -= newInfo.delta.y;
    box.value.location.y += newInfo.delta.y;
  }
 </script>

<style lang="scss">
  .textBox {
    width: round(down, v-bind('box.size.x') * 1px, 1px);
    height: round(down, v-bind('box.size.y') * 1px, 1px);
    top: round(down, v-bind('box.location.y') * 1px, 1px);
    left: round(down, v-bind('box.location.x') * 1px, 1px);
    border: black;
    position: absolute;
    background: hsl(208deg 100% 50% / 20%);
    cursor: move;
  }

  .border {
    position: absolute;
    background: hsl(208deg 100% 50% / 50%);
    height: 5px;
    z-index: 1;
  }

  .top-right {
    width: 5px;
    height: 5px;
    top:0;
    right:0;
    z-index: 2;
    cursor: ne-resize;
  }

  .top-left {
    width: 5px;
    height: 5px;
    top:0;
    left:0;
    z-index: 2;
    cursor: nw-resize;
  }

  .bottom-right {
    width: 5px;
    height: 5px;
    bottom:0;
    right:0;
    z-index: 2;
    cursor: se-resize;
  }

  .bottom-left {
    width: 5px;
    height: 5px;
    bottom:0;
    left:0;
    z-index: 2;
    cursor: sw-resize;
  }

  .top {
    width: 100%;
    height: 5px;
    top:0;
    cursor: ns-resize;
  }

  .bottom {
    width:100%;
    height: 5px;
    bottom: 0px;
    cursor: ns-resize;
  }

  .left {
    width: 5px;
    height:100%;
    left: 0px;
    cursor: ew-resize;
  }

  .right {
    width: 5px;
    height:100%;
    right: 0px;
    cursor: ew-resize;
  }

</style>
