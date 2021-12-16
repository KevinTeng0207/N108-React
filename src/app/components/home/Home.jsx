import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from './Footer.jsx'
import tool1 from '../../image/tool1.png'
import tool2 from '../../image/tool2.png'
import tool3 from '../../image/tool3.png'
import Hometool from './Hometool.jsx'
import APPbar from '../topbar/APPbar.jsx'

export default class Home extends Component {
    render() {
        const { login, info, getuserimg, userimg } = this.props
        return (
            <div>
                <div className="coverImg">
                    <div className="coverImg-inner">
                        <h1 className="coverImg-title">想要獨立學習？</h1>
                        <h2 className="coverImg-subtitle homepage">找 WKE Education！</h2>
                        <NavLink to={`/Learn_app?school=Elementary`} className="coverImg-inner-btn">立即學習</NavLink>
                    </div>
                    <div className="coverImg-inner2">
                        <marquee className="dis-flex-end run" height="470px" direction="up" scrollamount="5" behavior="scroll">
                            <article>
                                <h2>12年國教課程綱要-108課綱重點</h2>
                                <p>十二年國民基本教育本於全人教育的精神。</p>
                                <p>以「<strong>自發</strong>」、「<strong>互動</strong>」、「<strong>共好</strong>」為基底。</p>
                                <p>自發：引發學生學習動機與熱情，成為自發主動的學習者。</p>
                                <p>互動：引導學生妥善開展與自我、與他人的各種互動能力。</p>
                                <p>共好：協助學生應用及實踐所學。</p>
                                <p><br /></p>
                                <p>108課綱以「<strong>適性揚才、終身學習</strong>」為願景。</p>
                                <p>兼顧學生的個別需求、尊重多元文化與族群差異。</p>
                                <p>透過適性教育，激發對於學習的渴望與創新的勇氣。</p>
                                <p>展現共生智慧，成為具有適應力與應變力的學習者。</p>
                            </article>
                        </marquee>
                    </div>
                </div>
                <div className="features dis-center">
                    <Hometool name={"影片"} content={"累積多種影片，為您篩選合適影片"} img={tool1} />
                    <Hometool name={"筆記"} content={"創造優越學習環境，給您最效率的學習"} img={tool2} />
                    <Hometool name={"考試"} content={"有當過學生才最同理你的需求與感受"} img={tool3} />
                </div>
                <Footer CTitle={"© Web Knowledge Extraction"}
                    CName={'WKE focuses on developing Web information systems (WIS) for various domain requirements.\nBy integrating systems and modules about web/text mining methods developed in WKE.'} />
            </div >
        )
    }
}

