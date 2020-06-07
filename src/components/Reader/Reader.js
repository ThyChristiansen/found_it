import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import Header from '../Header/Header';
import './Reader.css';

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
        <Header />
        <div className = 'reader'>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            // style={{ width: '400px' }}
            className='scanner'
          />
          <a href={this.state.result} target="_blank" rel="noopener noreferrer">{this.state.result}</a>
        </div>
      </div>
    )
  }
}

export default Reader;