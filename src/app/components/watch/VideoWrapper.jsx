import React, { Component } from 'react'
import Player from './VideoPlayer'
import VideoDes from './VideoDes'

export default class VideoWrapper extends Component {
    render() {
        let { ytinfo, oid } = this.props
        return (
            <div id="videowrapper" className="edu-vcblock">
                <div className="video-wrapper">
                    <Player></Player>
                </div>
                <VideoDes ytinfo={ytinfo} oid={oid}></VideoDes>
            </div>
        )
    }
}
