import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxList from '../BoxList/BoxList';


class Storge extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {/* <h1>Storge</h1> */}
                <BoxList />
                {/* <p>{JSON.stringify(this.props.reduxState.rooms[0])}</p> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(Storge);