//将四个接口统一暴露
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';
import * as adminpower from './admin/adminPower'

//对外暴露    然后main.js引入  
export default {
    trademark,
    attr,
    spu,
    sku,
    adminpower
}