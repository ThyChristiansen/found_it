import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode';


class BoxDetail extends Component {
    componentDidMount() {
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_DETAIL',
            payload: {
                id: match.params.id
            }
        });
    }

    render() {
        return (
            <div>

                {this.props.reduxState.detail.map((box) => {
                    return (
                        <div key={box.id}>
                            <p>Box name:{box.box_name}</p>
                            <DownloadQRCode />

                        </div>
                    )
                })}

            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxDetail);