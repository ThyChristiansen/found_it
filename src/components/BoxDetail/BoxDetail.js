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
    backClick = ()=>{
        console.log('back clicked');
        this.props.history.push('/boxes')
    }

    render() {
        return (
            <div>
                <button onClick = {this.backClick}>Back to list</button>
                {this.props.reduxState.detail.map((box) => {
                    return (
                        <div key={box.id}>
                            <p>Box name: A{box.box_name}</p>
                            <DownloadQRCode 
                            box={box}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxDetail);