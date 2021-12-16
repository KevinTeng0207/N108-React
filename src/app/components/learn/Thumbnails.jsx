import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class Thumbnails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Hover: false
        };
    }

    render() {
        const { Hover } = this.state
        const { oid, CDes, CName, nClick } = this.props
        return (
            <li className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                <NavLink to={`/watch?v=${oid}`} className="pointer">
                    <div>
                        <img src={`https://i.ytimg.com/vi/${CDes}/mqdefault.jpg`} alt="youtube影片錯誤" className="img-responsive" width="100%" />
                    </div>
                    <h2 className="twoline yttitle">{CName}</h2>
                    <h2 className="oneline ytviewct">觀看紀錄：{nClick}</h2>
                </NavLink>
            </li>
        )

    }
}
