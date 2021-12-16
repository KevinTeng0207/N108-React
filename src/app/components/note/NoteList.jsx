import React, { Component } from 'react'
import delimg from '../../image/del.png'
import Markdown from '../tool/ReactMarkdown.jsx'
import api from '../../lib/api'
import { apiurl } from '../../../../config.json'
import Preview from './NotePreview.jsx';

// import addimg from '../../image/addtolist.png'

export default class FullNote extends Component {
    constructor(props) {
        super(props);
        this.notetextarea = React.createRef();
        this.state = {
            viewcontent: true
        }
    }

    componentDidMount = async () => {
        // console.log('full note Mount')
        let { focusnid, n, titleView } = this.props;
        // console.log("full" + focusnid + " focusnid" + n.NID)
        if (focusnid == n.NID) {
            document.getElementById(focusnid)
            titleView(1, focusnid)
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('full note update')
        let { n, markdownView } = this.props;
        let { viewcontent } = this.state;
        if (prevState.viewcontent != viewcontent && !viewcontent) {
            markdownView(1, n.NID)
        }
    }

    enterContent = (e, id) => {
        e.keyCode == 13 ? this.changeContentView(false) : "";
    }

    changeContentView = (tf) => {
        if (tf == true) {
            let { n, markdownView } = this.props;
            markdownView(0, n.NID)
        }
        this.setState({
            viewcontent: tf
        })
    }

    imgPaste = async (e, id) => {
        const { autoGrow, markdownView } = this.props;
        // console.log(e.clipboardData.items);
        let items = (e.clipboardData || e.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items));
        for (var i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf("image") == -1)
                continue;
            // Retrieve image on clipboard as blob
            var blob = items[i].getAsFile();
            console.log(blob)
            let data = await api({
                cmd: "File/uploadIMG",
                method: "post",
                fileList: [blob]
            })
            console.log(data.body)
            if (data.body.status == 1)
                this.notetextarea.current.value += `![Alt text](${apiurl}/${data.body.path})`

            console.log(this.notetextarea)
            autoGrow(id)
            markdownView(1, id)
        }
    }

    // etCss = async (e) => {
    //     var sr = e.target

    //     var len = sr.value.length;
    //     // this.setSelectionRange(sr, len - 1, len); //將游標定位到文字最後 
    //     // this.setSelectionRange(sr, len, len); //將游標定位到文字最後 
    // }

    // setSelectionRange(input, selectionStart, selectionEnd) {
    //     if (input.setSelectionRange) {
    //         input.focus();
    //         input.setSelectionRange(selectionStart, selectionEnd);
    //     }
    //     else if (input.createTextRange) {
    //         var range = input.createTextRange();
    //         range.collapse(true);
    //         range.moveEnd('character', selectionEnd);
    //         range.moveStart('character', selectionStart);
    //         range.select();
    //     }
    // }

    render() {
        let { n, titleView, keyLock, autoGrow, markdownView, toSec, delNote, setLightBoxNoteOn, addMarkdown, preview, text } = this.props
        let { viewcontent } = this.state
        return (
            <div className="edu-note" id={`n${n.NID}`} style={{ display: "" }}>
                <div className="secdel">
                    <div className="sectitle">
                        <span className="mouse tosec" onClick={() => toSec(n.CurrentTime)}>
                            {parseInt(n.CurrentTime / 60)}:{(((n.CurrentTime - parseInt(n.CurrentTime / 60) * 60) / 100).toFixed(2)).split('.')[1]}
                        </span>
                        <input type="text" id={`title${n.NID}`} defaultValue={n.Title} onBlur={(e) => { titleView(0, n.NID); keyLock(false) }}
                            onFocus={(e) => { keyLock(true); }} onKeyUp={(e) => this.enterContent(e, n.NID)}
                            autoComplete="off" style={{ width: '90%', display: 'none' }}></input>
                        <div id={`tview${n.NID}`} className="edu-yttitle" onDoubleClick={(e) => titleView(1, n.NID)}>
                            {n.Title.trim() == '' ? "(尚未命名)" : n.Title}
                        </div>
                    </div>
                    <div className="sectitle">
                        {/* <div className="padding-right" onClick={(e) => setLightBoxNoteOn(<AddNoteList NID={n.NID}></AddNoteList>)}>
                            <img className="pointer" src={addimg} width="20px" height="20px" title="加入筆記清單"></img>
                        </div> */}
                        <div className="mouse del" onClick={() => delNote(`${n.NID}`)}>
                            <img src={delimg} width="20px" height="20px" title="刪除筆記"></img>
                        </div>
                    </div>
                </div>
                {!viewcontent &&
                    <textarea id={n.NID} className="note-textarea" rows="1" defaultValue={n.Content} onKeyUp={(e) => addMarkdown(e)} onChange={(e) => autoGrow(n.NID)}
                        ref={this.notetextarea} onPaste={e => this.imgPaste(e, n.NID)} onFocus={(e) => { this.props.keyLock(1); }}
                        onBlur={(e) => { this.props.keyLock(0); this.changeContentView(true) }}
                        style={{ width: '100%', padding: '1px 2px', resize: 'none' }}>
                    </textarea>}
                {!!viewcontent &&
                    <article id={`g${n.NID}`} className="github markdown-body notem" onDoubleClick={(e) => (this.changeContentView(false))}>
                        {n.Content.trim() == '' ? "(尚未建立筆記)" : <Markdown content={n.Content} />}
                    </article>}
            </div>
        )
    }
}
