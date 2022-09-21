import request from '@/utils/request'

// /admin/product/getCategory1   一级分类   get
export const reqCategory1 = () => request({url:'/admin/product/getCategory1',method:'get'});


//   /admin/product/getCategory2/{category1Id}   二级分类  get  
 export const reqcategory2 = (category1Id) => request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'});


//   /admin/product/getCategory3/{category2Id}   三级分类   get 
export const reqcategory3 = (category2Id) => request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

//  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  商品属性列表

export const reqAttrList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
  //   保存商品属性   /admin/product/saveAttrInfo   POST   

  export const reqAddAttr = (data) => request({url:'/admin/product/saveAttrInfo',method:'post',data});




