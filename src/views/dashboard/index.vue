<template>
   <div>
     <Card/>
     <sale/>
   </div>
</template>

<script>
import Card from "./Card"
import sale from "./sale"
export default {
  name: 'Dashboard',
  components:{
    Card,
    sale
  }
}
</script>

<style lang="scss" scoped>

</style>
