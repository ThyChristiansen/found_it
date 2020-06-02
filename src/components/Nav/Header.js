import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import SearchingBar from '../SearchBar/SearchBar';
import LogOut from '../LogOutButton/LogOutButton';

//-----------------------Styling----------------------------------
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
//-----------------------Styling----------------------------------

const useStyles = (theme) => ({
    root: {
        paddingBottom: '10px',
        // display: 'flex',

    },
    paper: {
        marginRight: theme.spacing(10),
        backgroundColor: "#efede7",
        paddingRight: "50px",
        paddingBottom: "30px",

    },

});


class Header extends Component {
    state = {
        menu: false,
    }

    handleCloseNav = () => {
        console.log('click!')
        this.setState({
            menu: !this.state.menu
        })
    }

    handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.setState({
                menu: !this.state.menu
            })
        }
    }


    render() {
        const { classes } = this.props;

        //Create if statement to hide and show nav table drop down
        let menu;
        if (this.state.menu) {
            menu = <div className="nav">

                <Paper className={classes.paper}>
                    {/* <ClickAwayListener > */}
                        <MenuList id="menu-list-grow" onKeyDown={this.handleListKeyDown}>
                            <MenuItem onClick={this.handleCloseNav}>
                                <Link className="nav-link" to="/home">

                                    {/* Show this link if they are logged in or not,
                                        but call this link 'Home' if they are logged in,
                                        and call this link 'Login / Register' if they are not */}
                                    {this.props.user.id ? 'Home' : 'Login / Register'}
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={this.handleCloseNav}>
                                {/* Show the link to the info page and the logout button if the user is logged in */}
                                {this.props.user.id && (
                                    <>
                                        <Link className="nav-link" to="/scanner">Scanner </Link><br />
                                    </>
                                )}
                            </MenuItem>
                            <MenuItem onClick={this.handleCloseNav}>
                                <Link className="nav-link" to="/about">About</Link><br />
                            </MenuItem>
                            <MenuItem onClick={this.handleCloseNav}>
                                {/* Always show this link since the about page is not protected */}
                                {this.props.user.id && (
                                    <>
                                        <LogOut className="logOut-btn" />
                                    </>
                                )}
                            </MenuItem>
                        </MenuList>
                    {/* </ClickAwayListener> */}
                </Paper>
            </div>
        }

        return (
            <div className="header">
                <div>
                    {this.props.user.id && (
                        <>
                            {/* Assigning link for header */}
                            <Link className="nav-title" to="/home">
                                <h3>FOUND IT</h3>
                            </Link><br />
                            {/* Table menu drop down */}
                            <span
                                onClick={this.handleCloseNav}
                                className="menu"
                            > <MenuIcon
                                    className={classes.root}
                                /></span>

                            {menu}
                            <div className='search_bar'><SearchingBar /></div>

                        </>
                    )}
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Header));
