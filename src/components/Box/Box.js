import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Box extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_BOX' })


    }
    sendDetail = () => {
        const { dispatch, match } = this.props;
        // this.props.dispatch({
        //     type: 'FETCH_DETAIL', // action type FETCH_DETAIL to send title and description
        //     payload: {
        //         id: this.props.box.id,
        //     }
        // })
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
                {/* <p>{JSON.stringify(this.props.boxdata.box_name)}</p> */}
                <Link to={`/box-detail/${this.props.box.id}`}>
                    <img
                        src="images/box_icon.png"
                        alt={this.props.box.box_name}
                        onClick={this.sendDetail}
                        className="box_icon"
                        width="60"
                        height="60"

                    />

                </Link>

                <p>A{this.props.box.box_name}</p>
            </div>
        )
    }
}
export default connect()(Box);