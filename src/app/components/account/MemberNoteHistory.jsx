import React, { Component } from 'react'
import api from '../../lib/api'
import Timecal from '../tool/Time'
import Markdown from '../tool/ReactMarkdown.jsx'
import pencil from '../../image/pencil.png'
export default class MemberNoteHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
            open: false,
            hover: false
        }
        this.scrollpos = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.open != this.state.open)
            return true
        else {
            if (this.state.open == false)
                return true
            else
                return false
        }
    }

    note = async () => {
        const { OID } = this.props
        // console.log(OID)
        let data = await api({
            cmd: "Member/Notehistory?vid=" + OID,
            method: "get"
        })
        let data2 = await api({
            cmd: "Watch/v_subject/" + OID,
            method: "get"
        })
        data = data.body
        data2 = data2.body
        // console.log(data)
        // console.log(data2)
        this.setState({
            note: data,
            subject: data2[0].NamePath.split('/')[5]
        });
    }

    componentDidMount = async () => {
        // console.log('membernotelist DidMount')
        await this.note()
        this.setState({
            isLoaded: true
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('membernotelist DidUpdate')
        if (prevState == this.state) {
            await this.note()
            this.setState({
                isLoaded: true
            });
        }
        if (prevState.open != this.state.open) {
            let pos = this.scrollpos.current
            // console.log(pos.offsetHeight, pos.offsetTop)
            window.scrollTo(0, pos.offsetTop + 25)
        }
        // else
        //     window.scrollTo(0, 0)
    }

    openclick = () => {
        this.setState({
            open: !this.state.open
        })
    }


    setcolor = () => {
        const { subject } = this.state
        switch (subject) {
            case '生物':
                return (<span className="subject-color-1"></span>);
            case '物理':
                return (<span className="subject-color-2"></span>);
            case '化學':
                return (<span className="subject-color-3"></span>);
            case '地科':
                return (<span className="subject-color-4"></span>);
        }
    }

    render() {
        const { OID, notecount, CDes, CName } = this.props
        const { open, note, hover, subject } = this.state
        return (
            <div>
                <li className="notelist dis-flex-row mouse" ref={this.scrollpos} onClick={this.openclick}>
                    <div className="notename">
                        <div>
                            <div className="noteproject">
                                {CName}
                            </div>
                        </div>
                        <div></div>
                        <div style={{ "marginTop": "8px" }}>
                            {this.setcolor()}
                            <span className="subjectname">{subject}</span>
                            {/* <i className="fas fa-pencil-alt" style={{ "color": "#00be00" }}></i> */}
                            <img src={pencil} alt="" width="16px" />
                            <span className="subjectname">
                                &ensp;筆記數量：{notecount}
                            </span>
                        </div>
                    </div>
                    {!open && <div className="text-r dropdowninfo dropdownicon mouse">
                        More ...
                    </div>}
                </li>
                {
                    open &&
                    <li className="noteopenlist-fixed animate-top">
                        {note.map(n =>
                            <div key={n.NID} className="relative">
                                <div className="dis-flex-row">
                                    <span className="noteinfosec">
                                        {parseInt(n.CurrentTime / 60)}:{(((n.CurrentTime - parseInt(n.CurrentTime / 60) * 60) / 100).toFixed(2)).split('.')[1]}
                                    </span>
                                    <div className="edu-yttitle">
                                        {n.Title}
                                    </div>
                                </div>
                                <div className="github markdown-body notem">
                                    <Markdown content={n.Content}></Markdown>
                                </div>
                                <div className="text-r timeinfo"><Timecal time={n.LastModifiedDT}></Timecal> 修改過</div>
                                <div className="text-l staricon"><i className="far fa-star mouse"></i></div>
                            </div>
                        )}

                    </li>
                }
                {
                    open &&
                    <div className="text-r dropdowninfo" onClick={this.openclick}>
                        <div className="dropdowncontainter">
                            <span className="dropdown-caret2-ro"></span>&emsp;收起
                        </div>
                    </div>
                }
            </div >

        )
    }
}
