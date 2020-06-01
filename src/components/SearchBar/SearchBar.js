import React, { Component } from 'react';
import { connect } from 'react-redux';


class SearchingBar extends Component {
    state = {
        searchItem:''
    }

    handleChangeFor = (event) => {
        // console.log('in handleChangeFor:', event.target.value);
        this.setState({
            searchItem: event.target.value
        });// end setState   
        this.props.dispatch({
            type: 'SEARCH_ITEM',
            payload: {
                searchItem: this.state.searchItem,
            }
        })
        // this.props.dispatch({
        //     type: 'SEARCH_EMPTY',
        //     payload: {
        //         searchItem: this.state.searchItem,
        //     }
        // })
    }

    handleSearching = () => {
       
        console.log('add new item clicked!');
        console.log('send this value to Saga',this.state.searchItem );

        // this.props.dispatch({
        //     type: 'SEARCH_ITEM',
        //     payload: {
        //         searchItem: this.state.searchItem,
        //     }
        // })
        // this.props.dispatch({
        //     type: 'SEARCH_EMPTY',
        //     payload: {
        //         searchItem: '',
        //     }
        // })
    }

    render() {
        return (
            <div>
             <input 
             type= "text"
             placeholder="Find item..."
             value = {this.state.searchItem}
             onChange={this.handleChangeFor}
             />
             {/* <button onClick = {this.handleSearching}>search</button> */}
             {this.props.reduxState.searchItem.map((item) => {
                    return (
                        <div key={item.id}>
                            <span>{item.room_name}</span> <span>Box {item.box_name}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(SearchingBar);