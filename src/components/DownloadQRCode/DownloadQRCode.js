import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#cecece'),
        backgroundColor: '#cecece',
        '&:hover': {
            backgroundColor: '#cecece',
        },
        boxShadow: '9px 9px 16px #0000004c, -9px -9px 16px rgb(250, 250, 250)'
    },
}))(Button);

const useStyles = (theme) => ({
    margin: {
        margin: theme.spacing(1),
        marginTop: '10px',

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
        downloadLink.download = `QR_code_roomId${this.props.box.room_id}_boxId${this.props.box.id}.png`;
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
                    value={`https://f0undit.herokuapp.com/#/box-detail/${this.props.box.room_id}/${this.props.box.id}`}
                    size={230}
                    level={"H"}
                    includeMargin={true}
                /><br />
                <ColorButton onClick={this.downloadQR} size="small" className={classes.margin} variant="contained"> Download</ColorButton>
                {/* <h1>{JSON.stringify(this.props.box.room_id)}</h1> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(DownloadQRCode));
