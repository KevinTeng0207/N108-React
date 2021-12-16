import React, { Component } from 'react'
import img from '../../image/danger.png'
import api from '../../lib/api.js'
export default class issue extends Component {

    issue = async () => {
        var yes = confirm('你確定要提交issue嗎？\n (此題目將不再提供)')
        if (yes) {
            const { pid, get_api_img} = this.props
            let data = await api({
                cmd: "Exam/issue",
                method: "put",
                data: { pid: pid }
            })
            console.log(data.body)
            if (data.body.message == 1)
                await get_api_img()
        }

    }

    render() {
        return (
            <img className="issue mouse" src={img} alt="" style={{ "width": "32px" }} onClick={this.issue} />
        )
    }
}
