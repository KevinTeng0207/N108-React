import React, { Component } from 'react'
import Home from './home/Home.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import Working from './tool/Working.jsx'
import Learn from './learn/Learn.jsx'
import Exam from './exam/Exam.jsx'
import ExamWrapper from './exam/ExamWrapper.jsx'
import Info from './account/MemberProfile.jsx'
import Watch from './watch/Video.jsx'
import APPbar from './topbar/APPbar.jsx'
import queryString from 'query-string'
export default class PageSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide_sidebar: true,
        };
    }

    click_sidebar = () => {
        this.setState({
            hide_sidebar: !this.state.hide_sidebar
        })
    }

    render() {
        const { hide_sidebar } = this.state
        const { login, info, getuserimg, userimg } = this.props
        const schoolname = queryString.parse(this.props.location.search).school
        return (
            <div>
                <APPbar
                    id="top"
                    login={login}
                    info={info}
                    userimg={userimg}
                    getuserimg={getuserimg}
                    schoolname={schoolname}
                    click_sidebar={this.click_sidebar}
                    route={this.props.history.location.pathname.split('/')[1]}
                />
                <Switch>
                    <Route path="/Home"
                        render={props => <Home {...props}
                            login={login} info={info} userimg={userimg} getuserimg={getuserimg} ></Home>}></Route>
                    <Route path="/Work" component={Working}></Route>
                    {login && <Route path="/Member"
                        render={props => <Info {...props}
                            login={login} info={info} userimg={userimg} getuserimg={getuserimg} ></Info>}></Route>}
                    <Route path="/Exam_wrapper"
                        render={props => <ExamWrapper {...props}
                            login={login} info={info} userimg={userimg} getuserimg={getuserimg}></ExamWrapper>}></Route>
                    <Route path="/Exam_app"
                        render={props => <Exam {...props}
                            login={login} info={info} userimg={userimg} getuserimg={getuserimg}></Exam>}></Route>
                    <Route path="/Learn_app"
                        render={props => <Learn {...props}
                            login={login} info={info} userimg={userimg} getuserimg={getuserimg} hide_sidebar={hide_sidebar}></Learn>}></Route>
                    <Route path={`/watch`}
                        render={props => <Watch {...props}></Watch>}></Route>
                    <Redirect to="/Home"></Redirect>
                </Switch>
                {/* <Footer Cname="Web Knowledge Extraction (WKE) Lab."></Footer> */}
            </div>
        )
    }
}
