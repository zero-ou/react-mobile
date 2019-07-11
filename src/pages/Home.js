import React, { Component, Fragment } from "react";
import { Carousel, WingBlank } from 'antd-mobile';
import { getGoods, getgoodsGroup } from "../request"
class Home extends Component {
    state = {
        imgHeight: 176,
        sliderlist: [],
        toplist: [],
        goodsgrouplist: []
    }
    componentDidMount() {
        getGoods()
            .then(res => {
                // console.log(res)
                this.setState({ sliderlist: res.data.message.sliderlist })
                this.setState({ toplist: res.data.message.toplist })
            })
        getgoodsGroup()
            .then(res => {
                this.setState({ goodsgrouplist: res.data.message })

            })
    }
    render() {
        return (
            <Fragment>
                {/* 轮播图 */}
                <Carousel
                    autoplay
                    infinite
                >
                    {this.state.sliderlist.map(val => (
                        <a
                            key={val.id}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.img_url}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                {/* 推荐商品开始 */}
                <div className="recommonent">
                    <div className="recommonent_title">推荐商品</div>
                    <div className="recommonent_content">
                        {this.state.toplist.map(v =>
                            <div className="rec_item" key={v.id}>
                                <div className="rec_item_img">
                                    <img src={v.img_url} alt="" />
                                </div>
                                <div className="rec_item_goods">
                                    <div className="rec_item_goods_title">
                                        {v.title}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* 推荐商品结束 */}

                {/* 商品分类开始 */}
                <div className="goods_list">
                    {this.state.goodsgrouplist.map(v1 =>
                        <div key={v1.level1cateid} className="good_group">
                            <div className="good_group_title">{v1.catetitle}</div>

                            <ul className="good_group_content">
                                {v1.datas.map(v2 =>
                                    <li key={v2.artID}>
                                        <img src={v2.img_url} alt="" />
                                        <div className="goods_name">{v2.artTitle}</div>
                                        <div className="goods_price">
                                            <span className="sell_price">￥{v2.sell_price}</span>
                                            <span className="market_price">￥{v2.market_price}</span>
                                            </div>
                                        <div className="goods_hot_sell">热卖中<span>{v2.stock_quantity}</span>件</div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                {/* 商品分类结束 */}
                <style jsx>{`
                div.recommonent {
                    div.recommonent_title {
                        color: #ccc;
                        padding: 10px;
                        font-size: 14px;
                    }
                
                    div.recommonent_content {
                        padding: 5px;
                        background-color: #fff;
                        div.rec_item {
                            display: flex;
                            div.rec_item_img {
                                flex: 1;
                                img { }
                            }
                
                            div.rec_item_goods {
                                flex: 6;
                                overflow: hidden;
                                font-size: 16px;
                                border-bottom: 1px solid #ccc;
                                div.rec_item_goods_title {
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    padding: 14px 0;
                                }
                            }
                        }
                    }
                }

                div.goods_list {
                    div.good_group {
                        div.good_group_title {
                        padding: 10px;
                        color: #ccc;
                        font-size: 14px;
                        }

                        ul.good_group_content {
                        display: flex;
                        flex-wrap: wrap;
                        li {
                            width: 50%;
                            background-color: #fff;
                            padding: 5px;
                            &:nth-child(odd) {
                            border-right: 1px solid #ccc;
                            }
                            border-bottom: 1px solid #ccc;
                            img {
                            width: 80%;
                            margin: 0 auto;
                            }

                            div.goods_name {
                            font-size: 12px;
                            color: black;

                            display: -webkit-box;
                            overflow: hidden;
                            word-spacing: normal!important;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            -webkit-line-clamp:2;
                            -webkit-box-orient: vertical;

                            
                            }

                            div.goods_price {
                                padding: 5px 0;
                            display: flex;
                            justify-content: space-between;
                            span.sell_price {
                                color: red;
                                font-size: 15px;
                            }

                            span.market_price {

                                color: #ccc;
                                text-decoration: line-through;
                            }
                            }

                            div.goods_hot_sell {
                            span {
                                color: red;
                                font-size: 14px;
                            }
                            }
                        }
                        }
                    }
                }




                    `}</style>

            </Fragment>
        )
    }
}
export default Home