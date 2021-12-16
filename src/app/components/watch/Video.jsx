import React, { Component } from 'react'
// import VideoComment from './VideoComment'
import noteimg from '../../image/note.png'
import addimg from '../../image/add.png'
import queryString from 'query-string'
import Note from '../note/Note.jsx'
import api from '../../lib/api'

export default class Watch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ytinfo: [],
            keylock: false,
            keypress: {},
            update: true,
            focusnid: -1
        }
        this.fivesec = null;
    }

    componentDidMount = async () => { // On mount, check to see if the API script is already loaded
        let oid = queryString.parse(this.props.location.search).v
        let ytinfo = await api({
            cmd: "Watch/show/" + oid,
            method: "get"
        })
        ytinfo = ytinfo.body
        this.setState({ ytinfo: ytinfo[0], update: true });
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            window.onYouTubeIframeAPIReady = this.loadVideo; // onYouTubeIframeAPIReady will load the video after the script is loaded
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else { // If script is already there, load the video directly
            this.loadVideo(ytinfo[0].Videoid);
        }
        document.addEventListener("keydown", this.onKeyDown); //新增案件事件
        document.addEventListener("keyup", this.onKeyUp);
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextState.update == false) {
            return false
        }
        return true
    }

    componentDidUpdate = async (prevProps, prevState) => {
        this.setState({ update: false })
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
        clearInterval(this.fivesec);
    }

    loadVideo = (url = this.state.ytinfo.Videoid) => { // the Player object is created uniquely based on the id in props
        this.player = new YT.Player('player', {
            videoId: url,
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange,
                'onPlaybackQualityChange': this.onPlaybackQualityChange,
            },
        });
    };

    onPlayerReady = async (event) => { // 當影片準備好時直接播放影片
        // let time = await fetch(apiurl + '/getapi?method=getCurrentTime&oid=' + queryString.parse(this.props.location.search).v, { credentials: 'include', withCredentials: true }).then(response => response.json());
        // time[0] ? this.toSec(time[0].Des) : this.toSec(0);
        this.toSec(0);
    };

    onPlayerStateChange = event => { // 當影片狀態(播放/暫停)變更時，focus到app
        this.player.getPlayerState() == 1 ? (this.fivesec = setInterval(this.memberHistory, 5000), this.memberHistory()) : clearInterval(this.fivesec);
        let { keylock } = this.state;
        keylock == false ? this.focusApp() : "";
    };

    onPlaybackQualityChange = event => { // 當畫質變更時，focus到app
        this.focusApp();
    };

    pauseplayVideo = () => { // 播放/暫停影片，因ctrl+alt與space有用到，故寫成function
        this.player.getPlayerState() == 1 ? this.player.pauseVideo() : this.player.playVideo();
    }

    toSec = (sec) => {
        this.player.seekTo(sec);
        this.player.playVideo();
    }

    memberHistory = async (vid = queryString.parse(this.props.location.search).v, currenttime = this.player.getCurrentTime()) => {
        // fetch(apiurl + '/getapi?method=memberHistory&vid=' + vid + '&currenttime=' + currenttime, { credentials: 'include', withCredentials: true }).then(response => response.json());
        let status = await api({
            cmd: "Member/videohistory?vid=" + vid,
            method: "post",
            data: { currenttime: this.player.getCurrentTime() }
        })
        status = status.body
        // console.log(status)
    }

    addNote = async () => {
        let vid = queryString.parse(this.props.location.search).v
        let nid = await api({
            cmd: "Note/" + vid,
            method: "post",
            data: { currenttime: this.player.getCurrentTime() }
        })
        nid = nid.body
        // let nid = await fetch(apiurl + '/getapi?method=addNote&vid=' + vid + '&currenttime=' + this.player.getCurrentTime(), { credentials: 'include', withCredentials: true }).then(response => response.json());
        // console.log(nid)
        document.getElementById("note").style.display == "none" ? this.ocNote() : "";
        this.setState({
            focusnid: nid.nid,
            update: true
        });
    }

    delNote = async (id) => {
        var yes = confirm('你確定要刪除嗎？');
        if (yes) {
            // await fetch(apiurl + '/getapi?method=delNote&nid=' + id, { credentials: 'include', withCredentials: true });
            let nid = await api({
                cmd: "Note/note?nid=" + id,
                method: "delete",
                credentials: 'include',
                withCredentials: true
            })
            nid = nid.body
            document.getElementById(`n${id}`).style.display = "none"
            this.setState({ update: true, focusnid: -1 })
        }
    }

    ocNote = () => {
        let ocnote = document.getElementById("note")
        ocnote.style.display == "none" ? ocnote.style.display = "flex" : ocnote.style.display = "none";
    }

    focusApp = () => {
        document.getElementById("player").focus();
    }

    onKeyDown = (e) => {
        // console.log('onkeydown ' + e.keyCode)
        let { keylock, keypress } = this.state
        e.ctrlKey ? keypress[17] = true : keypress[e.keyCode] = true; // 紀錄按下哪個鍵，並在keyup時清空
        if (!keylock) {
            switch (e.keyCode) {
                case 32: { // 空白鍵
                    e.preventDefault(); // 不讓按鍵讓滾輪滾動
                    this.pauseplayVideo();
                    break;
                }
                case 37: { //key <-
                    this.player.seekTo((this.player.getCurrentTime() - 5));
                    break;
                }
                case 39: { //key ->
                    this.player.seekTo((this.player.getCurrentTime() + 5));
                    break;
                }
                case 38: { //key ↑
                    e.preventDefault(); // 不讓按鍵讓滾輪滾動
                    this.player.isMuted() ? (this.player.unMute(), this.player.setVolume(5)) : this.player.setVolume((this.player.getVolume() + 5));
                    break;
                }
                case 40: { //key ↓
                    e.preventDefault(); // 不讓按鍵讓滾輪滾動
                    this.player.setVolume((this.player.getVolume() - 5));
                    break;
                }
            }
        }
        this.setState({ keypress: keypress });
    }

    onKeyUp = (e) => {
        if (this.state.keypress[17] && e.keyCode == 18) { // Ctrl + Alt
            this.pauseplayVideo();
        }
        if (this.state.keypress[17] && e.keyCode == 13) { // Ctrl + Enter
            this.addNote();
        }
        this.setState({ keypress: {} });
    }

    keyLock = (oc = !this.state.keylock) => {
        this.setState({
            keylock: oc
        })
    }

    render() {
        let { ytinfo, focusnid } = this.state;
        let { v } = queryString.parse(this.props.location.search); // VID
        return (
            <div id="watch">
                {/* <VideoComment ytinfo={ytinfo} oid={v}></VideoComment> */}
                <Note oid={v} keyLock={this.keyLock} toSec={this.toSec} delNote={this.delNote} focusnid={focusnid}></Note>
                <div className="noteimg pointer noteposition" onClick={(e) => this.ocNote()} title="關閉/開啟筆記">
                    <img src={noteimg} width="25px" height="25px"></img>
                </div>
                <div className="noteimg pointer previewposition" onClick={(e) => this.addNote()} title="新增筆記">
                    <img src={addimg} width="25px" height="25px"></img>
                </div>
            </div>
        )
    }
}
