import React, { Component } from 'react'
import VideoWrapper from './VideoWrapper'

export default class VideoComment extends Component {
    render() {
        let { ytinfo, oid } = this.props;
        return (
            <div id="videocomment" className="w3-card">
                <VideoWrapper ytinfo={ytinfo} oid={oid}></VideoWrapper>
                <div className="edu-vcblock commentct">
                    <span className="mouse videotool" /*onClick={e => this.onCommentMode(true)}*/>留言開發中</span>
                    &ensp;&ensp;
                    <span className="mouse videotool" /*onClick={e => this.onCommentMode(false)}*/>分享筆記開發中</span>
                </div>
            </div>
        )
    }
}
