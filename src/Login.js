import {Avatar, IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Home} from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import * as React from "react";

export default function Login() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const [rft, setRft] = useState(null);
    const handleButton = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if(params.get('email')!=null) {
            axios.get('https://anime-douyin.herokuapp.com/getUserInfo', {params : {email : params.get('email')}}).then(resp => {
                setNameUser(resp.data.name);
                setRft(resp.data.refreshToken);
            }).catch(err => console.log(err));
        }
    }, [])

    let params = (new URL(document.location)).searchParams;
    return (
        <>
            {
                params.get('email') != null ?
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-login"
                            aria-haspopup="true"
                            onClick={handleButton}
                            color="inherit"
                        >
                            <Avatar src={params.get('image')}/>
                        </IconButton>
                        <Menu
                            id="menu-login"
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
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem href="https://anime-douyin.vercel.app/">Log Out</MenuItem>
                        </Menu>

                    </div> : <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleButton}
                        color="inherit"
                        href={'https://anime-douyin.herokuapp.com/redirect'}
                    > <AccountCircle/> </IconButton>
            }
            {params.get('email')!=null ? <IconButton href={'https://anime-douyin.vercel.app/userInfo?email=' + params.get('email') + '&image=' + params.get('image') + '&name=' + nameUser + '&rft=' + rft}> <Home /></IconButton> : <IconButton href={'https://anime-douyin.herokuapp.com/redirect'}><Home /></IconButton>}
        </>
    );
}
