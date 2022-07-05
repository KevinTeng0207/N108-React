import React, { Component } from 'react'
import api from '../../lib/api'
// import collectform from '../../lib/collectform'
import Markdown from '../tool/ReactMarkdown.jsx'
import DPreview from './DetailPreview.jsx'
import Cbtn from '../tool/Closebtn.jsx'

export default class Detail_btn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Wrapper: false, // wrapper 打開
            WatchDetail: false, // 觀看現有詳解
            Preview: false, // 預覽
            detail: [], // 詳解內容
            isload: false,
            InputFocus: true, // focus
            InputValue: ""
        };
        this.inputD = React.createRef();
    }

    load_detail = async () => {
        let { pid } = this.props
        let details = await api({
            cmd: "Detail/" + pid,
            method: "get"
        })
        details = details.body
        console.log(details)
        if (details.length == 0) {
            this.setState({
                WatchDetail: false
            })
        }
        else {
            this.setState({
                detail: details,
                WatchDetail: true
            })
        }
    }

    componentDidMount = async () => {
        // console.log('detail btn DidMount')
        await this.load_detail()
        this.setState({
            isload: true
        })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('detail btn Update')
        if (prevState == this.state) {
            await this.load_detail()
            this.setState({
                isload: true
            })
        }
        if (this.state.InputFocus && !this.state.WatchDetail) {
            let { pid } = this.props
            if (document.getElementById(`${pid}input`))
                document.getElementById(`${pid}input`).focus()
        }
    }

    Clickwrapper = () => {
        this.setState({
            Wrapper: !this.state.Wrapper
        })
    }

    Watch = () => {
        this.setState({
            Wrapper: true,
            WatchDetail: true
        })
    }

    Write = () => {
        // this.props.OverFlow() // 上層重新render
        this.setState({
            Wrapper: true,
            WatchDetail: false
        })
    }

    SubmitDetail = async () => {
        var put = confirm("確定要提供詳解？")
        if (put) {
            let status = await api({
                cmd: "Detail/content",
                method: "put",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: {
                    content: this.state.InputValue,
                    pid: this.props.pid
                }
            })
            if (status.body.did == 0)
                alert("尚未登入，提交失敗!")
            else {
                await this.load_detail()
                this.setState({
                    InputValue: "",
                    WatchDetail: false,
                    Wrapper: false
                })
            }

        }
    }

    InputDetail = (e) => {
        this.setState({
            InputValue: e.target.value
        });
    }

    OpenPreview = () => {
        this.setState({
            Preview: true
        });
    }

    ClosePreview = () => {
        if (this.state.InputValue == "") {
            this.setState({
                Preview: false
            });
        }
        else {
            this.setState({
                InputFocus: false,
                Preview: false
            });
        }
    }

    ShouldInput = () => {
        this.setState({
            InputFocus: true
        });
    }

    render() {
        const { Wrapper, WatchDetail, detail, InputValue, Preview, InputFocus } = this.state
        const { pid } = this.props
        return (
            <div className="dis-center">
                <div className="dis-center">
                    <div className="add_detail mouse" onClick={this.Write}>提供詳解</div>
                    {detail.length != 0 ?
                        (<div className="wdetail mouse" onClick={this.Watch}>看詳解</div>)
                        :
                        (<div className="ndetail">沒有詳解</div>)}
                    {Wrapper &&
                        <div className="detailcontentwrapper dis-center">
                            <div className="detailcontent">
                                <div className="detail-header">
                                    <Cbtn Clickbtn={this.Clickwrapper}></Cbtn>
                                    <h4 className="detail-title" id="mySmallModalLabel">
                                        <i className="fas fa-bookmark"></i>
                                        &ensp;Detail
                                    </h4>
                                </div>
                                <div className="detail-body">
                                    {
                                        WatchDetail ?
                                            (<div>
                                                {detail.map(detail => <div key={detail.DID} className="fullDetail">
                                                    <div className="where">
                                                        由<u style={{ 'fontStyle': 'italic' }}>&nbsp;{detail.Account}&nbsp;</u>提供的詳解：
                                                    </div>
                                                    <div className="markdown-body github Dmarkdown-body">
                                                        <Markdown content={detail.Content} />
                                                    </div>
                                                </div>)}
                                            </div>)
                                            :
                                            (
                                                <div>
                                                    {InputFocus ?
                                                        (<form ref={this.inputD}>
                                                            <textarea type="text" id={`${pid}input`} defaultValue={InputValue} className="detailinput" rows="8" cols="38"
                                                                placeholder="請輸入詳解:" required="required" onChange={this.InputDetail}
                                                                onFocus={this.OpenPreview} onBlur={this.ClosePreview}></textarea>
                                                        </form>)
                                                        :
                                                        (<div>
                                                            <div id="mdPreview" className="markdown-body github Dmarkdown-body">
                                                                <Markdown content={InputValue}></Markdown>
                                                            </div>
                                                            <div className="detailch mouse" onClick={this.ShouldInput}>修改</div>
                                                        </div>)}
                                                    {!InputFocus && <div type="button" className="detailsubmit mouse" onClick={this.SubmitDetail}>Submit</div>}
                                                    {Preview && <DPreview content={InputValue}></DPreview>}
                                                </div>)
                                    }
                                </div>
                                <div className="detailoutsidewrapper mouse" onClick={this.Clickwrapper}></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
