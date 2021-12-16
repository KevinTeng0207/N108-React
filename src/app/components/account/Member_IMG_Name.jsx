import React, { Component } from 'react'
// import parent from '../../image/parnet.png'
// import teacher from '../../image/teacher.png'
// import student from '../../image/student.png'
import google from '../../image/google.png'
import wke from '../../image/wkesso2.png'
import facebook from '../../image/facebook.png'
import { SSO } from '../../json/SSO.json'

export default class MemberImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.topbarshowIMG
        }
        this.scrollpos = React.createRef();
    }

    componentDidMount = () => { // On mount, check to see if the API script is already loaded
        window.addEventListener('scroll', this.bindScroll, true)
    }

    bindScroll = () => {
        const { showtopbarIMG, closetopbarIMG, topbarshowIMG } = this.props
        let pos = this.scrollpos.current
        if (window.scrollY >= pos.offsetHeight) {
            if (this.state.show == topbarshowIMG)
                showtopbarIMG()
        }
        else {
            if (this.state.show != topbarshowIMG)
                closetopbarIMG()
        }
        // console.log(window.scrollY)
        // console.log(pos.offsetHeight, pos.offsetTop)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindScroll, true);
    }

    render() {
        const { login, info, userimg, clickwrapper } = this.props
        let name = `${info.CName}`
        return (
            <div className="userimg dis-flex">
                <div className="mt_-32">
                    <div ref={this.scrollpos}>
                        <span className="myfaceimg dis-center">
                            {
                                userimg.length ?
                                    <img className="myface" src={userimg} alt="" />
                                    :
                                    <div className="noface">
                                        {name}
                                    </div>
                            }
                            {info.sso == 'WKESSO' &&
                                <form className="iconsplace dis-center mouse" title="新增頭貼">
                                    <label className="mouse">
                                        <i className="fa fa-camera mouse" onClick={clickwrapper}></i>
                                    </label>
                                </form>}
                        </span>
                        <div className="fullinfoname overflow">
                            {info.CName}
                            <div className="ssowhere">
                                {info.sso == 'WKESSO' && <i><img src={wke} alt="" width="32px" />{info.sso}</i>}
                                {info.sso == 'GoogleSSO' && <i><img src={google} alt="" width="32px" />{info.sso}</i>}
                                {info.sso == 'FacebookSSO' && <i><img src={facebook} alt="" width="32px" />{info.sso}</i>}
                            </div>
                        </div>
                    </div>
                    {/* <div className="belong">
                        身分：尚未設定
                        <img src={parent} alt="" width="48px" />
                        <img src={teacher} alt="" width="48px" />
                        <img src={student} alt="" width="48px" />
                    </div> */}
                    <button name="button" type="button" className="btn2 btn-block2">Edit profile</button>
                </div>
            </div>
        )
    }
}
