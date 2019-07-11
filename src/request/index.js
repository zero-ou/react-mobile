import axios from "axios";
/**
 * 获取首页轮播图数据
 */
export const getGoods = ()=>axios.get("http://react.zbztb.cn/site/goods/gettopdata/goods");
/**
 * 获取首页分类列表数据
 */
export const getgoodsGroup = ()=>axios.get("http://react.zbztb.cn/site/goods/getgoodsgroup");

