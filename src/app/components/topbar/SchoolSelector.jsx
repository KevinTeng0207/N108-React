import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

export default class SchoolSelector extends Component {
    render() {
        const { route, schoolname } = this.props
        return (
            <div className="dis-center">
                <NavLink activeClassName={`${schoolname == "Elementary" && "school-selected"}`} className="school" to={`/${route}?school=Elementary`}>國民小學</NavLink>
                <NavLink activeClassName={`${schoolname == "Secondary" && "school-selected"}`} className="school" to={`/${route}?school=Secondary`}>國民中學</NavLink>
                <NavLink activeClassName={`${schoolname == "High_senior" && "school-selected"}`} className="school" to={`/${route}?school=High_senior`}>普通高中(必修)</NavLink>
                <NavLink activeClassName={`${schoolname == "High_senior_elective" && "school-selected"}`} className="school" to={`/${route}?school=High_senior_elective`}>普通高中(選修)</NavLink>
                <NavLink activeClassName={`${schoolname == "High_senior_skill" && "school-selected"}`} className="school" to={`/${route}?school=High_senior_skill`}>技術高中</NavLink>
                <NavLink activeClassName={`${schoolname == "High_senior_mix" && "school-selected"}`} className="school" to={`/${route}?school=High_senior_mix`}>綜合高中</NavLink>
            </div>
        )
    }
}
