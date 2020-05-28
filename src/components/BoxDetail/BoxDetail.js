import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode';


class BoxDetail extends Component {

    // create state to store the item data
    state = {
        item: ''
    }


    componentDidMount() {
        //save data after refresh page by id
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_DETAIL',
            payload: {
                id: match.params.id
            }
        });
    }
    //handle come back list box page
    backClick = () => {
        console.log('back clicked');
        this.props.history.push('/boxes')
    }
    //handle changing for add new item input field
    handleInputChangeFor = (event) => {
        console.log('changing', event.target.value)
        this.setState({
            item: event.target.value,
        });
    }
    //handle add new item button
    handleAddNewItem = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                item: this.state.item,
                id: match.params.id
            }
        })
    }


    render() {
        return (
            <div>

                <button onClick={this.backClick}>Back to list</button>
                {/* mapping through the box list array that get from database to display in DOM */}
                {this.props.reduxState.detail.map((box) => {
                    return (
                        <div key={box.id}>
                            <p>Box name: A{box.box_name}</p>
                            <DownloadQRCode
                                box={box} />
                        </div>
                    )
                })}
                {/* add new item field */}
                <p>Add item to your list:</p>
                <input
                    type="text"
                    placeholder='Add item...'
                    onChange={this.handleInputChangeFor}
                />
                <button onClick={this.handleAddNewItem}>Add</button>
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxDetail);