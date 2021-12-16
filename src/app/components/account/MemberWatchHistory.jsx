import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../../lib/api'

export default class MemberWatchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
        }
    }

    histroy = async () => {
        let data = await api({
            cmd: "Member/history",
            method: "get"
        })
        data = data.body
        // console.log(data)
        let historydata = []

        for (var i = 0; i < data.length; i++) {
            historydata.push({
                cname: data[i].CName,
                date: data[i].Since,
                oid: data[i].OID,
                channel: data[i].ChannelTitle,
                videoid: data[i].CDes
            })
        }
        // console.log(historydata)
        this.setState({
            data: historydata
        });
    }

    async componentDidMount() {
        // console.log('whistory DidMount')
        await this.histroy()
        this.setState({
            isLoaded: true,
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('whistory DidUpdate')
        if (prevState == this.state) {
            await this.histroy()
            this.setState({
                isLoaded: true,
            });
        }
    }

    render() {
        const { data } = this.state
        return (
            <div className="relative">
                <div>
                    <div className="dis-flex-row watch-search">
                        <input type="search" placeholder="Find a video...." aria-label="Find a video...." className="search-input width-full "></input>
                        <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>頻道</button>
                        <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>科目&ensp;<span className="dropdown-caret"></span></button>
                    </div>
                </div>
                {
                    data.map(d =>
                        <div key={d.oid} style={{ "marginTop": "24px" }}>
                            <div className="vcontainer temp-limit" >
                                <NavLink to={`/watch?v=${d.oid}`} className="dis-flex-row wytflame">
                                    <div>
                                        <img src={`https://i.ytimg.com/vi/${d.videoid}/mqdefault.jpg`} width="300px"></img>
                                    </div>
                                    <div className="dis-flex-column" style={{ "margin": "0px 8px" }}>
                                        <span title={d.cname} className="twoline">{d.cname}</span>
                                        <div className="ytviewct" style={{ "color": "gray", "marginTop": "6px" }}><span>{d.channel}</span></div>
                                        <div style={{ "marginTop": "6px" }}><span>上次觀看時間：{d.date.substr(2, 14).replaceAll('-', '/').replaceAll('T', '-')}</span></div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}
