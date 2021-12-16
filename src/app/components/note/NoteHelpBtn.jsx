import React, { Component } from 'react'

export default class HelpBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconHover: false
        }
    }

    helpHoverover = () => {
        this.setState({
            iconHover: true
        })
    }

    helpHoverout = () => {
        this.setState({
            iconHover: false
        })
    }

    render() {
        const { iconHover } = this.state
        const { Clickbtn } = this.props
        return (
            <div>
                {!iconHover &&
                    <i className="material-icons help mouse"
                        onMouseOver={this.helpHoverover}
                        onMouseOut={this.helpHoverout}
                        onClick={Clickbtn}
                    >
                        &#xe8fd;
                    </i>}
                {iconHover &&
                    <i className="material-icons help mouse"
                        onMouseOver={this.helpHoverover}
                        onMouseOut={this.helpHoverout}
                        onClick={Clickbtn}
                    >
                        &#xe887;
                    </i>}
            </div>
        )
    }
}
