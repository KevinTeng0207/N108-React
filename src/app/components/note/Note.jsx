import React, { Component } from 'react'
import FullNote from './NoteList.jsx'
import Preview from './NotePreview.jsx';
import Notehelp from './NoteHelp.jsx';
import api from '../../lib/api'
import previewimg from '../../image/preview.png'

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
            text: "",
            preview: false,
            iconHover: false,
            openHelp: false,
            id: 0
        }
    }

    componentDidMount = async () => {
        // console.log('note DidMount')
        let note = await this.loadNote()
        this.setState({
            note
        })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('note Update')
        let note = await this.loadNote()
        if (prevState.note == this.state.note) {
            this.setState({
                note: note
            })
        }
        const { id, preview } = this.state
        let height = 0
        for (var i = 0; i < this.state.note.length; i++) {
            if (id == note[i].NID)
                break;
            height += document.getElementById(`n${note[i].NID}`).offsetHeight
        }
        let myscroll = document.getElementById("notescroll")
        if (preview == true) {
            myscroll.scrollTo(0, height);
        }
    }

    loadNote = async () => {
        let oid = this.props.oid
        // let note = await fetch(apiurl + '/getapi?method=loadNote&VID=' + this.props.oid, { credentials: 'include', withCredentials: true }).then(response => response.json());
        let note = await api({
            cmd: "Note/" + oid,
            method: "get",
            credentials: 'include',
            withCredentials: true
        })
        note = note.body
        return note
    }

    ocPreview = () => {
        let ocpreview = document.getElementById("preview")
        ocpreview.style.display == "none" ? ocpreview.style.display = "" : ocpreview.style.display = "none";
    }

    titleView = async (show, id) => {
        // console.log('title view')
        let tinp = document.getElementById(`title${id}`)
        let tdiv = document.getElementById(`tview${id}`)
        if (show == 0) {
            let text = tinp.value;
            let { note } = this.state
            let editnote = note.slice()
            editnote.filter(f => {
                if (f.NID == id)
                    f.Title = text
            })
            tinp.style.display = "none";
            tdiv.style.display = "";
            if (tdiv.innerText == "")
                tdiv.innerHTML = "(尚未命名)";
            await api({
                cmd: "Note/title",
                method: "put",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: { title: text, nid: id }
            })
            this.setState({
                note: editnote
            })
        }
        else if (show == 1) {
            tdiv.style.display = "none";
            tinp.style.display = "";
            tinp.focus();
        }
    }

    autoGrow = (id) => {
        let textarea = document.getElementById(id);
        let rowct = textarea.value.split('\n').length;
        let h = 1.0;
        textarea.style.height = h * rowct + 'px';
        let adjustedHeight = textarea.clientHeight;
        adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight);
        if (adjustedHeight > textarea.clientHeight)
            textarea.style.height = adjustedHeight + 'px';
    }

    markdownView = async (show, id, pos) => {
        // console.log('markdown view')
        let ginp = document.getElementById(id)
        let view = document.getElementById(`g${id}`)
        // console.log(view)
        if (show == 0) { //離開後取消預覽
            let text = ginp.value;
            if (text == null)
                text = ''
            let { note } = this.state
            let editnote = note.slice()
            editnote.filter(f => {
                if (f.NID == id)
                    f.Content = ginp.value
            })
            await api({
                cmd: "Note/content",
                method: "put",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                data: { content: text, nid: id }
            })
            this.setState({
                note: editnote,
                preview: false
            })
        }
        else {
            this.autoGrow(id);
            ginp.focus()
            this.setState({
                text: ginp.value,
                preview: true,
                id: id
            })
        }
    }

    addMarkdown = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        let { note, text, preview } = this.state;
        let { keyLock, toSec, delNote, islogin, focusnid } = this.props;
        return (
            <div id="note">
                <div id="allnote">
                    <Notehelp></Notehelp>
                    <div className="notescroll" id="notescroll">
                        {
                            note.length ? note.map(n =>
                                <FullNote key={n.NID} n={n} title={n.Title} content={n.Content} titleView={this.titleView}
                                    keyLock={keyLock} autoGrow={this.autoGrow} markdownView={this.markdownView} toSec={toSec}
                                    delNote={delNote} addMarkdown={this.addMarkdown} focusnid={focusnid} preview={preview}></FullNote>
                            ) : <div className="edu-note">{islogin ? "尚未建立筆記" : "登入建立專屬於自己的筆記"}</div>
                        }
                    </div>
                </div>
                {!!preview && <Preview text={text}></Preview>}
                {/* <div className="noteimg pointer previewposition" onClick={(e) => this.ocPreview()} title="關閉/開啟筆記">
                    <img src={previewimg} width="25px" height="25px"></img>
                </div> */}
            </div>
        )
    }
}
