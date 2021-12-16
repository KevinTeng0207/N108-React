import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import logo_wb from '../../image/homelogo.png'
import api from '../../lib/api'
import google from '../../image/google.png'
import wke from '../../image/wkesso2.png'
import facebook from '../../image/facebook.png'
import Selector from './SchoolSelector.jsx'

class APPbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
        this.onListenMenu = this.onListenMenu.bind(this);
        this.offListenMenu = this.offListenMenu.bind(this);
    }

    my_preventDefault = (event) => {
        event.preventDefault();
        // alert("You are submitting " + this.state.username);
    }

    logout = async () => {
        await api({
            cmd: "Account/logout",
            method: "post",
            credentials: 'include',
            withCredentials: true
        })
        this.setState({
            showMenu: !this.state.showMenu
        })
        this.props.history.push(`/`)
    }

    MenuClick = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.offListenMenu);
        });
    }

    onListenMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.offListenMenu);
        });
    }

    offListenMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.offListenMenu);
            });
        }
    }

    render() {
        const { login, info, getuserimg, userimg, route, schoolname, click_sidebar } = this.props
        const { showMenu } = this.state
        console.log(route)
        return (
            <div className="APPbar">
                <div className="home">
                    {route == 'Learn_app' && <div className="float-l dis-center opensidebar-contain"><button className="opensidebar-icon float-l" onClick={click_sidebar}>&#9776;</button></div>}
                    <NavLink className="mouse float-l" to="/Home">
                        <img className="logoimg" src={logo_wb} alt="logo"></img>
                    </NavLink>
                    {!login && <NavLink className="login inlineblock float-r mouse" to="/log_in">LOG IN</NavLink>}
                    {login &&
                        <div className="logined-containter float-r dis-center mouse" onClick={this.onListenMenu}>
                            <div>
                                {userimg.length ?
                                    <div className="imgicon dis-center">
                                        <img src={userimg} alt="" />
                                    </div>
                                    :
                                    <svg viewBox="0 0 24 24" className="yt-icon2 icon-member">
                                        <g className="yt-icon2">
                                            <path d="M12,0 C18.62375,0 24,5.37625 24,12 C24,18.62375 18.62375,24 12,24 C5.37625,24 0,18.62375 0,12 C0,5.37625 5.37625,0 12,0 Z M12,10.63625 C13.66,10.63625 15,9.29625 15,7.63625 C15,5.97625 13.66,4.63625 12,4.63625 C10.34,4.63625 9,5.97625 9,7.63625 C9,9.29625 10.34,10.63625 12,10.63625 Z M12,12.40875 C8.33375,12.40875 5.455,14.18125 5.455,15.8175 C6.84125,17.95 9.26875,19.3625 12,19.3625 C14.73125,19.3625 17.15875,17.95 18.545,15.8175 C18.545,14.18125 15.66625,12.40875 12,12.40875 Z" className="yt-icon2"></path>
                                        </g>
                                    </svg>
                                }
                                {info.sso == 'WKESSO' && <div className="ssoiconplace"><img src={wke} alt="" /></div>}
                                {info.sso == 'GoogleSSO' && <div className="ssoiconplace"><img src={google} alt="" /></div>}
                                {info.sso == 'FacebookSSO' && <div className="ssoiconplace"><img src={facebook} alt="" /></div>}
                            </div>
                        </div>}
                    <div>
                        {route == "Exam_wrapper" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to="/Exam_wrapper">考試中</NavLink>}
                        {route == "Member" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to="/Member?type=profile">會員區</NavLink>}
                        {route == "watch" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to="/watch">學習中</NavLink>}
                        {route != "Exam_wrapper" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to="/Exam_app?school=High_senior">評測中心</NavLink>}
                        {route != "watch" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to={`/Learn_app?school=High_senior`}>學習中心</NavLink>}
                        {route == "Home" && <NavLink activeClassName="app-selected underline-right" className="float-r inlineblock app mouse underline-right" to="/Home">首頁</NavLink>}
                    </div>
                    {route == "Exam_app" && < Selector route={route} schoolname={schoolname} />}
                    {route == "Learn_app" && <Selector route={route} schoolname={schoolname} />}
                </div>
                {showMenu &&
                    <div className="mem-dropdown-content drop" ref={(element) => this.dropdownMenu = element}>
                        <div className="dis-center memcheck">Hi！ {info.CName}</div>
                        <NavLink className="mem-text mouse" onClick={this.MenuClick} to={"/Member?type=profile"}><i className="fa fa-user"></i>&ensp;會員資料</NavLink>
                        <NavLink className="mem-text mouse" onClick={this.MenuClick} to={"/Member?type=history"}><i className="fa fa-history"></i>&ensp;觀看紀錄</NavLink>
                        <NavLink className="mem-text mouse" onClick={this.MenuClick} to={"/Member?type=notehistory"}><i className="fas fa-book-open"></i>&ensp;筆記</NavLink>
                        {/* <div className="mem-text mouse" onClick={this.MenuClick}><i className="fa fa-cog"></i>&ensp;偏好設定</div> */}
                        <div className="dis-center mouse logout" onClick={this.logout}><i className="fa fa-sign-out"></i>&ensp;登出</div>
                    </div>}
            </div>
        )
    }
}

export default withRouter(APPbar);
