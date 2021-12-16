import React, { Component } from 'react'
import Sample from '../exam/ExamExpProblem.jsx'
import api from '../../lib/api.js'

export default class VideoDes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            problem: []
        }
    }

    async componentDidMount() {
        let { oid } = this.props;
        // console.log(oid)
        let data = await api({
            cmd: "Exam/example_exam?oid=" + oid,
            method: "get"
        })
        data = data.body
        // console.log(data)
        this.setState({
            problem: data
        })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState == this.state) {
            let { oid } = this.props;
            let data = await api({
                cmd: "Exam/example_exam?oid=" + oid,
                method: "get"
            })
            data = data.body
            // console.log(data)
            this.setState({
                problem: data
            })
        }
    }

    click = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let { ytinfo } = this.props;
        let { open, problem } = this.state;
        // console.log(ytinfo)
        return (
            <div id="videodes">
                {open && <Sample problemid={problem} Clickbtn={this.click}></Sample>}
                <span className="mouse videotool examvideotool" onClick={this.click}>相關考題</span>
                <div className="edu-yttitle">{ytinfo.CName}</div>
                <div className="edu-ytviewct">觀看次數：{ytinfo.nClick}次</div>
            </div>
        )
    }
}
