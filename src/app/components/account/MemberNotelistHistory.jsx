import React, { Component } from 'react'
import api from '../../lib/api'
import Notecontent from './MemberNotehistory'

export default class MemberNotelistHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
            isloaded: false
        }
    }

    fullnote = async () => {
        let data = await api({
            cmd: "Member/Notelisthistory",
            method: "get"
        })
        data = data.body
        // console.log(data)
        this.setState({
            note: data,
        });
    }

    componentDidMount = async () => {
        // console.log('membernote DidMount')
        await this.fullnote()
        this.setState({
            isLoaded: true
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('membernote DidUpdate')
        if (prevState == this.state) {
            await this.fullnote()
            this.setState({
                isLoaded: true
            });
        }
    }

    render() {
        const { note } = this.state
        return (
            <div className="relative">
                <div>
                    <div className="dis-flex-row watch-search">
                        <input type="search" placeholder="Find a Note...." aria-label="Find a Note...." className="search-input width-full"></input>
                        <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>主題</button>
                        <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>內容</button>
                        <button name="button" type="button" className="btn2" style={{ "margin": "0px 8px" }}>科目&ensp;<span className="dropdown-caret"></span></button>
                    </div>
                    <div>
                        <ul>
                            {note.map(n => <Notecontent key={n.OID} OID={n.OID} CName={n.CName} CDes={n.CDes} notecount={n.notecount}></Notecontent>)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
