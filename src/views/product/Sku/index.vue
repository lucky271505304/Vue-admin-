<template>
  <div>
    <el-table style="width: 100%" border :data="SkuList.records">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"> </el-table-column>
      <el-table-column  label="默认图片" width="120">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg"  style="width:100px;height:100px">
        </template>
         </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">  
        <template slot-scope="{row,$index}">
           <el-button type="success" icon="el-icon-sort-down" size="mini" v-if="row.isSale == 0" @click="cancelSale(row)"></el-button>
          <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="onSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"  @click="showDraw(row)"> </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
        </template>
         </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 15]"
      :page-size="limit"
      @current-change="getData"
      @size-change="handleSizeChange"
      layout="  prev, pager, next, jumper,->,total,sizes"
      :total="total"
      align="center">
    </el-pagination>
    <el-drawer  :visible.sync="drawer" :show-close="false" size="50%">
       <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{drawerList.skuName}}</el-col>
    </el-row>
      <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{drawerList.skuDesc}}</el-col>
    </el-row>
      <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{drawerList.price}}元</el-col>
    </el-row>
      <el-row>
      <el-col :span="5">平台属性</el-col>
      <el-col :span="16">
          <el-tag type="success" v-for = "attr in drawerList.skuAttrValueList" :key ="attr.id" style="margin-right:10px">{{attr.attrId}}--{{attr.valueId}}</el-tag>
      </el-col>
    </el-row>
       <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
        <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in drawerList.skuImageList" :key="item.id" >
        <img :src="item.imgUrl" style="width:291px;height:200px"/>
      </el-carousel-item>
    </el-carousel>
      </el-col>
    </el-row>
</el-drawer>
  </div>
</template>

<script>
export default {
   name: 'Sku',
   data(){
     return{
       page: 1,
       limit: 3,
       SkuList:[],
       total: 1,
       drawer: false,
       drawerList:{}
     }
   }, 
   mounted(){
     this.getData();
     this.getAAAA();
   },
   methods:{
    async getData(pages = 1){
      this.page = pages
       const {page,limit} = this;
       let result = await this.$API.sku.reqSku(page,limit);
       if(result.code==200){
         this.SkuList = result.data;
         this.limit = result.data.size;
         this.total = result.data.total;
       }
     },
     handleSizeChange(limit){
       this.limit = limit;
       this.getData();
     },
    async onSale(row){
       let result = await this.$API.sku.reqOnSale(row.id);
       if(result.code==200){
         row.isSale == 1;
         this.$message({type:'success',message:'成功'});
       }
     },
    async  cancelSale(row){
        let result = await this.$API.sku.reqcancelSale(row.id);
         if(result.code=200){
         row.isSale = 0;
         this.$message({type:'success',message:'成功'});
       }
     },
    async showDraw(row){
      this.drawer = true;
       let result  = await this.$API.sku.reqGetSku(row.id);
       if(result.code==200){
         this.drawerList = result.data;
       }
     }
 
   },
}
</script>

<style  scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-row .el-col-5{
      font-size:18px;
      text-align:right;
   }
   .el-col{
     margin:10px 10px;
   }
    >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>