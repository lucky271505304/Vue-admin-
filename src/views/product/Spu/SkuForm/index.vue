<template>
   <div>
     <el-form ref="form" label-width="80px">
       <el-form-item label="SPU名称">{{row1.spuName}}</el-form-item>
       <el-form-item label="SKU名称"> 
         <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input> 
       </el-form-item>
       <el-form-item label="价格">
         <el-input placeholder="价格(元素)" type="number" v-model="skuInfo.price"></el-input>
       </el-form-item>
       <el-form-item label="重量(千克)">
         <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
       </el-form-item>
       <el-form-item label="规格描述">
         <el-input type="textarea" rows="10" v-model="skuInfo.skuDesc"></el-input>
         </el-form-item>
       <el-form-item label="平台属性">
         <el-form :inline="true" ref="form"  label-width="80px">
           <el-form-item :label="attr.attrName" v-for="attr in AttrInfo" :key="attr.id">
               <el-select  placeholder="请选择" v-model="attr.attrIdAndValueId">
                 <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
               </el-select>
           </el-form-item>                 
         </el-form>
       </el-form-item>
       <el-form-item label="售卖属性">
         <el-form :inline="true" ref="form" label-width="80px">
           <el-form-item :label="sale.saleAttrName" v-for="sale in spuSaleList" :key="sale.id">
               <el-select  placeholder="请选择" v-model="sale.attrIdAndValueId">
                 <el-option :label="saleValue.saleAttrValueName" :value="`${sale.id}:${saleValue.id}`" v-for="saleValue in sale.spuSaleAttrValueList" :key="saleValue.id"></el-option>
               </el-select>
           </el-form-item>
         </el-form>
       </el-form-item>
       <el-form-item label="图片列表">
      <el-table style="width: 100%" border :data="spuImgList" @selection-change="handleSelectionChange"> 
        <el-table-column type="selection" prop="prop" width="width"> </el-table-column>
        <el-table-column prop="prop" label="图片" width="width"> 
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column prop="imageName" label="名称" width="width"> </el-table-column>
        <el-table-column prop="prop" label="操作" width="width"> 
          <template slot-scope="{row,$index}">
            <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
             <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
       </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
       </el-form-item>

     </el-form>
   </div>
</template>

<script>
export default {
  name:'SkuForm',
  data(){
    return{
      row1:{},
      imageList:[],
      spuImgList:[],
      spuSaleList:[],
      AttrInfo: [],
      skuInfo: {
        //第一类 父组件给的可以直接收集到
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类  需要通过数据双向绑定 
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类  需要自己写代码
        //默认图片
        skuDefaultImg: "",
        //收集图片的
          skuImageList: [
            //    {
            //   id: 0,
            //   imgName: "string",
            //   imgUrl: "string",
            //   isDefault: "string",
            //   skuId: 0,
            //   spuImgId: 0
            // }
          ],
          //收集销售属性列表数据
          skuSaleAttrValueList: [
            {

              // saleAttrId: 0,
              // saleAttrValueId: 0,
             }
          ],
          //平台属性
        skuAttrValueList: [
          {
            // attrId: 0,
            // valueId: 0,
             }
            ],
         },
         row1:{

         }
    }
  },
  methods:{
   async getData(category1Id,category2Id,row){
        // category3Id: 0,
        // spuId: 0,
        // tmId: 0,
        this.skuInfo.category3Id = row.category3Id;
        this.skuInfo.spuId = row.id;
        this.skuInfo.tmId = row.tmId;
        this.row1 = row
        //============================
      let result = await this.$API.spu.reqSkuImg(row.id);
      if(result.code==200){
        //加上isDefault字段
        // this.spuImgList = result.data;
        let list = result.data;
        list.forEach(item=>{
          item.isDefault = 0;
        });
        this.spuImgList=list;
      }
      let result1 = await this.$API.spu.reqSpuSaleAttr(row.id)
      if(result1.code==200){
        this.spuSaleList =result1.data;
      }
      let result2 = await this.$API.spu.reqAttrInfo(category1Id,category2Id,row.category3Id);
            if(result2.code==200){
              this.AttrInfo = result2.data;
            }
    },
         handleSelectionChange(demo){
        this.imageList =  demo;
      },
      changeDefault(row){
        //排它
        this.spuImgList.forEach(item=>{
          item.isDefault =0;
        })
        row.isDefault =1;
        //收集默认图片地址
        this.skuInfo.skuDefaultImg = row.imgUrl;
      },
      cancel(){
        this.$emit('changeIS',0);
        //返回并清除数据
        Object.assign(this._data,this.$options.data());
      },
    async  save(){
        //整理参数 AttrInfo
        // const {AttrInfo,skuInfo} = this;
        // let arr = [];
        // AttrInfo.forEach(item=>{
        //   if(item.attrIdAndValueId){
        //  const [attrId,valueId] =  item.attrIdAndValueId.split(":");
        //  let obj ={attrId,valueId};
        //  arr.push(obj);
        //   }
        // })
        //    //整理好的参数赋值给 skuInfo  skuAttrValueLis
        //    skuInfo.skuAttrValueList = arr;
            const {AttrInfo,skuInfo,spuSaleList,spuImgList} = this;
             skuInfo.skuAttrValueList =  AttrInfo.reduce((prev,item)=>{
           if(item.attrIdAndValueId){
             const [attrId,valueId] =  item.attrIdAndValueId.split(":");
             prev.push({attrId,valueId})
           }
           return prev;
        },[]);
        //整理销售属性  spuSaleList  skuSaleAttrValueList
          skuInfo.skuSaleAttrValueList=spuSaleList.reduce((prev,item)=>{
               if(item.attrIdAndValueId){
             const [saleAttrId,saleAttrValueId] =  item.attrIdAndValueId.split(":");
               prev.push({saleAttrId,saleAttrValueId});
               }
               return prev;
          },[]);
          //整理图片属性  skuImageList
           skuInfo.skuImageList = spuImgList.map(item=>{
             return{
               imageName:item.imageName,
               imgUrl: item.imgUrl,
               isDefault: item.isDefault,
               spuImgId: item.id
             }
           });
           //发请求带给服务器
        let result=  await this.$API.spu.reqSaveSku(skuInfo);
        if(result.code==200){
          this.$message({type:'success',message:'成功'});
           this.$emit('changeIS',0);
        }
             
          

      }
  }
  
}
</script>

<style>

</style>



















