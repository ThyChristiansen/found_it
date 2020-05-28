import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '../Box/Box';
import './BoxList.css'


class BoxList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_BOX' })

    }

    handleOnClickAddNewBox = () => {
        console.log('Clicked')
        this.props.dispatch({
            type: "ADD_BOX",
        })
    }

    handleOnClickAddFirstNewBox = () => {
        console.log('Clicked')
        this.props.dispatch({
            type: "ADD_FIRST_BOX",
        })
    }


    render() {

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