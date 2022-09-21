import  request from '@/utils/request'

// /admin/acl/role/{page}/{limit}   get

export const getRole = (page,limit) => request({url:`/admin/acl/role/${page}/${limit}`,method:'get'});


//  /admin/acl/role/save  post 新增角色

export const saveRole = (admina) => request({url:'/admin/acl/role/save',method:'post',data:admina});


//   /admin/acl/role/remove/{id}   delete 删除

export const deleteRole = (id) => request({url:`/admin/acl/role/remove/${id}`,method:'delete'});


//   /admin/acl/role/batchRemove  delete  

export const deleteBatch = (ids) =>request({url:'/admin/acl/role/batchRemove',method:'delete',data:ids});