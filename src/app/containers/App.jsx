import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/account/Login.jsx'
import PageSwitch from '../components/PageSwitch.jsx'
import { apiurl } from '../../../config.json'
import IDtopath from '../lib/IDtopath'
import api from '../lib/api'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            info: "",
            userimg: "",
        };
    }

    getuserimg = async (type) => {
        let data = ""
        switch (type) {
            case 'WKESSO':
                data = await api({
                    cmd: "Account/userimg",
                    method: "get"
                })
                data = data.body
                console.log(data[0])
                if (data[0]) {
                    this.setState({
                        userimg: apiurl + "/fileStorage/" + IDtopath(data[0].OID2) + data[0].FileExtension
                    })
                }
                break;
            case 'GoogleSSO':
                data = await api({
                    cmd: "Account/googleuserimg",
                    method: "get"
                })
                data = data.body
                // console.log(data[0])
                if (data[0]) {
                    this.setState({
                        userimg: data[0].Picture_URL.split("96")[0] + '320-c' // 320px * 320px
                    })
                }
                break;
            case 'FacebookSSO':
                data = await api({
                    cmd: "Account/facebookuserimg",
                    method: "get"
                })
                data = data.body
                console.log(data[0])
                if (data[0]) {
                    this.setState({
                        userimg: data[0].picture_url
                    })
                }
                break;
        }
    }

    async componentDidMount() {
        // let info = await fetch("https://n108.wke.csie.ncnu.edu.tw:8888/Account/UserInfo", { credentials: 'include', withCredentials: true }).then(response => response.json());
        let info = await api({
            cmd: "Account/User",
            method: "get",
        })
        info = info.body
        console.log(info)
        if (info[0] != null) {
            await this.getuserimg(info[0].sso)
            this.setState({
                info: info[0],
                login: true
            })
        }
        else {
            this.setState({
                info: [],
                login: false
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState == this.state) {
            // let info = await fetch("https://n108.wke.csie.ncnu.edu.tw:8888/Account/UserInfo", { credentials: 'include', withCredentials: true }).then(response => response.json());
            let info = await api({
                cmd: "Account/User",
                method: "get",
            })
            info = info.body
            // console.log(info)
            if (info[0] != null) {
                await this.getuserimg(info[0].sso)
                this.setState({
                    info: info[0],
                    login: true
                })
            }
            else {
                this.setState({
                    info: [],
                    login: false
                })
            }
        }
    }
    render() {
        const { login, info, userimg } = this.state
        return (
            <Switch>
                <Route path='/log_in' render={props => <Login {...props} login={login} info={info}
                    userimg={userimg}></Login>}></Route>
                <Route path='/' render={props => <PageSwitch {...props} login={login} info={info}
                    userimg={userimg} getuserimg={this.getuserimg}></PageSwitch>}></Route>
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
