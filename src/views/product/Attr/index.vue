<template>
    <h1>
        <el-card style="margin:20px 0px;">
            <categoryList @getCategoryId="getCategoryId"/>
        </el-card>

    <el-card>
      <div v-show="isShow">
            <el-button type="primary" icon="el-icon-plus" :disabled="this.category3Id==''" @click="clickShow">添加属性</el-button>
   <el-table  style="width: 100%" border :data="attrList">
       <el-table-column
           type="index"
           label="序号"
           width="80"
           align="center">
       </el-table-column>
          <el-table-column
           prop="attrName"
           label="属性名称"
           width="150">
       </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row}">
                <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin: 0px 18px;">{{attrValue.valueName}}</el-tag>
            </template>
       </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
              <template slot-scope="{row}">
                  <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
              </template>
       </el-table-column></el-table>
      </div>
      <!-- //添加属性 -->
      <div v-show="!isShow">
 <el-form :inline="true" ref="form"  label-width="80px" :model="attrInfo">
     <el-form-item label="属性名" >
         <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
     </el-form-item>
 </el-form>
    <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
         <el-button @click="isShow=true"> 取消</el-button>
   <el-table style="width:100%;  margin:20px 0px" border :data="attrInfo.attrValueList">
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="prop" label="属性值名称" width="width">
                  <template slot-scope="{row,$index}">
                      <!-- input 与span  切换效果 -->
                      <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" 
                                                                                                  @blur="toLook(row)"
                                                                                                  @keyup.native.enter="row.flag=flase"
                                                                                                  :ref="$index"></el-input>
                      <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作" width="width">
                  <template slot-scope="{row,$index}">
            <el-popconfirm :title="`确定删除${row.valueName}么?`" @onConfirm="deleteAttrValue($index)"> 
                       <el-button type="danger" icon='el-icon-delete' size="mini" slot="reference"></el-button>
                          </el-popconfirm>
                  </template>
              </el-table-column>
         </el-table>
         <el-button type="primary" @click="addOrUpdate">保存</el-button>
         <el-button @click="isShow=true">取消</el-button>
      </div>
        </el-card>
    </h1>
</template>

<script>
//深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
   name: 'Attr',
   data(){
       return{
           category1Id:'',
           category2Id:'',
           category3Id:'',
           attrList: [],
           isShow: true,
           //收集新增属性|修改属性
           attrInfo:{
      attrName: "",
      attrValueList: [
    //  {
    //   attrId: 0,
    //   valueName: ""
    // }
   ],
  categoryId: 0,  //三级分类的Id
  categoryLevel: 3,  //几层
   }
       }
   },
   methods:{
     async  getAttr(){
         const{category1Id,category2Id,category3Id} = this;
       let result = await this.$API.attr.reqAttrList(category1Id,category2Id,category3Id);
       if(result.code==200){
          this.attrList = result.data;
       }
         
       },
     async addOrUpdate(){
          //过滤空的
        this.attrInfo.attrValueList =  this.attrInfo.attrValueList.filter(item=>{
              //过滤掉有内容的
              if(item.valueName!=''){
                  delete item.flag;
                  return true;
              }
          })
         await this.$API.attr.reqAddAttr(this.attrInfo);
         this.isShow = true;
             this.$message({type:'success',message:'保存成功'})
             this.getAttr();
         

        //  let result = await reqAddAttr(){
               
        //  }
       },
       deleteAttrValue(index){
            this.attrInfo.attrValueList.splice(index,1);
       },
       //修改某一个属性
      updataAttr(row){
         this.isShow=false;
         //将选中的值赋值给attrIndo
        //  {...row}   浅拷贝    cloneDeep(row)深拷贝
         this.attrInfo= cloneDeep(row);
         this.attrInfo.attrValueList.forEach(item=>{
               this.$set(item,'flag',false);
         })
        
       },
       toEdit(row,index){
         row.flag = true;
         //表单自动聚焦
        //  nextTick当节点渲染完毕，会执行一次
         this.$nextTick(()=>{
             this.$refs[index].focus();
                      })
       },
       addAttrValue(){
           //像属性值中添加元素
           this.attrInfo.attrValueList.push({
               attrId: this.attrInfo.id,
               valueName: '',
               flag:true,
           })    
           this.$nextTick(()=>{
               this.$refs[this.attrInfo.attrValueList.length-1].focus();
           })   
       },
       toLook(row){
            if(row.valueName.trim()==''){
                this.$message('输入为空')
                return;
            }
        let isRepeat =  this.attrInfo.attrValueList.some(item=>{
                if(row!==item){
                  return  row.valueName == item.valueName
                }
            })
            if(isRepeat) return  this.$message('属性值名称相同');
            row.flag=false;
        },
       clickShow(){
           this.isShow = false;
           this.attrInfo= {
               attrName: '',
               attrValueList:[
               ],
               categoryId:this.category3Id,
               categoryLevel: 3
           }
       },
       getCategoryId({categoryId,level}){
        if(level==1){
         this.category1Id=categoryId;
         this.category2Id= '';
         this.category3Id = '';
         }
        else if(level==2){
         this.category2Id = categoryId;
         this.category3Id = '';
        }
        else{
         this.category3Id = categoryId;
         //三个选项全都选择完毕之后发请求
         this.getAttr();
        }
       }
   }
}
</script>

<style>

</style>