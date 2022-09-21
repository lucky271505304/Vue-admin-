<template>
<div>
  <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
  <!-- 表格 -->
   <el-table style="width: 100%" :data='list' border>
     <el-table-column header-align="center" align="center" type="index" label="序号" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="tmName" label="品牌名称" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="logoUrl" label="品牌LOGO" >
        <!-- 插槽 -->
      <template slot-scope="{row}">
        <img :src="row.logoUrl" alt="" style="width:126px;height:100px;">
      </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="prop" label="操作" > 
         <template slot-scope="{row}">
        <el-button type="warning" icon="el-icon-edit" size='mini' @click="updateTrade(row)">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteTradeMark(row)">删除</el-button>
      </template>
      </el-table-column>
   </el-table>
   <!-- 分页器 -->   
  <el-pagination
     style="text-align:center;margin-top:20px;"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="[3,5,10]"
    :page-size="limit"
    layout=" prev, pager, next, jumper,->,sizes,total"
    :total="total">
  </el-pagination>
  <!-- 对话框 -->
  <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
  <el-form style="width:80%;" :model="tmForm" :rules="rules" ref="tmForm">
    <el-form-item label="品牌名称" label-width="100px" prop="tmName" >
       <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
    </el-form-item>
     <el-form-item label="品牌LOGO" prop="logoUrl">
       <el-upload
  class="avatar-uploader"
   :on-success="handleAvatarSuccess"
   :before-upload="beforeAvatarUpload"
  action="/dev-api/admin/product/fileUpload"
  :show-file-list="false">
  <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
   <div slot="tip" class="el-upload__tip" style="margin-left:66px;">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdate">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  name: 'tradeMark',
  data(){
    return{
      page:  1,
      limit: 3,
      total: 0,
      //列表展示的数据
      list: [],
      dialogFormVisible: false,
      tmForm: {
         logoUrl:'',
         tmName: '',
      }, 
      //表单验证规则
      rules:{
         tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌图片', trigger: 'change' }
          ],
      }
         }
  },
  mounted(){
    this.getData();
  },
  methods:{
   async getData(){
      const {page,limit} = this;
     let result = await this.$API.trademark.reqTradeMark(page,limit);
      if(result.code==200){
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },  
    //删除品牌
    deleteTradeMark(row){
       
        this.$confirm(`是否确认删除${row.tmName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          //点击确认按钮时触发
        }).then(async() => {
         let result =await this.$API.trademark.reqDelete(row.id);
         if(result.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData(this.list.length>1?this.page:this.page-1);
         }
        }).catch(() => {
          //点击取消时触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }, 
    //添加或修改品牌   
    addOrUpdate(){ 
      this.$refs.tmForm.validate(async(success)=>{ 
        if(success){
      this.dialogFormVisible = false;    // 对话框隐藏
      let result = await this.$API.trademark.reqAddOrUpdate(this.tmForm);
      if(result.code==200){
        this.$message(this.tmForm.id?'修改品牌成功':'添加品牌成功');
        this.getData(this.tmForm.id?this.page:1);
      }
        }
        else {
            console.log('error submit!!');
            return false;
          }
      })
    },
    handleCurrentChange(pager){
      // pager点击哪一页
    this.page=pager;
    this.getData();
    },
    showDialog(){
      this.dialogFormVisible=true;
      this.tmForm.tmName = '';
      this.tmForm.logoUrl = '';
    },
    updateTrade(row){
      this.dialogFormVisible=true;
      this.tmForm = {...row};   //浅拷贝

    },
       handleAvatarSuccess(res, file) {
        this.tmForm.logoUrl = res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>