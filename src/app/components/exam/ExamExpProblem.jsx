import React, { Component } from 'react'
import Cbtn from '../tool/Closebtn.jsx'
import { NavLink } from 'react-router-dom'
import examimg from '../../image/exam.png'
import Problem_img from './ExamProblemImg.jsx'

export default class Notehelpwrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
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

    render() {
        const { Clickbtn, idlist, problemid } = this.props //開關的 function
        console.log(problemid)
        return (
            <div className="help-map dis-center">
                <div className="help-content">
                    <div className="help-header">
                        <Cbtn Clickbtn={Clickbtn}></Cbtn>
                        <h4 className="help-title" id="mySmallModalLabel">
                            <i className="fa fa-question-circle"></i>
                            &ensp;Sample Exam
                        </h4>
                    </div>
                    <div className="help-body">
                        {problemid.map(p =>
                            <div className="problem-containter" key={p.OID2}>
                                <Problem_img str={this.getstr(p)}></Problem_img>
                            </div>)}
                    </div>
                    <NavLink className="noteimg pointer examposition" title="簡易考試" to="/Exam_app/High_senior?cid=3812">
                        <img src={examimg} width="25px" height="25px"></img>
                    </NavLink>
                </div>
                <div className="help-map mouse dis-center" onClick={Clickbtn}></div>
            </div>
        )
    }
}
