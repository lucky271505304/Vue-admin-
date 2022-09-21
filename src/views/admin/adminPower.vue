<template>
 <div>
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <el-button type="danger" icon ="el-icon-delete" @click="deleteAll" :disabled="selectionInfo.length===0">批量删除</el-button>
      <br/> <br/> <br/>
     <el-table  style="width: 100%" border :data="records" @selection-change="handleSelectionChange">
          <el-table-column type="selection" label="label" width="80"> </el-table-column>
          <el-table-column type="index" label="序号" width="100"> </el-table-column>
          <el-table-column prop="props" label="角色名称" width="width"> 

               <template slot-scope="{row}">
                    <el-input v-model="row.roleName" v-if="row.edit==true" @blur="row.edit=false" @keyup.native.enter="row.edit=false"></el-input>
                    <span v-else >{{row.roleName}}</span>
               </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width"> 
                  <template slot-scope="{row}">
                       <el-button type="primary" icon="el-icon-edit" size="mini" title="修改角色" @click="showTag(row)"></el-button>
                       <el-button type="danger" icon="el-icon-delete" size="mini" title="删除角色" @click="deleteRole(row)"></el-button>
                  </template>
          </el-table-column>
     </el-table>
       <br/> <br/>
     <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 50]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,total, sizes"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="total"
          align="center">
     </el-pagination>
     <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="tmForm" label-width="100px">
         <el-form-item label="请输入新名称">
              <el-input v-model="tmForm.roleName"></el-input>
         </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="showCancel">取 消</el-button>
    <el-button type="primary" @click="addRole">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>
<script>
export default {
     name:'adminPower',
     data(){
          return{
               page:1,
               limit:3,
               total:100,
               records:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                tmForm:{
                      roleName:'',
                },
                selectionInfo:[]
          }
     },
     mounted(){
          this.getData();
     },
     methods:{
        async  getData(){
         const {page,limit} = this;
         let result = await this.$API.adminpower.getRole(page,limit);
         if(result.code==20000){
              const {items} =result.data;
              this.records = items.map(item=>{
                   item.edit = false;
                   item.originRoleName = item.roleName;
                   return item
              })
          //     this.records = result.data.items;
              this.total = result.data.total;
         }
          },
          handleCurrentChange(page){
               this.page= page;
               this.getData();
          },
          handleSizeChange(limit){
               this.limit = limit;
               this.getData();
          },
          handleSelectionChange(a){
            this.selectionInfo = a;
          },
          showCancel(){
               this.dialogFormVisible = false;
               this.tmForm.roleName='';
          },
          //添加角色
         async addRole(){
          this.dialogFormVisible = false;
          let result = await this.$API.adminpower.saveRole(this.tmForm);
          if(result.code==20000){
               this.getData();
               this.$message({type:'success',message:'添加成功'});
          }
          },
          //修改角色  
          showTag(row){
              row.edit=true;
          },
          //删除
         deleteRole(row){
          this.$confirm(`删除${row.roleName}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.$API.adminpower.deleteRole(row.id);
          if(result.code==20000){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         },
         //批量删除
         deleteAll(){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
             let ids = this.selectionInfo.map(item=>{
                  return item.id;
             });
           let result = await this.$API.adminpower.deleteBatch(ids);
           if(result.code==20000){
           console.log(result);
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
           }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         },
     
          
     }
  
}
</script>

<style>

</style>