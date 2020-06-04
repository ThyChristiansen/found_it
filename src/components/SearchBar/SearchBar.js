import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearchBar.css'

import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: '7px',
        paddingRight: '10px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: '100px'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

class SearchBar extends Component {
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
            resultSearching = ''
        } else if (this.props.reduxState.searchItem.length === 0) {
            resultSearching = <p className="search_item">Result is empty</p>
        }
        else if (this.props.reduxState.searchItem.length !== 0) {
            resultSearching = this.props.reduxState.searchItem.map((item) => {
                //Condition for box's name base on each room's name
                if (item.room_name === 'Storage') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> A{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Basement') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> B{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Garage') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> C{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Livingroom') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> D{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Bedroom') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> E{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                } else if (item.room_name === 'Kitchen') {
                    return (
                        <div key={item.id} className="search_item">
                            <Link to={`/box-detail/${item.room_id}/${item.id}`}>
                                <p className="search-text">
                                    <span>{item.room_name}</span> <span> F{item.box_name}</span>
                                </p>
                            </Link>
                        </div>
                    )
                }else{
                    return "empty"
                }
            })
        }
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={this.handleChangeFor}
                            value={this.state.searchItem}
                        />
                    </div>
                </div>
                
                <p className="result_search">{resultSearching}</p>
                {/* <h1>{JSON.stringify(this.props.reduxState.searchItem.length)}</h1> */}
            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(SearchBar));
