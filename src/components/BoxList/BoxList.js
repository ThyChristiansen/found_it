import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '../Box/Box';
import './BoxList.css'


class BoxList extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_BOX' })
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_BOX',
            payload: {
                id: match.params.id
            }
        });

    }

    handleOnClickAddNewBox = () => {
        const { dispatch, match } = this.props;
        console.log('Clicked')
        dispatch({
            type: "ADD_BOX",
            id: match.params.id
        })
    }

    handleOnClickAddFirstNewBox = () => {
        const { dispatch, match } = this.props;

        console.log('Clicked')
        dispatch({
            type: "ADD_FIRST_BOX",
            id: match.params.id

        })
    }

    render() {

        //Create the conditional for add new box, if the box list is empty,
        // sending the ADD_FIRST_BOX action to server to create the box have id = 1 
        // box_name = 1, qr_code = 1.
        // if box list had a couple boxes, sending the ADD_BOX action to server to keep on 
        //increment number of id, box's name, qr_code, from the last row
        let addNewBox;
        if (this.props.reduxState.boxes.length === 0) {
            addNewBox= <button onClick={this.handleOnClickAddFirstNewBox}
                className="add_new_box_btn">Add new box</button>
        }else {
            addNewBox =  <button onClick={this.handleOnClickAddNewBox}
            className="add_new_box_btn">Add new box</button>
        }

        return (
            <div>
                <h1 className="box_list_header">BoxList</h1>
                {addNewBox}
                {this.props.reduxState.boxes.map((box) => {
                    return (
                        <div key={box.id} className="box_item">
                            <button> <Box
                                box={box}
                            /></button>
                        </div>
                    )
                })}
                {/* <p>{JSON.stringify(this.props.reduxState.boxes.id)}</p> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxList);