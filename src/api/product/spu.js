import request from '@/utils/request'


// /admin/product/{page}/{limit}
 export const  reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//  /admin/product/getSpuById/{spuId}   get  获取spu基本信息

export const reqGetSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});


//  /admin/product/baseTrademark/getTrademarkList  get  获取品牌 
 export const reqGetTrade = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})


 //    GET /admin/product/spuImageList/{spuId}   获取SPU图片

 export const reqSpuImage = (spuId) =>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});


 //    /admin/product/baseSaleAttrList      get   获取平台全部销售属性
 
 export const reqBaseSale =() => request({url:"/admin/product/baseSaleAttrList",method:'get'});

 //修改SPU|| 添加SPU  
 export const reqAddAndUpdata = (spuInfo) =>{
     //如果携带spuID 
     if(spuInfo.id){
         return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo});
     }

     //不带id        POST /admin/product/saveSpuInfo
     else{
         return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo});
     }
 } 


 //  删除   /admin/product/deleteSpu/{spuId}    delete

 export const reqDelete = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'});





 //获取图片的接口  get /admin/product/spuImageList/{spuId}

export const  reqSkuImg = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});


//  获取销售属性   get    /admin/product/spuSaleAttrList/{spuId}

export const reqSpuSaleAttr = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});

//  获取平台属性  get /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

export const reqAttrInfo = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
 
//添加sku   POST      /admin/product/saveSkuInfo

export const reqSaveSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})


//      /admin/product/findBySpuId/{spuId}   get

export const reqFindSpu = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'});

