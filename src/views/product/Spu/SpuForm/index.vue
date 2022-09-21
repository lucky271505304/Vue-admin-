<template>
    <div>
          <el-form ref="form" label-width="80px" :model="Spu">
            <el-form-item label="SPU名称">
              <el-input  placeholder="Spu名称" v-model="Spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select  placeholder="请选择品牌" v-model="Spu.tmId">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="tm in SpuTradeMark" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
         <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="描述" rows="12" v-model="Spu.description"></el-input>
            </el-form-item>
         <el-form-item label="SPU图片">
              <el-upload
                 action="/dev-api/admin/product/fileUpload"
                 list-type="picture-card"
                 :file-list="SpuImg"
                 :on-preview="handlePictureCardPreview"
                 :on-success="handlerSuccess"
                 :on-remove="handleRemove">
                 <i class="el-icon-plus"></i>
               </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
           </el-form-item>
          <el-form-item label="销售属性">
              <el-select  placeholder="请选择" v-model="attrIdAndName">
                  <el-option :label="base.name" :value="`${base.id}:${base.name}`" v-for="base in SpuBase" :key="base.id"></el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-plus" @click="addSaveAttr">添加销售属性</el-button>
          <el-table style="width: 100%" border :data='Spu.spuSaleAttrList'> 
              <el-table-column type="index" label="序号" width="80"> </el-table-column>
              <el-table-column prop="saleAttrName" label="属性名" width="width"> </el-table-column>
              <el-table-column prop="prop" label="属性值名称列表" width="width"> 
                  <template slot-scope="{row,$index}">
                      <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice($index,1)"> {{tag.saleAttrName}} </el-tag>
                           <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
                           </el-input>
                           <el-button v-else class="button-new-tag" size="small" @click="addAttrValue(row)">添加</el-button>

                  </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作" width="width"> 
                  <template slot-scope="{row,$index}">
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSale($index)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
          </el-form-item>
          <el-form-item >
                 <el-button type="primary" @click="addOrUpdata">保存</el-button>
                 <el-button @click="cancel">取消</el-button>
          </el-form-item>
          </el-form>
        </div>
</template>

<script>
export default {
   name: 'SpuForm',
   data(){
       return{ 
            attrIdAndName:'',
            dialogImageUrl: '',
            dialogVisible: false,
            Spu:{
                category3Id: 0,
                description: "",
                  tmId:'',
                  spuName: "",
               spuImageList: [
                //  {
                //    id: 0,
                //    imgName: "string",
                //    imgUrl: "string",
                //    spuId: 0
                //      }
                ],
                 spuSaleAttrList:[
                    //   {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "string",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //       {
                    //         baseSaleAttrId: 0,
                    //       id: 0,
                    //         isChecke: "string",
                    //         saleAttrName: "string",
                    //         saleAttrValueName: "string",
                    //         spuId: 0
                    //       }
                    //     ]
                    //   }
                    ],
                    },
           SpuTradeMark:[],
            SpuImg:[],
            SpuBase:[]
       }
   },

   methods:{
    
       handleRemove(file, fileList) {
        //    收集照片墙的数据
       this.SpuImg =fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //照片墙图片上传成功
      handlerSuccess(response,file,fileList){
           this.SpuImg = fileList;
      }, 
     async initSpuData(demo){
       let result = await this.$API.spu.reqGetSpu(demo.id);
      if(result.code==200){
          this.Spu = result.data;
      }
            let result1 = await this.$API.spu.reqGetTrade();
      if(result1.code==200){
          this.SpuTradeMark = result1.data;
      }
    
      let result3 = await this.$API.spu.reqSpuImage(demo.id);
       if(result3.code==200){
          let listArr = result3.data;
          //照片墙显示图片需要name`url两个，所以需要处理
          listArr.forEach(item=>{
              item.name= item.imgName;
              item.url=item.imgUrl;
          })
          this.SpuImg = listArr;
      }
      let result4 = await this.$API.spu.reqBaseSale();
         if(result4.code==200){
           this.SpuBase = result4.data;
         }
    },
    addSaveAttr(){
        const [baseSaleAttrId,saleAttrName] = this.attrIdAndName.split(':');
        let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
        this.Spu.spuSaleAttrList.push(newSaleAttr);
        this.attrIdAndName = '';
    },
    addAttrValue(row){
            //   谁      要加       值为
       this.$set(row,'inputVisible',true);
       this.$set(row,'inputValue','');
    },
  handleInputConfirm(row){
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性值的名称不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      //属性值不能重复,这里也可以用some
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrName: inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改inputVisible为false，不就显示button
      row.inputVisible = false;
    } ,
    deleteSale(index){
       this.Spu.spuSaleAttrList.splice(index,1);
    },
   async addOrUpdata(){
      // const {}
      // this.$API.sup.reqAddAndUpdata();
    this.Spu.spuImageList=  this.SpuImg.map(item=>{
        return {
          imgName:item.name,
          imgUrl:(item.response&&item.response.data) || item.url
        }
      })
      
    let result = await this.$API.spu.reqAddAndUpdata(this.Spu);
    if(result.code==200){
      this.$message({type:'success',message:'保存成功'});
      this.$emit('changeIsShow',0);
    }
    },
     async addSpuData(category3Id){
   this.Spu.category3Id = category3Id;
       
         let result1 = await this.$API.spu.reqGetTrade();
      if(result1.code==200){
          this.SpuTradeMark = result1.data;
      }

      let result4 = await this.$API.spu.reqBaseSale();
         if(result4.code==200){
           this.SpuBase = result4.data;
         }
          
} ,
cancel(){
  this.$emit('changeIsShow',0);
  Object.assign(this._data,this.$options.data()); 
}
},

}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>