import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo_wb from '../../image/homelogo.png'
import member from '../../image/avatar.png'
import wkesso from '../../image/wkesso3.png'
import api from '../../lib/api'

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            click: false
        };
        this.show = this.show.bind(this);
    }

    my_preventDefault = (event) => {
        event.preventDefault();
        // alert("You are submitting " + this.state.username);
    }

    Change_username = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    Change_password = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    gotowke = async () => {
        let data = await api({
            cmd: "Auth/wkessologin",
            method: "get"
        })
        // console.log(data.body)
        window.location.href = data.body
    }

    gotogoogle = async () => {
        let data = await api({
            cmd: "Auth/google/url",
            method: "get"
        })
        // console.log(data.body)
        window.location.href = data.body
    }

    gotofacebook = async () => {
        let data = await api({
            cmd: "Auth/facebook/url",
            method: "get"
        })
        // console.log(data.body)
        window.location.href = data.body
    }

    // goto2 = () => {
    //     window.location.href = "https://wkesso.wke.csie.ncnu.edu.tw/"
    // }

    show() {
        this.setState({
            click: !this.state.click
        });
        console.log(this.state.click)
        console.log(this.state.username)
        console.log(this.state.password)
    }

    render() {
        const { login, info } = this.props
        return (
            <div className="login_cover">
                <div className="home2">
                    <NavLink to="/Home"><img className="logo2" src={logo_wb} alt="logo"></img></NavLink>
                    <div className="login-containter2 float-r dis-center">
                        <button className="loginBtn loginBtn--wke dis-center mouse" type="button" onClick={this.gotowke}>
                            WKE
                        </button>
                    </div>
                    {/* <div className="login-containter2 float-r dis-center">
                        <div className="login3 mouse" to="#" onClick={this.goto2}> 舊版 WKE SSO</div>
                    </div> */}
                    <div className="login-containter2 float-r dis-center">
                        <NavLink className="login2" to="#">忘記密碼</NavLink>
                    </div>
                    <div className="login-containter2 float-r dis-center">
                        <NavLink className="login2" to="#">忘記帳號</NavLink>
                    </div>
                    <div className="login-containter2 float-r dis-center">
                        <NavLink className="login2" to="#">註冊</NavLink>
                    </div>
                </div>
                <div className="dis-center view-login">
                    <div id="myModal" className="modal fade show" aria-modal="true">
                        <div className="modal-dialog modal-login">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="avatar">
                                        <img className="img" src={member} alt="Avatar"></img>
                                    </div>
                                    <h4 className="modal-title h4">Member Login</h4>
                                </div>
                                <div className="dis-center" style={{ "margin": "16px 0px" }}>
                                    <button className="loginBtn loginBtn--facebook dis-center mouse" type="button" onClick={this.gotofacebook}>
                                        Facebook
                                    </button>
                                    <button className="loginBtn loginBtn--google dis-center mouse" type="button" onClick={this.gotogoogle}>
                                        Google
                                    </button>
                                    {/* <button class="loginBtn loginBtn--wke dis-center mouse" type="button" onClick={this.goto}>
                                        WKE
                                    </button> */}
                                </div>
                                <div className="modal-body">
                                    <form className="form" method="post" onSubmit={this.my_preventDefault}>
                                        <div className="form-group">
                                            <input type="text" className="form-control input" name="username" placeholder="Username" required="required" onChange={this.Change_username}></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control input" name="password" placeholder="Password" required="required" onChange={this.Change_password}></input>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-lg btn-block" onClick={this.show}>Login</button>
                                        </div>
                                    </form>
                                </div>
                                {/* {this.state.click && <div><h1>username = {this.state.username}</h1><h1>password = {this.state.password}</h1></div>} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
