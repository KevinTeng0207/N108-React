import React, { Component } from 'react'
import Markdown from '../tool/ReactMarkdown.jsx'

export default class Preview extends Component {
    render() {
        let { text } = this.props
        return (
            <div id="preview">
                <div className="previewtitle">預覽窗格</div>
                <div id="mdpreview" className="markdown-body github">
                    <Markdown content={text} />
                </div>
            </div>
        )
    }
}
