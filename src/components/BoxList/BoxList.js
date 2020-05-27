import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '../Box/Box';


class BoxList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_BOX' })

    }

    handleOnClick = () => {
        console.log('Clicked')
        this.props.history.push('/addbox');
    }



    render() {
        return (
            <div>
                <h1>BoxList</h1>
                <button onClick={this.handleOnClick}
                className = "add_new_box">Add new box</button>
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