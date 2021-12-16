import React, { Component } from 'react'
import w3school from '../../image/w3icon.jpg' //圖片位置需要改動
import fb from '../../image/fb.jpg' //圖片位置需要改動
import react from '../../image/react.jpg' //圖片位置需要改動
import github from '../../image/github.png' //圖片位置需要改動
import api from '../../lib/api'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.input = React.createRef();
    }

    submitEmail = async () => {
        if (this.state.email.length == 0) {
            alert('please input Email !')
        }
        else {
            let status = await api({
                cmd: "Mail/send",
                method: "post",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: {
                    email: this.state.email,
                    subject: 'N108 Send mail for you',
                    text: 'N108 Nice to meet you！'
                }
            })
            if (status.body == 0)
                alert('傳送 Fail ! \n請重新輸入 !')
            else
                alert('傳送 Success ! 請收取郵件 !')
            this.input.current.value = ""
            this.setState({
                email: ""
            })

        }
    }

    inputEmail = (e) => {
        // console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    render() {
        const { CTitle, CName } = this.props
        return (
            <div className="footer">
                <div className="container">
                    {/* <div className="back-to-top">
                        <a href="#top"><i className="fas fa-chevron-up"></i></a>
                    </div> */}
                    <div className="footer-content">
                        <div className="footer-content-about animate-top">
                            <h4>About Us</h4>
                            <div className="asterisk">{CTitle}</div>
                            <pre>
                                {CName}
                            </pre>
                        </div>
                        <div className="footer-content-divider animate-bottom">
                            <div className="social-media">
                                <h4>Follow along</h4>
                                <ul className="social-icons">
                                    <li>
                                        <a href="https://www.facebook.com/groups/wke405/" target="__blank">
                                            <i className="fab"><img src={fb} alt="" /></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/facebook/react" target="__blank">
                                            <i className="fab"><img src={react} alt="" width="32px" /></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.w3schools.com/w3css/default.asp" target="__blank">
                                            <i className="fab"><img src={w3school} alt="" width="32px" /></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/" target="__blank">
                                            <i className="fab"><img src={github} alt="" width="32px" /></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="newsletter-container">
                                <h4>Newsletter</h4>
                                <form id="emailform" className="newsletter-form" >
                                    <input id='email' type="text" className="newsletter-input" ref={this.input} placeholder="Your email address..." onChange={this.inputEmail} />
                                    <button className="newsletter-btn" type="button" onClick={this.submitEmail}>
                                        <i className="fas fa-envelope"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
