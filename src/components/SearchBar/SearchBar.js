import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class SearchingBar extends Component {
    //Create state to storing value of in input field
    state = {
        searchItem: ''
    }
    //handle change for search input field and by the same time send the action SEARCH_ITEM to Saga
    handleChangeFor = (event) => {
        this.setState({
            searchItem: event.target.value
        });
        this.props.dispatch({
            type: 'SEARCH_ITEM',
            payload: {
                searchItem: this.state.searchItem,
            }
        })
    }

    render() {
        //If the value inside the search bar is empty, return result of searching will empty.
        //if the result of the searching is not match with any item inside the boxes, return Result searching is empty.
        //if the result of the searching is match with items that inside the boxes, return room name, box name.

        let resultSearching;
        if (this.state.searchItem.length === 0) {
            resultSearching = <p></p>
        } else if (this.props.reduxState.searchItem.length === 0) {
            resultSearching = <p>Result searching is empty</p>
        }
        else if (this.props.reduxState.searchItem.length !== 0) {
            resultSearching = this.props.reduxState.searchItem.map((item) => {
                if (item.room_name === 'Storage') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> A{item.box_name}</span>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Basement') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> B{item.box_name}</span>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Garage') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> C{item.box_name}</span>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Livingroom') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> D{item.box_name}</span>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Bedroom') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> E{item.box_name}</span>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Kitchen') {
                    return (
                        <div key={item.id}>
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <span>{item.room_name}</span> <span> F{item.box_name}</span>
                            </Link>
                        </div>
                    )
                }

            })
        }


        return (
            <div>
                <input
                    type="text"
                    placeholder="Find item..."
                    value={this.state.searchItem}
                    onChange={this.handleChangeFor}
                />
                <p>{resultSearching}</p>

                {/* <h1>{JSON.stringify(this.props.reduxState.searchItem.length)}</h1> */}

            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(SearchingBar);