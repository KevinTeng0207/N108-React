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

    render() {
        const { data, inputSet, myans, ansset, getstr } = this.props
        return (
            <div className={`total ${this.state.showoverflow ? "" : " hidden"}`}>
                {data.map((d, i) =>
                    <div className={`problem-containter ${(inputSet[i] == 'yes') ? "yes" : "no"}`} key={d.pid}>
                        <div className="inputa">你的答案：{myans[i][1]}</div>
                        <div className="outputa">正確答案：{ansset[i]}</div>
                        <Problem_img str={getstr(d)}></Problem_img>
                        <Detail_btn OverFlow={this.OverFlow} pid={d.pid}></Detail_btn>
                    </div>)}
            </div>
        )
    }
}
