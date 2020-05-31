import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from '../Room/Room';


class HomePage extends Component {
    // componentDidMount() {
    //     // const { dispatch, match } = this.props;
    //     dispatch({
    //         type: "FETCH_ROOM",
    //         payload: {
    //             userId: match.params.id,
    //         }
    //     })
    //     console.log('user id:',match.params.id)
    // }

    render() {
        return (
            <div>
                {/* <h1>nv {JSON.stringify(this.props)}</h1> */}
                {this.props.reduxState.rooms.map((room) => {
                    return (
                        <div key={room.id} className="room">
                            <Room
                            roomData={room}
                            />
                        </div>
                    )
                })}

               {/* <h3>user id: {JSON.stringify(this.props)}</h3>  */}
            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(HomePage);