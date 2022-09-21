import request from '@/utils/request'

//收集数据    post  /admin/product/saveSkuInfo

//   GET /admin/product/list/{page}/{limit}
export const reqSku =  (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'get'});


//  上架   GET   /admin/product/onSale/{skuId}

export const reqOnSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'get'});


//   下架   GET /admin/product/cancelSale/{skuId}

export const reqcancelSale = (skuId) => request({url:`/admin/product/cancelSale/{skuId}`,method:'get'});


//     GET /admin/product/getSkuById/{skuId}    商品详情

export const reqGetSku = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:'get'});




