import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import api from '../../lib/api'
import { school } from '../../json/school.json'
import Content from './LearnSiderbarContent'
import CSubject from './LearnSidebarSubject'
class LearnSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            isLoaded: false,
        };
    }

    GetSchoolCID(schoolname) {
        for (var i = 0; i < school.length; i++) {
            if (schoolname == school[i].name)
                return school[i].cid;
        }
    }

    Sidebar = async () => {
        const { schoolname } = this.props
        let type = this.GetSchoolCID(schoolname)
        let data = await api({
            cmd: "Learn/subject?cid=" + type,
            method: "get"
        })
        data = data.body
        // console.log(data)
        this.setState({
            data: data,
        });

    }

    async componentDidMount() {
        // console.log('sidebar DidMount')
        await this.Sidebar()
        const { data } = this.state
        const { domainID, choosedomainIndex, Set_sidebarValue } = this.props
        Set_sidebarValue(domainID == 0 ? data[0].PID : domainID, choosedomainIndex == 0 ? 0 : choosedomainIndex)
        this.setState({
            isLoaded: true,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log('sidebar DidUpdate')
        if (prevProps.schoolname != this.props.schoolname) {
            await this.Sidebar()
            const { data } = this.state
            const { Set_sidebarValue } = this.props
            Set_sidebarValue(data[0].PID, 0)
            this.setState({
                isLoaded: true,
            });
        }
    }

    render() {
        const { data } = this.state
        const { domainID, contentID, choosedomainIndex, Set_sidebarValue, Set_contentValue } = this.props
        return (
            <div className="sidebar animate-left">
                <CSubject
                    data={data}
                    choosedomainIndex={choosedomainIndex}
                    Set_sidebarValue={Set_sidebarValue}
                />
                <Content
                    domainID={domainID}
                    contentID={contentID}
                    Set_contentValue={Set_contentValue}
                />
                <div className="refer oneline subtitle">© Web Knowledge Extraction</div>
            </div>
        )
    }
}

export default withRouter(LearnSidebar);