import React, { Component } from 'react'

export default class Closebtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconhover: false
        };
    }

    onhover = () => {
        this.setState({
            iconhover: true
        })
    }

    outhover = () => {
        this.setState({
            iconhover: false
        })
    }
    render() {
        const { iconhover } = this.state
        const { Clickbtn } = this.props
        return (
            <div className="close dis-center" onMouseOver={this.onhover} onMouseOut={this.outhover} onClick={Clickbtn}>
                {!iconhover && <i className="material-icons">&#xe5cd;</i>}
                {iconhover && <i className="fa fa-close mouse" style={{ "color": "black" }}></i>}
            </div>
        )
    }
}
