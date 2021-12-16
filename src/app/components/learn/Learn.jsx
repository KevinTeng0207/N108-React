import React, { Component } from 'react'
import queryString from 'query-string'
import Sidebar from './LearnSidebar.jsx'
import YT_flame from './LearnYtFlame.jsx'
import Content from './LearnContent.jsx'

export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domainID: 0,
            choosedomainIndex: 0,
            contentID: 0,
            YTOID: 0,
            openYTflame: false,
        };
    }

    openVideoflame = (ID) => {
        this.setState({
            YTOID: ID,
            openYTflame: true
        })
    }

    Set_contentValue = (ID) => {
        this.setState({
            contentID: ID,
            openYTflame: false,
        })
    }

    Set_sidebarValue = (ID, index) => {
        this.setState({
            domainID: ID,
            choosedomainIndex: index
        })
    }

    render() {
        // console.log('sidebar render')
        const { login, info, getuserimg, userimg, hide_sidebar } = this.props
        const { domainID, choosedomainIndex, contentID, openYTflame, YTOID } = this.state
        const schoolname = queryString.parse(this.props.location.search).school
        return (
            <div>
                <div className="wrapper">
                    {hide_sidebar &&
                        <Sidebar
                            schoolname={schoolname}
                            domainID={domainID}
                            contentID={contentID}
                            choosedomainIndex={choosedomainIndex}
                            Set_sidebarValue={this.Set_sidebarValue}
                            Set_contentValue={this.Set_contentValue}
                        />}
                    {openYTflame ?
                        <YT_flame
                            YTOID={YTOID}
                            domainID={domainID}
                        /> :
                        <Content
                            login={login}
                            info={info}
                            schoolname={schoolname}
                            contentID={contentID}
                            openVideoflame={this.openVideoflame}
                        />
                    }
                </div>
            </div>
        )
    }
}