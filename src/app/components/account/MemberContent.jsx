import React, { Component } from 'react'
import MInfo from './MemberInfo'
import MLHistory from './MemberLearnHistory'
import MWHistory from './MemberWatchHistory'
import MNHistory from './MemberNotelistHistory'
export default class MemberContent extends Component {
    render() {
        const { info, mode } = this.props
        switch (mode) {
            case "profile":
                return (
                    <div className="usercontent">
                        <MInfo info={info}></MInfo>
                        <MLHistory></MLHistory>
                    </div>
                )
            case "history":
                return (
                    <div className="usercontent">
                        <MWHistory></MWHistory>
                    </div>
                )
            case "notehistory":
                return (
                    <div className="usercontent">
                        <MNHistory></MNHistory>
                    </div>
                )
        }
    }
}
