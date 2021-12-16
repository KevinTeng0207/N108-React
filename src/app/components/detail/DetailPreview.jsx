import React, { Component } from 'react'
import Markdown from '../tool/ReactMarkdown.jsx'

export default class Preview extends Component {
    render() {
        const { content } = this.props
        return (
            <div id="preview">
                <div className="previewtitle">預覽窗格</div>
                <div id="mdpreview" className="markdown-body github Dmarkdown-body previewDmarkdown-body">
                    <Markdown content = {content}></Markdown>
                </div>
            </div>
        )
    }
}
