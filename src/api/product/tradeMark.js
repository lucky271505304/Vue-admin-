import request from '@/utils/request'
 
// GET      /admin/product/baseTrademark/{page}/{limit}   获取品牌接口
export const  reqTradeMark = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

// 添加品牌    /admin/product/baseTrademark/save    post  两个参数     品牌名称，品牌LOGO

// 修改品牌    /admin/product/baseTrademark/update    put    三个参数    品牌名称，品牌LOGO ID

export const reqAddOrUpdate = (tradeMark) =>{
    // 有id
    if(tradeMark.id){ 
    return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark});
    }
    else{
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark});
    }
}

//删除品牌   /admin/product/baseTrademark/remove/{id}
export const reqDelete = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
