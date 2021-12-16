import React, { Component } from 'react'
import api from '../../lib/api'
// import collectform from '../../lib/collectform'
import Markdown from '../tool/ReactMarkdown.jsx'
import Preview from './DetailPreview.jsx'
import Cbtn from '../tool/Closebtn.jsx'

export default class Detail_btn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openwrapper: false,
            writeBtn: false,
            preview: false,
            detail: [],
            isload: false,
            Binput: true,
            inputValue: ""
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
        // console.log(details)
        if (details.length == 0) {
            this.setState({
                writeBtn: true
            })
        }
        else {
            this.setState({
                detail: details,
                writeBtn: false
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
        if (this.state.Binput && this.state.writeBtn) {
            let { pid } = this.props
            if (document.getElementById(`${pid}input`))
                document.getElementById(`${pid}input`).focus()
        }
    }

    Clickwrapper = () => {
        this.props.OverFlow()
        this.setState({
            openwrapper: !this.state.openwrapper
        })
    }

    Watch = () => {
        this.props.OverFlow()
        this.setState({
            openwrapper: !this.state.openwrapper,
            writeBtn: false
        })
    }

    Write = () => {
        this.props.OverFlow()
        this.setState({
            openwrapper: !this.state.openwrapper,
            writeBtn: true
        })
    }

    Detail(detail) {
        let output = []
        for (var i = 0; i < detail.length; i++) {
            output.push(
                <div key={detail[i].DID} className="fullDetail">
                    <div className="where">
                        由<u style={{ 'fontStyle': 'italic' }}>&nbsp;{detail[i].Account}&nbsp;</u>提供的詳解：
                    </div>
                    <div className="markdown-body github Dmarkdown-body">
                        <Markdown content={detail[i].Content} />
                    </div>
                </div>
            )
        }
        return output
    }

    submitDetail = async () => {
        var put = confirm("確定要提供詳解？")
        if (put) {
            let status = await api({
                cmd: "Detail/content",
                method: "put",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: {
                    content: this.state.inputValue,
                    pid: this.props.pid
                }
            })
            if (status.body.did == 0)
                alert("尚未登入，提交失敗!")
            else {
                await this.load_detail()
                this.setState({
                    inputValue: "",
                    writeBtn: false,
                    openwrapper: false
                })
            }

        }
    }

    inputtDetail = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    openpreview = () => {
        this.setState({
            preview: true
        });
    }

    closepreview = () => {
        if (this.state.inputValue == "") {
            this.setState({
                preview: false
            });
        }
        else {
            this.setState({
                Binput: false,
                preview: false
            });
        }
    }

    shouldinput = () => {
        this.setState({
            Binput: true
        });
    }

    render() {
        const { openwrapper, writeBtn, detail, inputValue, preview, Binput } = this.state
        const fullDetail = this.Detail(detail)
        const { pid } = this.props
        return (
            <div className="dis-center">
                <div className="dis-center">
                    <div className="add_detail mouse" onClick={this.Write}>提供詳解</div>
                    {detail.length != 0 ?
                        (<div className="wdetail mouse" onClick={this.Watch}>看詳解</div>)
                        :
                        (<div className="ndetail">沒有詳解</div>)}
                    {openwrapper &&
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
                                {!writeBtn ?
                                    (<div>
                                        {/* <div>總共有{detail.length}個版本的詳解</div> */}
                                        {fullDetail}
                                    </div>)
                                    :
                                    (<div>
                                        {Binput ?
                                            (<form ref={this.inputD}>
                                                <textarea type="text" id={`${pid}input`} defaultValue={inputValue} className="detailinput" rows="8" cols="38"
                                                    placeholder="請輸入詳解:" required="required" onChange={this.inputtDetail}
                                                    onFocus={this.openpreview} onBlur={this.closepreview}></textarea>
                                            </form>)
                                            :
                                            (<div>
                                                <div id="mdpreview" className="markdown-body github Dmarkdown-body">
                                                    <Markdown content={inputValue}></Markdown>
                                                </div>
                                                <div className="detailch mouse" onClick={this.shouldinput}>修改</div>
                                            </div>)}
                                        {!Binput && <div type="button" className="detailsubmit mouse" onClick={this.submitDetail}>Submit</div>}
                                        {preview && <Preview content={inputValue}></Preview>}
                                    </div>)}
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
