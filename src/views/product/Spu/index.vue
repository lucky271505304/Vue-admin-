<template>
<div>
      <el-card>
       <categoryList @getCategoryId="getCategoryId" :show="isShow!=0"/>
      </el-card>
      <el-card>
        <div v-show="isShow=='0'">
          <el-button type="primary" icon="el-icon-plus" :disabled="this.category3Id==''" @click="addSpu">添加SPU</el-button>
          <el-table style="width: 100%" :data="records">
            <el-table-column type="index" label="序号" width="80"> </el-table-column>
            <el-table-column prop="spuName" label="SPU名称" width="width"> </el-table-column>
            <el-table-column prop="description" label="SPU描述" width="width"> </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row,$index}">
                <el-button type="success" icon="el-icon-plus" title="添加sKu" @click="addSku(row)"></el-button>
                <el-button type="info" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)"></el-button>
                <el-button type="warning" icon="el-icon-info" title="查看当前spu全部sku列表" @click="FindSpu(row)"></el-button>
          <el-popconfirm   title="这是一段内容确定删除吗？" @onConfirm="deleteAttr(row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" title="删除spu" ></el-button>
          </el-popconfirm>
              </template>
               </el-table-column>
          </el-table>
          <el-pagination
            :current-page="page"
            :page-sizes="[2,3,4]"
             @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
            :page-size="limit"
            layout="prev, pager, next, jumper,->,total,sizes"
            :total="total"
            align="center">
          </el-pagination>
        </div>
        <SpuForm v-show="isShow=='1'" @changeIsShow="changeIsShow" ref="demo"/>
        <SkuForm v-show="isShow=='2'" ref="skuDemo" @changeIS="changeIS"/>
      </el-card>
      <el-dialog :title="`${row1.spuName}的列表`" :visible.sync="dialogTableVisible" :before-close="close">
        <el-table style="width: 100%" border :data="FindS" v-loading="loading">
          <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>
          <el-table-column prop="price" label="价格" width="width"> </el-table-column>
          <el-table-column prop="weight" label="重量" width="width"> </el-table-column>
          <el-table-column  label="默认图片" width="width"> 
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" style="width:100px;width:100px" />
            </template>
          </el-table-column>
        </el-table>
       </el-dialog>
</div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
   name: 'Spu',
   components:{
     SkuForm,
     SpuForm
   },
   data(){
     return{
        isShow:0,   
        category1Id: '',
        category2Id: '',
        category3Id: '',
        page: 1,
        limit: 3,
        total: 1,
        records: [],
        dialogTableVisible: false,
        row1:{},
        FindS:[],
        loading: true
     }
   },
   methods:{
     getCategoryId({categoryId,level}){
       if(level==1){
         this.category1Id = categoryId;
         this.category2Id = '';
         this.category3Id = '';
       }
       else if(level==2){
         this.category2Id = categoryId;
         this.category3Id = '';
       }
       else{
         this.category3Id = categoryId;
         this.getData();
       }
     },
     handleCurrentChange(page){
       this.page = page;
       this.getData();
     },
     handleSizeChange(limit){
         this.limit =limit;
         this.getData();
     },
     async getData(){
       const {page,limit,category3Id} = this;
       let result = await this.$API.spu.reqSpuList(page,limit,category3Id);
          if(result.code==200){
            this.total = result.data.total;
            this.records = result.data.records;
          }
     },
     addSpu(){
       this.isShow = 1;
       //通知子组件发请求
       this.$refs.demo.addSpuData(this.category3Id);
     },
     updateSpu(row){
       this.isShow = 1;
       this.$refs.demo.initSpuData(row);
     },
     changeIsShow(show,flag){
       this.isShow =show;
         this.getData();
     },
     async deleteAttr(row){
      let result = await this.$API.spu.reqDelete(row.id);
        if(result.code==200){
         this.$message({type:'success',message:'成功'});
         this.getData(this.page);      
      }
     }, 
     addSku(row){
       this.isShow = 2;
       this.$refs.skuDemo.getData(this.category1Id,this.category2Id,row);
     },
     changeIS(show){
       this.isShow =show;
     },
    async FindSpu(row1){
          this.dialogTableVisible = true;
          this.row1 = row1;   //显示title
        let result = await this.$API.spu.reqFindSpu(row1.id);
        if(result.code==200){
          this.FindS = result.data;
          this.loading = false;
        }
          
     },
     close(done){
       this.loading = true;
       this.FindS  = [];
       done();
     }

   }
}
</script>

<style>

</style>