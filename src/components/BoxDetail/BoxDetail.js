import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode';
import Item from '../Item/Item';
import './BoxDetail.css';


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
                id: match.params.id,
                roomId: match.params.roomId,

            }
        });
        //send this dispatch to get items of the box that user choosed
        dispatch({
            type: 'FETCH_ITEMS',
            payload: {
                id: match.params.id,
                roomId: match.params.roomId,

            }
        });
    }
    //handle come back list box page
    backClick = () => {
        console.log('back clicked');
        // this.props.history.push('/boxes/:id')
    }
    //handle changing for add new item input field
    handleInputChangeFor = (event) => {
        // console.log('changing', event.target.value)
        this.setState({
            item: event.target.value,
        });
    }
    handleSubmit = ()=>{
        if(this.state.item === ''){
            alert('Add items to your list before click button')
        }else{
            this.handleAddNewItem();
            this.handleClearInput();

        }
    }

    handleClearInput = () =>{
        this.setState({
            item: '',
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
                id: match.params.id,
                roomId: match.params.roomId,
            }
        })
    }

    render() {

        
        return (
            <div className= "box_detail">

                <button onClick={this.backClick}
                className = "back_btn">Back to list</button>
                {/* mapping through the box list array that get from database to display in DOM */}
                {this.props.reduxState.detail.map((box) => {
                    return (
                        <div key={box.id}>
                            <p className = "box_name">Box A{box.box_name}</p>
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
                    value = {this.state.item}
                    onChange={this.handleInputChangeFor}
                    width="80%"
                />
                <button onClick={this.handleSubmit}>Add</button>
                                
                <div className ="list_item" >
                    {this.props.reduxState.item.map((item) => {
                        return (
                            <div key={item.id}
                            className ="item"
                            >

                                <Item item={item} 
                                boxId = {item.box_id}
                                />
                            </div>
                        )
                    })}
                    {/* <h1>{JSON.stringify(this.props.reduxState.item[0])}</h1> */}
                </div>
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(BoxDetail);