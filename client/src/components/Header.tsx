import React, { FunctionComponent, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createImageFromInitials } from '../utils';
import { UserData, UserInput } from '../redux/auth/authInterfaces';
import './Header.scss';
import AuthDialog from './AuthDialog';
import { logout } from '../redux/auth/authSlice';
import authActions from '../redux/auth/authActions';

const useStyles = makeStyles({
    appBar: {
        padding: '5px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoButton: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
});

interface HeaderProps {
    userData: UserData;
    logoutUser: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({ userData, logoutUser }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('userData');
        logoutUser();
    };

    return (
        <AppBar position="static" color="transparent" className={classes.appBar}>
            <IconButton disableRipple disableFocusRipple className={classes.logoButton} href="/">
                <img src="assets/img/logo.svg" width="120px" height="75px" alt="logo" />
            </IconButton>
            <Toolbar>
                {userData.token.length === 0 ? (
                    <>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Login
                        </Button>
                        <AuthDialog open={openDialog} handleClose={handleCloseDialog} />
                    </>
                ) : (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            size="medium"
                        >
                            <img
                                id="preview"
                                src={createImageFromInitials(
                                    40,
                                    `${userData.first_name[0]}${userData.last_name[0]}`
                                )}
                                alt="profile-pic"
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    logoutUser: () => {
        dispatch(logout());
    },
});

export default connect(null, mapDispatchToProps)(Header);
