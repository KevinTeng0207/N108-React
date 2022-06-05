import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import api from '../../lib/api'
import ReactLoading from "react-loading";

export default class MemberLearnHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showlist: [],
            isLoaded: false,
            now: {
                today: new Date(),
                day: String(new Date().getDate()).padStart(2, '0'),
                month: String(new Date().getMonth() + 1).padStart(2, '0'),
                year: new Date().getFullYear()
            }
        }
    }

    CalendarHeatmapdata(data) {
        // CalendarHeatmap 符合的資料格式
        let finaldate = []
        const { year, today } = this.state.now
        let m = today.getMonth() + 1
        let flag = 0
        for (var k = 1; k <= 13; k++) {
            if (m > 12) {
                m = 1
                flag = 1
            }
            let y = flag ? year : year - 1
            let days = new Date(y, m, 0).getDate()
            if (y == year && m == today.getMonth() + 1)
                days = today.getDate()
            for (var j = 1; j <= days; j++) {
                let t_count = 0
                let t_date = y + "-" + m.toString(10).padStart(2, '0') + "-" + j.toString(10).padStart(2, '0')
                finaldate.push({ date: t_date, count: t_count })
            }
            m += 1
        }
        for (var k = 0; k < finaldate.length; k++) {
            for (var x = 0; x < data.length; x++) {
                if (finaldate[k].date == data[x].date)
                    finaldate[k].count += 1;
            }
        }
        return finaldate
    }

    histroy = async () => {
        const { fulldate } = this.state
        let data = await api({
            cmd: "Member/Learnhistory",
            method: "get"
        })
        data = data.body
        let historydata = []
        for (var i = 0; i < data.length; i++) {
            historydata.push({
                cname: data[i].CName,
                date: data[i].Since.split('T')[0],
                oid: data[i].OID
            })
        }
        console.log(historydata)
        this.setState({
            data: historydata
        });
    }

    async componentDidMount() {
        // console.log('lwmember DidMount')
        await this.histroy()
        this.setState({
            isLoaded: true,
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // console.log('lwmember DidUpdate')
        if (prevState == this.state) {
            await this.histroy()
            this.setState({
                isLoaded: true,
            });
        }
    }

    getlist = (date) => {
        const { data } = this.state
        // console.log(date)
        let temp = []
        temp.push(
            <div className="dis-center">{date}</div>
        )
        for (var i = 0; i < data.length; i++) {
            if (data[i].date == date) {
                temp.push(
                    <NavLink className="dis-center histortyttitle" key={data[i].oid} to={`/watch?v=${data[i].oid}`} >
                        <i className='fas fa-bookmark'></i>
                        &emsp; {data[i].cname}
                    </NavLink >
                )
            }
        }
        this.setState({
            showlist: temp,
        });
    }

    render() {
        const { userimg, login, info } = this.props
        const { now, data, isLoaded, showlist } = this.state
        const t_date = this.CalendarHeatmapdata(data)
        if (!isLoaded) {
            return (
                <div className="usercontent">
                    <div className="relative">
                        <div className="Box-userinfo" style={{ "marginTop": "24px" }}>
                            <div className="dis-center">過去一年的學習紀錄</div>
                            <div className="dis-center" style={{ "marginTop": "8px" }}>
                                <ReactLoading
                                    type={"spinningBubbles"}
                                    color="#1abc81"
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <h3 className="dis-center" style={{ "marginTop": "8px", "color": "#1abc81" }}>Loading ...</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="usercontent">
                    <div className="relative">
                        <div className="mt_24 Box-userinfo">
                            <div className="dis-center">過去一年的學習紀錄</div>
                            <CalendarHeatmap
                                startDate={now.year - 1 + '-' + now.month + '-' + now.day}
                                endDate={now.year + '-' + now.month + '-' + now.day}
                                values={t_date}
                                classForValue={value => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-github-${value.count}`;
                                }}
                                tooltipDataAttrs={value => {
                                    if (value.date)
                                        return {
                                            'data-tip': `${value.date} 有觀看 ${value.count} 部影片`
                                        };
                                }}
                                showWeekdayLabels={true}
                                onClick={value => this.getlist(value.date)}
                            />
                            <ReactTooltip />
                            <div className="dis-center">觀看紀錄</div>
                            <div className="myCalendarHeatmap">
                                {showlist.length ? showlist : <div className="dis-center">請選擇格子以檢視紀錄...</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
