import React, { Component } from 'react'
import blank from '../../image/blank.jpg'
import api from '../../lib/api'
import { code } from '../../json/code.json'
import ReactLoading from "react-loading";

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // videoNum: [],
            error: null,
            isLoaded: false,
            show_list: true
        };
    }

    Content = async () => {
        // console.log("Content get " + this.props.match.params.cid)
        const { contentID } = this.props
        // console.log(contentID)
        let content = await api({
            cmd: "Learn/content?cid=" + contentID,
            method: "get"
        })
        let videoNum = await api({
            cmd: "Learn/videoNum?pcid=" + contentID,
            method: "get"
        })
        content = content.body
        videoNum = videoNum.body
        content.map(c => {
            videoNum.map(function (N) {
                if (N.ccid == c.ccid)
                    c.videoN += N.count;
                return;
            })
        })
        console.log(content)
        console.log(videoNum)
        this.setState({
            data: content
            // videoNum: videoNum
        });
    }

    componentDidMount = async () => {
        // console.log('content DidMount')
        const { schoolname, contentID } = this.props
        if (contentID != 0)
            await this.Content()
        this.setState({
            isLoaded: true,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log('content update')
        const { schoolname, contentID } = this.props
        if (prevProps.contentID != this.props.contentID && contentID != 0) {
            await this.Content()
            this.setState({
                isLoaded: true,
            });
        }
    }

    // 方框模式，被淘汰了
    // getgrid(data, video_num, video_info, openVideoflame) {
    //     var content = []
    //     for (var i = 0; i < data.length; i++) {
    //         let videoid = ''
    //         let num = 0
    //         for (var j = 0; j < video_num.length; j++) {
    //             if (video_num[j].CDes == data[i].cdes) {
    //                 num = video_num[j].count
    //                 break;
    //             }
    //         }
    //         for (var z = 0; z < video_info.length; z++) {
    //             if (video_info[z].CDes == data[i].cdes) {
    //                 videoid = video_info[z].videoid
    //                 break;
    //             }
    //         }
    //         let title = data[i].cdes.split('。')[0]
    //         let cid = data[i].ccid
    //         content.push(
    //             <div className="list-container relative" key={i}>
    //                 <div className="edu-ytimg" onClick={(e) => openVideoflame(cid)}>
    //                     <div id="overlays" className="ytd-playlist-thumbnail">
    //                         <div className="ytd-playlist-thumbnail ytd-thumbnail-overlay-side-panel-renderer">
    //                             <div className="video_num">{num}</div>
    //                             <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="yt-icon video_icon">
    //                                 <g>
    //                                     <path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z " className="yt-icon"></path>
    //                                 </g>
    //                             </svg>
    //                         </div>
    //                         <div className="ytd-thumbnail-overlay-side-panel-renderer2">
    //                             <i className="fas fa-arrow-alt-circle-right inline subtitle">&ensp;點擊展開</i>
    //                         </div>
    //                     </div>
    //                     <div className="imgcontainter">
    //                         <img src={videoid == '' ? blank : `https://i.ytimg.com/vi/${videoid}/mqdefault.jpg`} width="210"></img>
    //                     </div>
    //                     <span className="twoline yttitle">{title}</span>
    //                     <span className="oneline ytviewct yttitle">點擊次數：0</span>
    //                     <div className="oneline ytviewct yttitle" onClick={(e) => openVideoflame(cid)}>查看完整影片清單</div>
    //                 </div>
    //             </div>
    //         )
    //     }
    //     return content
    // }

    // switch_list = () => {
    //     this.setState({
    //         show_list: true
    //     });
    // }

    // switch_grid = () => {
    //     this.setState({
    //         show_list: false
    //     });
    // }

    render() {
        // console.log('content render')
        const { data, show_list, isLoaded } = this.state
        const { login, info, schoolname, contentID, openVideoflame } = this.props
        if (!isLoaded) {
            return (
                <div className="main_content dis-center overflow">
                    <div>
                        <ReactLoading
                            type={"spinningBubbles"}
                            color="#000000"
                            height={200}
                            width={200}
                        />
                        <h1 style={{ "marginTop": "8px" }}>Loading ...</h1>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="main_content animate-right">
                    <div className="listControlBar">
                        <div className="leftGroup dis-flex-row">
                            <div className={`mouse icon-containter ${show_list ? "act" : "noact"}`}
                                onClick={this.switch_list}>
                                <i className="fa fa-th-list" aria-hidden="true"></i>
                            </div>
                            <span>共有  {data.length}  筆學習內容</span>
                        </div>
                    </div>
                    {data.map(d =>
                        <div key={d.ccid}>
                            <div className="allCourseViewSmall modeList contRelative clearfix">
                                <i className="fa fa-star-o icon-star mouse"></i>
                                {/* <i className="fa fa-star icon-star mouse"></i> */}
                                <div className="link a" onClick={(e) => openVideoflame(d.ccid)}>
                                    <h4 className="h4">{d.cdes.split('。')[0]}</h4>
                                    <p className="viewAccount">代碼：{d.pname}</p>
                                    <span className="viewAccount">點擊次數：0</span>
                                    <span className="viewAccount">
                                        影片數量：{d.videoN}
                                    </span>
                                </div>
                                <div className="inlineblock">
                                    <ul className="suitableGroup ul">
                                        <li className="itemTitle li">關鍵字：</li>
                                        {d.Keywords.split(',').map((k, i) => <li className="suitable10-12-2 li mouse" key={i}>{k}</li>)}
                                    </ul>
                                </div>
                                <div className="otherInfo">
                                    <ul className="suitableGroup ul">
                                        <li className="itemTitle li">適用對象：</li>
                                        {code.map(function (c, i) {
                                            if (c.name == d.pname.split('-')[1])
                                                return c.range.map(r => <li key={r} className={`suitable10-12--${code[i].color} li`}>{r}</li>);
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>)}
                    {/* <div className="grid_map dis-center2">
                            <div className="wrap">
                                <div className="grid_list_ wrap">
                                    {this.getgrid(data, video_num, video_info, openVideoflame)}
                                </div>
                            </div>
                        </div> */}
                </div>
            )
        }
    }
}
