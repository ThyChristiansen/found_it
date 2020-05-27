import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';




class DownloadQRCode extends Component {

    downloadQR = () => {
        const canvas = document.getElementById(this.props.reduxState.detail.qr_code);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    render() {
        return (
            <div>
                <QRCode
                    id={this.props.reduxState.detail.qr_code}
                    // value="https://letsfindit.herokuapp.com/#/home"
                    value = {`https://letsfindit.herokuapp.com/#/box-detail/${this.props.reduxState.qrCode}`}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                /><br />
                <a onClick={this.downloadQR}> Download QR </a>
                {/* <h1>{this.props.reduxState.qrCode}</h1> */}
                <h2>https://letsfindit.herokuapp.com/#/box-detail/${this.props.reduxState.qrCode}</h2>
            </div>

        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(DownloadQRCode);