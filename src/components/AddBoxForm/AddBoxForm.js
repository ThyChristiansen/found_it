import React, { Component } from 'react';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode'

class AddNewBoxForm extends Component {
    state = {
        item:''
    }

    handleInputChangeFor = (event) => {
        console.log('changing', event.target.value)
        this.setState({
            item: event.target.value,
        });
      }

    render() {
        return (
            <div>
                <div>
                    
                    <p>Your box's QR code here</p>
                    <DownloadQRCode />
                    <p>Add item to your list:</p>
                    <input
                        type="text"
                        placeholder='Add item...'
                        // value={this.state.username}
                        onChange={this.handleInputChangeFor}
                    />
                </div>
            </div>
        )
    }
}
export default AddNewBoxForm;