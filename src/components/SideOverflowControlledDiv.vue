<template>
    <div style="overflow: hidden;">
      <div style="overflow: auto;">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SideOverflowControlledDiv',
  data(){
    return {
    }
  },
}
</script>