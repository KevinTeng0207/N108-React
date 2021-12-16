import React, { Component } from 'react'

export default class LearnSidebarsubject extends Component {
    subjectBtn(data, choosedomainIndex, Set_sidebarValue) {
        let content = []
        for (let i = 0; i < data.length; i++) {
            content.push(
                <div
                    className={`${choosedomainIndex != i ? "" : "edu-selectorange "}subject mouse`}
                    key={data[i].PID}
                    onClick={(e) => Set_sidebarValue(data[i].PID, i)}
                >
                    {data[i].Sub}
                </div>
            )
        }
        return content
    }

    render() {
        const { data, choosedomainIndex, Set_sidebarValue } = this.props
        return (
            <ul className="domain dis-center2">
                {this.subjectBtn(data, choosedomainIndex, Set_sidebarValue)}
            </ul>
        )
    }
}
