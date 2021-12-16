import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'

export default class React_Markdown extends Component {
    render() {
        const { content } = this.props
        return (
            <ReactMarkdown
                plugins={[[gfm, { singleTilde: false }], [math]]}
                renderers={{
                    inlineMath: ({ value }) => <Tex math={value} />,
                    math: ({ value }) => <Tex block math={value} />
                }}
                source={content}>
            </ReactMarkdown>
        )
    }
}
