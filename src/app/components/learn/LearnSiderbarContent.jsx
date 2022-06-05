import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import api from '../../lib/api'

class LearnSiderbarContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false
        };
    }


    Sidebar = async () => {
        const { domainID } = this.props
        let data = await api({
            cmd: "Learn/titlecontent?cid=" + domainID,
            method: "get"
        })
        data = data.body
        console.log(data)
        this.setState({
            data: data,
        });

    }

    async componentDidMount() {
        // console.log('sidebar content DidMount')
        await this.Sidebar()
        // const { data } = this.state
        // const { Set_contentValue } = this.props
        // Set_contentValue(data[0].CCID)
        this.setState({
            isLoaded: true,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log('sidebar content DidUpdate')
        if (prevProps.domainID != this.props.domainID) {
            await this.Sidebar()
            const { data } = this.state
            const { Set_contentValue } = this.props
            Set_contentValue(data[0].CCID)
            this.setState({
                isLoaded: true,
            });
        }
    }

    stringsplit(string) {
        var str = string
        var res = str.split("（")
        res = res[0].split("(")
        return res[0]
    }

    content(data, contentID, Set_contentValue) {
        let temp = ""
        console.log(data)
        const bar = []
        for (let i = 0; i < data.length; i++) {
            if (temp != data[i].title) {
                bar.push(
                    <div
                        key={data[i].title}
                        className="oneline title"
                    >
                        <div style={{ "margin": "16px 0px 10px" }}>{this.stringsplit(data[i].title)}</div>
                    </div>
                )
                temp = data[i].title
            }
            bar.push(
                <div
                    className={`oneline subtitle padding mouse ${contentID == data[i].CCID && "active_"}`}
                    key={data[i].CCID}
                    onClick={(e) => Set_contentValue(data[i].CCID)}
                >
                    {this.stringsplit(data[i].CName)}
                </div>
            )
        }
        return bar
    }

    render() {
        const { domainID, contentID, Set_contentValue } = this.props
        const { data } = this.state
        return (
            <div>
                {this.content(data, contentID, Set_contentValue)}
            </div>
        )
    }
}

export default withRouter(LearnSiderbarContent);