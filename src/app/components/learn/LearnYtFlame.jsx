import React, { Component } from 'react'
import api from '../../lib/api'
import ReactLoading from "react-loading";
import '../../styles/Bootstrap.styl'
import Thumbnails from './Thumbnails'

export default class YT_flame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            content: '',
            subject: '',
            code: '',
            error: null,
            isLoaded: false,
        };
    }

    get_api_data = async () => {
        const { YTOID, domainID } = this.props
        let data = await api({
            cmd: "Learn/video?cid=" + YTOID,
            method: "get"
        })
        let data2 = await api({
            cmd: "Learn/" + YTOID,
            method: "get"
        })
        let data3 = await api({
            cmd: "Learn/" + domainID,
            method: "get"
        })
        data = data.body
        data2 = data2.body
        data3 = data3.body
        console.log(data)
        // console.log(data2)
        // console.log(data3)
        this.setState({
            data: data,
            content: data2[0].CDes,
            code: data2[0].CName,
            subject: data3[0].CName
        });
    }


    componentDidMount = async () => {
        // console.log('YTlist DidMount')
        const { YTOID } = this.props
        if (YTOID != 0) {
            await this.get_api_data()
            this.setState({
                isLoaded: true,
            });
        }

    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('YTlist DidUpdate')
        if (prevState == this.state && this.props.YTOID != 0) {
            await this.get_api_data()
            this.setState({
                isLoaded: true,
            });
        }
    }

    render() {
        // console.log('YTlist render')
        const { error, isLoaded } = this.state;
        // console.log(window.screen.width)
        if (error)
            return <div>Error: {error.message}</div>;
        else if (!isLoaded) {
            return (
                <div className="main_content dis-center">
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
            );
        }
        else {
            const { data, content, code, subject } = this.state
            const { YTOID, domainID } = this.props
            return (
                <div className="main_content_YTflame" id="main_content_YTflame">
                    <div className="dis-center2">
                        <div className="course_top" style={{ "width": "80%" }}>
                            <div>
                                <div className="course_title">{content.split('。')[0]}</div>
                                <div className="course_content">
                                    <div>
                                        <span>科目</span>
                                        <div>{subject}</div>
                                    </div>
                                    <div>
                                        <span>代碼</span>
                                        <div>{code}</div>
                                    </div>
                                    <div>
                                        <span>影片數量</span>
                                        <div>{data.length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dis-center2 ytfcontainer">
                        <div className="container">
                            <ul className="list-unstyled video-list-thumbs row">
                                {data.map(d =>
                                    <Thumbnails
                                        key={d.oid}
                                        oid={d.oid}
                                        CDes={d.CDes}
                                        CName={d.CName}
                                        nClick={d.nClick}
                                    />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


