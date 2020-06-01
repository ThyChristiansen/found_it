import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

class DownloadQRCode extends Component {

    downloadQR = () => {
        const canvas = document.getElementById(this.props.box.qr_code);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_code_roomId${this.props.box.room_id}_boxId${this.props.box.qr_code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    render() {
        return (
            <div>
                <QRCode
                    id={this.props.box.qr_code}
                    value={`https://localhost:3000/#/box-detail/${this.props.box.room_id}/${this.props.box.qr_code}`}
                    size={150}
                    level={"H"}
                    includeMargin={true}
                /><br />
                <button onClick={this.downloadQR}> Download QR </button>
                {/* <h1>{JSON.stringify(this.props.box.room_id)}</h1> */}

            </div>

        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(DownloadQRCode);