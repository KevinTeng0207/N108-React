import React, { Component } from 'react'

export default class TimeConvert extends Component {
    constructor (props) {
        super(props);
        this.state = {
            newtime: ""
        }
    }

    componentDidMount() {
        let { time } = this.props;
        let newtime = this.timeFormat(time)
        // console.log(newtime)
        this.setState({ newtime: newtime })
    }

    timeFormat = (str) => {
        // 2021-05-05T14:58:50.917Z
        let datenow = new Date();
        // console.log(datenow)
        // console.log(new Date(str.replace('Z', '')))
        str = new Date(str.replace('Z', '')) // 結尾 Z 表示是 UTC +00:00 時間，所以先替換掉
        let timelag = datenow - str
        let milliseconds = timelag % 100
        let seconds = parseInt((timelag / 1000) % 60)
        let minutes = parseInt((timelag / 1000 / 60) % 60)
        let hours = parseInt((timelag / 1000 / 60 / 60) % 24)
        let days = parseInt((timelag / 1000 / 60 / 60 / 24))
        let y1 = datenow.getFullYear();
        let y2 = str.getFullYear();
        let m1 = datenow.getMonth() + 1;
        let m2 = str.getMonth() + 1;
        let d1 = datenow.getDate();
        let d2 = str.getDate();
        let newtime = ""

        if(d1 < d2){
            d1 += 30;
            m1 -= 1;
        }
        // 2021-05-20 2020-11-15
        if(m1 < m2){
            m1 += 12;
            y1 -= 1;
        }

        if(y1 - y2 == 0) {
            if(m2 == m1) {
                if(days == 0) {
                    if(hours == 0) {
                        if(minutes == 0) {
                            newtime = `${seconds} 秒前`
                        }
                        else
                            newtime = `${minutes} 分鐘前`
                    }
                    else
                        newtime = `${hours} 小時前`
                }
                else
                    newtime = `${days} 天前`
            }
            else 
                newtime= `${m1 - m2} 個月前`
        }
        else
            newtime = `${y1 - y2} 年前`
        return newtime
    }

    // 時間轉字串，轉成yyyy-MM-dd HH:mm:SS格式
    dateToStr = (datetime) => {
        var dateTime = new Date(datetime);
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;//js從0開始取
        var date = dateTime.getDate();
        var hour = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var second = dateTime.getSeconds();

        if(month < 10) {
            month = "0" + month;
        }
        if(date < 10) {
            date = "0" + date;
        }
        if(hour < 10) {
            hour = "0" + hour;
        }
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        if(second < 10) {
            second = "0" + second;
        }

        return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second;
    }


    render() {
        const { newtime } = this.state;



        return (
            <span>
                { newtime }
            </span>
        )
    }
}
