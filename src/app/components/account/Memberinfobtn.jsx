import React, { Component } from 'react'
import api from '../../lib/api'

export default class MemberinfoBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: false,
            text: ""
        }
        this.input = React.createRef();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        const { type, data, userinfoapi } = this.props
        // console.log(type + ' DidUpdate')
        if (prevState.input != this.state.input && this.state.input == true) {
            document.getElementById(`set${type}`).focus();
            this.input.current.value = (data == null ? null : data)
            await userinfoapi()
        }
    }

    opensetting = () => {
        this.setState({
            input: true
        })
    }

    enter = async (e) => {
        if (e.keyCode == 13) {
            // console.log('hihi')
            await this.closesetting();
        }
    }

    closesetting = async () => {
        this.setState({
            input: false
        })
        const { type, userinfoapi } = this.props
        let content = (this.input.current.value == null ? null : this.input.current.value)
        await api({
            cmd: "Account/" + type,
            method: "put",
            data: { string: content }
        })
        // console.log(data)
        await userinfoapi()
    }

    setinfo = (e) => {
        // console.log(e.target.value)
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const { type, data } = this.props
        const { input } = this.state
        return (
            <div className="inline">
                {
                    !input &&
                    <div className="inline">
                        {data == null ? "尚未設定" : data} {type != "email" && <i className="fa mouse" onClick={this.opensetting}>&#xf013;</i>}
                    </div>
                }
                {
                    input &&
                    <div className="inline">
                        {type == "birthday" &&
                            <input type="date" id={`set${type}`} className="setinfo" ref={this.input}
                                onChange={this.setinfo} onBlur={this.closesetting} onKeyDown={this.enter} ></input>}
                        {type != "birthday" &&
                            <input type="text" id={`set${type}`} className="setinfo" ref={this.input}
                                onChange={this.setinfo} onBlur={this.closesetting} onKeyDown={this.enter}></input>}
                        &ensp;
                        <svg className="entericon mouse" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={this.closesetting}>
                            <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z" />
                        </svg>
                    </div>
                }
            </div>

        );
    }
}
