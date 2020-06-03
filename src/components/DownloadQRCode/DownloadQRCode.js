import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
});

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
        const { classes } = this.props;

        return (
            <div>
                <QRCode
                    id={this.props.box.qr_code}
                    value={`https://f0undit.herokuapp.com/#/box-detail/${this.props.box.room_id}/${this.props.box.qr_code}`}
                    size={150}
                    level={"H"}
                    includeMargin={true}
                /><br />
                {/* <button onClick={this.downloadQR} className="download_qr_code_btn"> Download QR </button> */}
                <Button onClick={this.downloadQR} size="small" className="download_qr_code_btn" variant="contained"> Download</Button>
                {/* <h1>{JSON.stringify(this.props.box.room_id)}</h1> */}

            </div>

        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(DownloadQRCode));
