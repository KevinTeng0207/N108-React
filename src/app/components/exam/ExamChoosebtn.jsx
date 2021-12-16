import React, { Component } from 'react'

export default class ChooseBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [false, false, false, false, false]
        };
    }

    write = (index) => {
        const { id } = this.props
        var temp = [false, false, false, false, false]
        for (var i = 0; i < temp.length; i++) {
            if (i == index) {
                this.props.answer.current[id + String.fromCharCode(65 + i)].checked = true
                temp[i] = true
            }
            else {
                this.props.answer.current[id + String.fromCharCode(65 + i)].checked = false
            }

        }
        this.setState({
            data: temp.slice()
        });
    }

    render() {
        const { id } = this.props
        return (
            <div className="dis-center2">
                <div className="dis-space-between btnlist">
                    <button type="button" className={this.state.data[0] ? "btn-selected" : "btn"} onClick={(e) => this.write(0)}>A</button>
                    <button type="button" className={this.state.data[1] ? "btn-selected" : "btn"} onClick={(e) => this.write(1)}>B</button>
                    <button type="button" className={this.state.data[2] ? "btn-selected" : "btn"} onClick={(e) => this.write(2)}>C</button>
                    <button type="button" className={this.state.data[3] ? "btn-selected" : "btn"} onClick={(e) => this.write(3)}>D</button>
                    <button type="button" className={this.state.data[4] ? "btn-selected" : "btn"} onClick={(e) => this.write(4)}>E</button>
                </div>
                <div className="dis-no">
                    <input type="checkbox" className={this.state.data[0] ? "btn-selected" : "btn"} name={`${id}A`}></input>
                    <input type="checkbox" className={this.state.data[1] ? "btn-selected" : "btn"} name={`${id}B`}></input>
                    <input type="checkbox" className={this.state.data[2] ? "btn-selected" : "btn"} name={`${id}C`}></input>
                    <input type="checkbox" className={this.state.data[3] ? "btn-selected" : "btn"} name={`${id}D`}></input>
                    <input type="checkbox" className={this.state.data[4] ? "btn-selected" : "btn"} name={`${id}E`}></input>
                </div>
            </div>
        )
    }
}
