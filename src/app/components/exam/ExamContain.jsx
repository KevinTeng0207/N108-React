import React, { Component } from 'react'
import api from '../../lib/api.js'
import Exam from './ExamWrapper'
import { NavLink } from 'react-router-dom'
// import Chart from "react-google-charts";
import ReactLoading from "react-loading";
import back from '../../image/go-back-arrow.png'
import back2 from '../../image/go-back-arrow2.png'

export default class ExamContain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageNumber: 1,
            TotalPageNumber: 0,
            isLoaded: false,
            hoverBack: false,
        };
    }

    get_api = async () => {
        const { selectData } = this.props
        let sidebar = await api({
            cmd: "Exam/exam?type=" + selectData.type,
            method: "get"
        })
        sidebar = sidebar.body
        // console.log(sidebar)
        this.setState({
            data: sidebar,
            pageNumber: 1,
            TotalPageNumber: Math.ceil(sidebar.length / 4)
        });

    }

    componentDidMount = async () => {
        // console.log('exam DidMount')
        await this.get_api()
        this.setState({
            isLoaded: true,
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('exam DidUpdate')
        if (prevState == this.state) {
            await this.get_api()
            this.setState({
                isLoaded: true,
            });
        }
    }

    subcolor(subject) {
        switch (subject) {
            case '生物':
                return (<span className="subject-color-1"></span>);
            case '物理':
                return (<span className="subject-color-2"></span>);
            case '化學':
                return (<span className="subject-color-3"></span>);
            case '地科':
                return (<span className="subject-color-4"></span>);
        }
    }

    gradecolor(grade) {
        switch (grade) {
            case '高一':
                return (<span className="grade-color-1"></span>);
            case '高二':
                return (<span className="grade-color-2"></span>);
            case '高三':
                return (<span className="grade-color-3"></span>);
        }
    }

    produceList(data, pageNumber) {
        let list = []
        let start = (pageNumber - 1) * 4
        let end = start + 4 > data.length ? data.length : (start + 4)
        for (let i = start; i < end; i++) {
            list.push(
                <li key={data[i].CID}>
                    <NavLink className="mouse examgo" to={`/Exam_wrapper?cid=${data[i].CID}`}>
                        <div className="refschoolname dis-center2">{'1' + data[i].CName.split('1')[1]}</div>
                        <span className="subjectname">{this.subcolor(data[i].sub)}{data[i].sub}</span>
                        <span>{this.gradecolor(data[i].grade)}{data[i].grade}</span>
                    </NavLink>
                </li>
            )
        }
        return list
    }

    SetPageNumber = (num) => {
        this.setState({
            pageNumber: num
        })
    }

    nextPageNumber = (num, limit) => {
        this.setState({
            pageNumber: num >= limit ? this.state.pageNumber : this.state.pageNumber + 1
        })
    }

    backPageNumber = (num, limit) => {
        this.setState({
            pageNumber: num <= limit ? this.state.pageNumber : this.state.pageNumber - 1
        })
    }

    pagination(TotalPageNumber, pageNumber) {
        let pagination = []
        for (let i = 0; i < TotalPageNumber; i++) {
            pagination.push(
                <li key={'pagination' + i}>
                    <div className={`${i == pageNumber - 1 && "active"} mouse`} onClick={(e) => this.SetPageNumber(i + 1)}>{i + 1}</div>
                </li>
            )
        }
        return pagination
    }

    hoverClick = () => {
        this.setState({
            hoverBack: !this.state.hoverBack
        })
    }

    render() {
        const { selectData, Close_select } = this.props
        const { data, pageNumber, isLoaded, TotalPageNumber, hoverBack } = this.state
        if (!isLoaded) {
            return (
                <div className="main_content_Exam dis-center overflow">
                    <div className="overflow">
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
                <div className="dis-space-between relative" style={{ "height": "100%" }}>
                    <div className="dis-center" style={{ "width": "100%" }}></div>
                    <div className="relative examlist">
                        <div className="dis-flex-row watch-search">
                            <div className="inline-block mouse"
                                style={{ "marginRight": "10px" }}
                                onClick={Close_select}
                                onMouseOver={this.hoverClick}
                                onMouseOut={this.hoverClick}
                            >
                                {hoverBack ? <img src={back2} alt="" width="32px" /> : <img src={back} alt="" width="32px" />}
                            </div>
                            <input type="search" placeholder="Find a Exam...." aria-label="Find a Exam...." className="search-input width-full"></input>
                            <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>科目&ensp;<span className="dropdown-caret"></span></button>
                            <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>年級&ensp;<span className="dropdown-caret"></span></button>
                        </div>
                        <ol className="gradient-list">
                            {this.produceList(data, pageNumber)}
                        </ol>
                        <div className="dis-center pagination-containter">
                            <ul className="pagination">
                                <li className="mouse"><div onClick={(e) => this.backPageNumber(pageNumber, 1)} >«</div></li>
                                {this.pagination(TotalPageNumber, pageNumber)}
                                <li className="mouse"><div onClick={(e) => this.nextPageNumber(pageNumber, TotalPageNumber)}>»</div></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ "width": "100%" }}></div>
                </div >
            )
        }

    }
}
