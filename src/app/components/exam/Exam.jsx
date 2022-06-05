import React, { Component } from 'react'
import api from '../../lib/api.js'
import ExamContain from './ExamContain'
import queryString from 'query-string'

export default class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            isSelect: false,
            selectData: [],
        };
    }

    get_api = async () => {
        let data = await api({
            cmd: "Exam/examlist",
            method: "get"
        })
        data = data.body
        // console.log(data)
        this.setState({
            isSelect: false,
            selectData: [],
            data: data,
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

    Set_select = (data) => {
        this.setState({
            isSelect: true,
            selectData: data,
        })
    }

    Close_select = () => {
        this.setState({
            isSelect: false,
            selectData: [],
        })
    }

    render() {
        const { login, info, getuserimg, userimg } = this.props
        const { data, isSelect, selectData } = this.state;
        const schoolname = queryString.parse(this.props.location.search).school
        return (
            <div>
                <div className="wrapper">
                    {!isSelect && schoolname == "High_senior" &&
                        <div className="book-content dis-flex-column">
                            <div>
                                <small>Choose a school...</small>
                            </div>
                            <div className="dis-flex-row">
                                {data.map(d =>
                                    <div className="bookwrapper mouse" key={d.type} onClick={(e) => this.Set_select(d)}>
                                        <div className="book">
                                            <div className="book__cover">
                                                <div className="book__detail">{d.type}</div>
                                                <h4>數量：{d.count}</h4>
                                            </div>
                                            <div className="book__page squared"></div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    {isSelect &&
                        <div className="main_content_Exam">
                            <ExamContain
                                selectData={selectData}
                                Close_select={this.Close_select}
                            />
                        </div>
                    }
                    {schoolname != "High_senior" &&
                        <div className="dis-center main_content_Exam" style={{ "height": "calc(80vh)" }}>
                            <div className="testing">
                                <div>尚無資料，敬請期待 ~</div>
                            </div>
                        </div>
                    }
                </div>
            </div >
        )
    }
}
