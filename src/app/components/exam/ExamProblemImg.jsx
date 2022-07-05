import React, { Component } from 'react'
import { apiurl } from '../../../../config.json'
export default class Problem_img extends Component {
    render() {
        const { str } = this.props
        return (
            <div className="dis-center2 img-containter">
                <img
                    className="problem"
                    src={`${apiurl}/img/${str}`}
                    alt="題目錯誤"
                />
            </div>
        )
    }
}
