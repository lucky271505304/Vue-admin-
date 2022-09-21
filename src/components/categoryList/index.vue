<template>
   <div>
       <!-- inline行内表单 -->
   <el-form :inline="true"  class="demo-form-inline" :model="cForm">
  <el-form-item label="一级分类">
    <el-select placeholder="请选择" value="" v-model="cForm.cate1Id" @change="handler1" :disabled="show">
      <el-option :label="c1.name" :value="c1.id" v-for="c1 in catagoryList1" :key="c1.id"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="二级分类">
    <el-select placeholder="请选择" value="" v-model="cForm.cate2Id" @change="handler2" :disabled="show">
    <el-option :label="c2.name" :value="c2.id" v-for="c2 in categoryList2" :key="c2.id"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="三级分类" >
    <el-select placeholder="请选择" value="" v-model="cForm.cate3Id" @change="handler3" :disabled="show">
      <el-option :label="c3.name" :value="c3.id" v-for="c3 in categoryList3" :key="c3.id"></el-option>
    </el-select>
  </el-form-item>
</el-form>
   </div>
</template>

<script>
export default {
  name: 'categoryList',
  props:['show'],
  data(){
      return{
          catagoryList1: [],
          categoryList2: [],
          categoryList3: [],
           cForm:{
           cate1Id: '',
           cate2Id: '',
           cate3Id: '',
        }
      }
  },
  mounted(){
    this.getData();
  },
  methods:{
    async  getData(){
          let result = await this.$API.attr.reqCategory1();
            if(result.code==200){
                this.catagoryList1 = result.data;
            }
           
      },
     async handler1(){
          //解析出  1id；
          this.categoryList2=[];
          this.categoryList3=[];
          this.cForm.cate2Id = '';
          this.cForm.cate3Id = '';
          const {cate1Id} = this.cForm;
          this.$emit('getCategoryId',{categoryId:cate1Id,level:1});
         let result = await this.$API.attr.reqcategory2(cate1Id);
             if(result.code==200){
                 this.categoryList2 = result.data;
             }
      },
     async handler2(){
         this.categoryList3 = [];
         this.cForm.cate3Id='';
          const {cate2Id} = this.cForm;
          this.$emit('getCategoryId',{categoryId:cate2Id,level:2});
          let result = await this.$API.attr.reqcategory3(cate2Id);
          if(result.code==200){
              this.categoryList3 = result.data;
          }
      },
      handler3(){
          const {cate3Id} = this.cForm;
          this.$emit('getCategoryId',{categoryId:cate3Id,level:3});
      }
  }
}
</script>

<style>

</style>