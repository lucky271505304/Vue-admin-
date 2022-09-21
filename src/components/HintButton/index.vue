<template>
  <a  :title="title" style="margin:10px">
      <el-button type="primary" v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name:'HintButton',
//   鼠标一上去提示
  props: ["title"]
}
</script>

<style>

</style>