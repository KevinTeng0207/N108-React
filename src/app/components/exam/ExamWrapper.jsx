import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../../lib/api.js'
import ChooseBtn from './ExamChoosebtn.jsx'
import Problem_img from './ExamProblemImg.jsx'
import Detail from '../detail/Detail.jsx'
import Issue from './ExamIssue.jsx'
import collectform from '../../lib/collectform'
import queryString from 'query-string'
import sorry from '../../image/sorry.png'
import Cbtn from '../tool/Closebtn.jsx'

export default class ExamWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],       // 題目資料
            ansset: [],     // 正確解答
            inputSet: [],   // 每個題目 對or錯
            myAns: [],      // 使用者 答案
            submit: false,  // 繳交(顯示詳解)
            problemId: 0,   // 目前第幾題
            error: null,
            isLoaded: false,
            cid: 0
        };
        this.answer = React.createRef();
    }

    get_api = async () => {
        let cid = this.state.cid
        let data = ""
        let ans = []
        if (cid != 0) {
            data = await api({
                cmd: "Exam/img_path?cid=" + cid,
                method: "get"
            })
            data = data.body
            // console.log(data)
            for (var i = 0; i < data.length; i++)
                ans.push(data[i].answer);
        }
        this.setState({
            data: data,
            ansset: ans,
        });

    }

    f5check = (e) => {
        if (e.keyCode == 116) //f5
        {
            var check = confirm("資料不會保留，確定要刷新？")
            if (check)
                return;
            else
                e.preventDefault(); // 不讓刷新
        }
    }

    componentDidMount = async () => {
        // console.log('exam DidMount')
        let cid = queryString.parse(this.props.location.search).cid
        await this.get_api()
        this.setState({
            isLoaded: true,
            cid: cid ? cid : 0
        });
        const { login } = this.props
        if (login)
            document.addEventListener("keydown", this.f5check);
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('exam DidUpdate')
        if (prevState == this.state) {
            await this.get_api()
            this.setState({
                isLoaded: true,
                submit: false,
                problemId: 0,
            });
        }
    }

    componentWillUnmount() {
        const { login } = this.props
        if (login)
            document.removeEventListener("keydown", this.f5check);
    }

    getstr(data) {
        let temp = data.NamePath.split('/')
        let str = ""
        for (var j = 2; j < temp.length; j++)
            str += temp[j] + '/'
        let numid = parseInt(data.problem.split('.')[0], 10)
        str += "cut/" + numid + ".jpg"
        return str
    }

    problemList(data) {
        let cid = this.state.cid
        // console.log(cid)
        if (cid) {
            // console.log(data)
            let problemlist = []
            for (var i = 0; i < data.length; i++) {
                let str = this.getstr(data[i])
                problemlist.push(
                    <div className={`problem-containter ${this.state.problemId == i ? "" : "dis-no"}`} key={data[i].pid}>
                        <Problem_img str={str}></Problem_img>
                        <ChooseBtn id={i} answer={this.answer}></ChooseBtn>
                        <Issue pid={data[i].pid} get_api_img={this.get_api} ></Issue>
                    </div>
                )
            }
            return problemlist
        }
        else
            return ""

    }

    submit = () => {
        // console.log('exam submit')
        let formitems = collectform(this.answer.current)
        var writed = Object.getOwnPropertyNames(formitems)[this.state.problemId]
        if (typeof (writed) == "undefined")
            alert('請選擇答案!!!')
        else {
            let myAns = Object.getOwnPropertyNames(formitems).slice() //使用者解答
            let YorN = []
            for (var i = 0; i < myAns.length; i++) {
                if (myAns[i][1] == this.state.ansset[parseInt(myAns[i], 10)]) //判斷對錯
                    YorN.push("yes")
                else
                    YorN.push("no")
            }
            // console.log(YorN)
            var yes = confirm('你確定要繳交嗎？')
            if (yes) {
                this.setState({
                    myAns: myAns.slice(),
                    inputSet: YorN.slice(),
                    submit: true
                });
            }
        }

    }

    nextP = () => {
        let formitems = collectform(this.answer.current)
        var writed = Object.getOwnPropertyNames(formitems)[this.state.problemId]
        // console.log(writed)
        if (typeof (writed) == "undefined")
            alert('請選擇答案!!!')
        else {
            this.setState({
                problemId: this.state.problemId + 1
            });
        }
    }

    backP = () => {
        this.setState({
            problemId: this.state.problemId - 1
        });
    }

    resetproblem = async (id) => {
        const { login, info } = this.props
        if (!login)
            alert("請登入")
        this.setState({
            cid: id,
            submit: false,
            problemId: 0,
        })
        await this.get_api()
    }

    gotohome = () => {
        this.props.history.push(`/`)
    }

    render() {
        // console.log('img render')
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return (
                <div className="LinearProgressonptop">
                    {/* <LinearProgress /> */}
                </div>
            );
        }
        else {
            const { login, info, getuserimg, userimg } = this.props
            const { submit, problemId, data, myAns, ansset, inputSet, cid } = this.state;
            const problemList = this.problemList(data)
            return (
                <div>
                    <div className="wrapper">
                        <div className="main_content_Exam dis-center2">
                            <div className="examcontainer2">
                                {
                                    login && !submit && cid != 0 &&
                                    <form ref={this.answer}>
                                        <div>{problemList}</div>
                                        <div className="exambtn-list">
                                            {problemId == problemList.length - 1 &&
                                                <div className="submit">
                                                    <div className="dis-center2">
                                                        <button type="button" className="btn" onClick={this.submit}>Submit</button>
                                                    </div>
                                                </div>}
                                            {problemId != 0 &&
                                                <div className="back">
                                                    <button type="button" className="btn" onClick={this.backP}>
                                                        back <i className="fas fa-arrow-left"></i>
                                                    </button>
                                                </div>}
                                            {problemId != problemList.length - 1 &&
                                                <div className="next">
                                                    <button type="button" className="btn" onClick={(e) => this.nextP(problemList.length)}>
                                                        Next <i className="fas fa-arrow-right"></i>
                                                    </button>
                                                </div>}
                                        </div>
                                    </form>
                                }
                                {
                                    login && submit &&
                                    <Detail data={data} getstr={this.getstr} ans={inputSet}
                                        myans={myAns} ansset={ansset} f5check={this.f5check}>
                                    </Detail>
                                }
                                {
                                    !login &&
                                    <div className="dis-center" style={{ "height": "calc(80vh)" }}>
                                        <div className="help-map dis-center">
                                            <div className="help-content">
                                                <div className="help-header">
                                                    <Cbtn Clickbtn={this.gotohome}></Cbtn>
                                                    <h4 className="help-title" id="mySmallModalLabel">
                                                        <i className="fa fa-warning"></i>
                                                        &ensp;Warning
                                                    </h4>
                                                </div>
                                                <div className="help-body dis-center2 animate-top">
                                                    <div>
                                                        <div className="dis-center"><div style={{ "fontSize": "25px" }}>請登入才能開啟評測功能！</div></div>
                                                        <img src={sorry} alt="" />
                                                        <div className="dis-flex-row dis-space-between">
                                                            <div></div>
                                                            <div></div>
                                                            <NavLink className="warning-btn1 mouse" to="/Home">回首頁 <i className='fas fa-home'></i></NavLink>
                                                            <NavLink className="warning-btn2 mouse" to="/log_in">登入去 <i className='fas fa-sign-in-alt'></i></NavLink>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }
}
