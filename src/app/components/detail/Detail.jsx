import React, { Component } from 'react'
import Problem_img from '../exam/ExamProblemImg.jsx'
import Detail_btn from './Detailbtn.jsx'

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showoverflow: true,
        };
    }

    componentDidMount = async () => {
        document.addEventListener("keydown", this.props.f5check);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.props.f5check);
    }

    OverFlow = () => {
        this.setState({
            showoverflow: !this.state.showoverflow
        })
    }

    problemList() {
        const { data, ans, myans, ansset } = this.props
        let problemlist = []
        for (var i = 0; i < data.length; i++) {
            let str = this.props.getstr(data[i])
            let YorN = (ans[i] == 'yes' ? true : false)
            problemlist.push(
                <div className={`problem-containter ${YorN ? "yes" : "no"}`} key={data[i].pid}>
                    <div className="inputa">你的答案：{myans[i][1]}</div>
                    <div className="outputa">正確答案：{ansset[i]}</div>
                    <Problem_img str={str}></Problem_img>
                    <Detail_btn OverFlow={this.OverFlow} pid={data[i].pid}></Detail_btn>
                </div>
            )
        }
        return problemlist
    }


    render() {
        const DetailList = this.problemList()
        return (
            <div className={`total ${this.state.showoverflow ? "" : " hidden"}`}>
                {DetailList}
            </div>
        )
    }
}
