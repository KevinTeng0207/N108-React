import React, { Component } from 'react'
import Timecal from '../tool/Time.jsx'
import InfoBtn from './MemberInfoBtn'
import api from '../../lib/api'

export default class Memberinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topbarshowIMG: false,
            uploadwrapper: false,
            isLoaded: false,
            Userinfo: []
        }
    }

    userinfo = async () => {
        let data = await api({
            cmd: "Account/UserInfo",
            method: "get"
        })
        data = data.body
        // console.log(data[0])
        this.setState({
            Userinfo: data[0]
        });
    }

    async componentDidMount() {
        // console.log('member DidMount')
        await this.userinfo()
        this.setState({
            isLoaded: true,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log('member DidUpdate')
        if (prevState == this.state) {
            await this.userinfo()
            this.setState({
                isLoaded: true,
            });
        }
    }

    render() {
        const { info } = this.props
        const { Userinfo, isLoaded } = this.state
        if (!isLoaded)
            return (<div></div>)
        else {
            return (
                <div className="relative">
                    <div className="Box-userinfo" style={{ "marginTop": "24px" }}>
                        <div>
                            <div className="node_category">
                                <div>{info.CName}&ensp;先生/小姐&ensp;您好！</div>
                            </div>
                        </div>
                        <div className="node_category">
                            <li>Email：<InfoBtn type={"email"} data={Userinfo.Email} userinfoapi={this.userinfo}></InfoBtn></li>
                            <li>電話：<InfoBtn type={"phone"} data={Userinfo.Phone} userinfoapi={this.userinfo}></InfoBtn></li>
                            <li>地址：<InfoBtn type={"address"} data={Userinfo.Address} userinfoapi={this.userinfo}></InfoBtn></li>
                            <li>生日：<InfoBtn type={"birthday"} data={Userinfo.Birthday == null ? null : Userinfo.Birthday.split('T')[0]} userinfoapi={this.userinfo}></InfoBtn></li>
                            <li>上次登入：<Timecal time={Userinfo.LastLoginDT}></Timecal></li>
                            <li>登入錯誤次數：{Userinfo.LoginErrCount}</li>
                            <li>寄信請求：
                                {Userinfo.SendEmailok ?
                                    <div className="SendEmail inline" style={{ "color": "LimeGreen" }}>許可</div>
                                    :
                                    <div className="SendEmail inline" style={{ "color": "red" }}>禁止</div>}
                            </li>
                        </div>
                    </div>
                </div>
            )
        }

    }
}