import React, { Component } from 'react'

export default class Problem_img extends Component {
    render() {
        const { str } = this.props
        return (
            <div className="dis-center2 img-containter">
                <img
                    className="problem"
                    src={`https://n108.wke.csie.ncnu.edu.tw:8888/img/${str}`}
                    alt="題目錯誤"
                />
            </div>
        )
    }
}
