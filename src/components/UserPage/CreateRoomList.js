import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class CreateRoomList extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM",
            payload: {
                userId: this.props.userId
            }

        })
    }

    render() {
        return (
            <div>
                <Link to={'/homepage'}>
                    <button onClick={() => this.props.dispatch({
                        type: "CREATE_ROOM_LIST",
                        payload: {
                            userId: this.props.userId
                        }
                    })}
                    >Go to your room list</button>
                </Link>
                {/* <h1>user id: {JSON.stringify(this.props)}</h1>  */}

            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(CreateRoomList);