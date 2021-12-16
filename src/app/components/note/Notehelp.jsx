import React, { Component } from 'react'
import NoteHelpWrapper from './NoteHelpWrapper.jsx'
import Helpbtn from './NoteHelpBtn.jsx'

export default class Notehelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openHelp: false
        }
    }

    Clickbtn = () => {
        this.setState({
            openHelp: !this.state.openHelp
        })
    }

    render() {
        const { openHelp } = this.state
        return (
            <div id="notetitle">
                <Helpbtn Clickbtn={this.Clickbtn}></Helpbtn>
                { openHelp && <NoteHelpWrapper Clickbtn={this.Clickbtn}></NoteHelpWrapper>}
                <div>NOTE</div>
                <div></div>
            </div>
        )
    }
}
