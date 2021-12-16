import React, { Component } from 'react'

export default class HomeTool extends Component {
    render() {
        const { name, content, img } = this.props
        return (
            <div>
                <div className="feature">
                    <div className="feature-img-containter">
                        <img src={img} className="feature-img" />
                    </div>
                    <div className="feature-title">
                        {name}
                    </div>
                    <div className="feature-text">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
