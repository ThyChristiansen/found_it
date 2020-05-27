import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode'


import QrReader from 'react-qr-reader'
 
class Reader extends Component {
  state = {
    result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <Link>{this.state.result}</Link>

        <DownloadQRCode />
      </div>
    )
  }
}

export default Reader;