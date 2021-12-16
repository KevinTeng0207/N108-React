import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop';
import Cbtn from '../tool/Closebtn.jsx'
import Resizer from "react-image-file-resizer";

export default class test2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 9 / 9,
            },
            blob: ""
        }
    }


    onSelectFile = (e) => {
        var filesToUploads = document.getElementById('imginput').files;
        var file = filesToUploads[0];
        console.log(file)
        if (file) {
            Resizer.imageFileResizer(
                file,
                300, // max W
                450, // max H
                "JPEG",
                100,
                0,
                (url) => {
                    // console.log(url);
                    this.setState({ src: url });
                },
                "base64",
                300, // min W
                300  // min H
            );
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                // console.log(blob)
                this.setState({ blob });
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    myuploadIMG = async () => {
        const { blob } = this.state;
        const { clickwrapper, uploadIMG } = this.props;
        await uploadIMG(blob);
        clickwrapper();
    }

    render() {
        const { clickwrapper, uploadIMG } = this.props;
        const { crop, croppedImageUrl, src, blob } = this.state;
        return (
            <div className="reviewrapper">
                <Cbtn Clickbtn={clickwrapper}></Cbtn>
                <div className="dis-center inputimg">
                    <input id="imginput" type="file" accept="image/*" onChange={this.onSelectFile} />
                </div>
                <div className="dis-center uploadcontainter">
                    {src &&
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    }
                </div>
                <div className="reviewimg">
                    <div>
                        {croppedImageUrl && <img className="faceimg dis-center2" alt="Crop" src={croppedImageUrl} />}
                    </div>
                </div>
                <div className="uploadbtncontainter dis-center">
                    <button className="uploadbtn" type="button" onClick={this.myuploadIMG}>上傳</button>
                    <button className="calcelbtn" type="button" onClick={clickwrapper}>取消</button>
                </div>
            </div>
        );
    }
}
