import React, { Component } from 'react'
import Upload from './UploadImg.jsx'
import api from '../../lib/api'
import pathtoID from '../../lib/pathtoID'
import { SSO } from '../../json/SSO.json'
import MImg from './Member_IMG_Name'
import Mtopbar from './MemberTopBar'
import Mcontent from './MemberContent'
import Footer from '../home/Footer'
import queryString from 'query-string'


export default class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topbarshowIMG: false,
            uploadwrapper: false
        }
    }

    uploadIMG = async (blob) => {
        // console.log(blob)
        let data = await api({
            cmd: "File/uploadIMG",
            method: "post",
            fileList: [blob]
        })
        console.log(data.body)
        if (data.body.status == 1) {
            let OID = pathtoID(data.body.path)
            // console.log(OID)
            await api({
                cmd: "Account/graphql",
                method: "post",
                data: { oid: OID }
            })
            // console.log(faceimg.body)
            const { getuserimg } = this.props
            await getuserimg();
        }
        else {
            alert("上傳失敗！")
        }
    }

    clickwrapper = () => {
        this.setState({
            uploadwrapper: !this.state.uploadwrapper
        })
    }

    showtopbarIMG = () => {
        this.setState({
            topbarshowIMG: !this.state.topbarshowIMG
        })
    }

    closetopbarIMG = () => {
        this.setState({
            topbarshowIMG: false
        })
    }

    render() {
        const { login, info, getuserimg, userimg } = this.props
        const { uploadwrapper, topbarshowIMG } = this.state
        const mode = queryString.parse(this.props.location.search).type
        return (
            <div>
                <div className="view-profile">
                    <div className="dis-center2 info_cover">
                        {uploadwrapper && <div className="help-map" /*<!--灰幕-->*/ ></div>}
                        {uploadwrapper && <Upload clickwrapper={this.clickwrapper} uploadIMG={this.uploadIMG}></Upload>}
                    </div>
                    <Mtopbar mode={mode} topbarshowIMG={topbarshowIMG} userimg={userimg} info={info}></Mtopbar>
                    <div className="profile_content">
                        <div className="dis-flex-row">
                            <MImg topbarshowIMG={topbarshowIMG} showtopbarIMG={this.showtopbarIMG} closetopbarIMG={this.closetopbarIMG} login={login} info={info} userimg={userimg} clickwrapper={this.clickwrapper}></MImg>
                            <Mcontent mode={mode} info={info}></Mcontent>
                        </div>
                    </div>
                </div>
                <div className="mt_64">
                    <Footer CTitle={"© Web Knowledge Extraction"}
                        CName={'WKE focuses on developing Web information systems (WIS) for various domain requirements.\nBy integrating systems and modules about web/text mining methods developed in WKE.'} />
                </div>
            </div>

        )
    }
}
