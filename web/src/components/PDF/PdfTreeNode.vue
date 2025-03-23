<template>
  <div>{{props.node}}</div>
</template>

<script setup lang="ts">
  interface Props {
    node: string
  }

  const props = withDefaults(defineProps<Props>(),
    {
    }
  );

</script>

