import {
    AppBar,
    Avatar,
    Box, Container,
    Dialog,
    Fab, Grid,
    IconButton, ListItem,
    ListItemAvatar,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import axios from "axios";
import {CancelPresentation, Details, PeopleOutline, PersonAdd, PersonAddDisabled, Sms} from "@material-ui/icons";
import React, {useEffect, useState} from "react";

export default function FriendInfo({listFriend, queueFriend, openDialog, email, name, image}) {
    let params = (new URL(document.location)).searchParams;
    const [listFriendOfSeaRs_, setListFrOfSeaRs_] = useState(listFriend);
    const [queueFriendOfSeaRs_, setQueueFrOfSeaRs_] = useState(queueFriend);
    return (
        <Dialog open={openDialog} fullScreen>
            <AppBar>
                <Toolbar>
                    <Fab variant="extended" color="info" aria-label="add"
                         onClick={() => window.location.reload()}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                        >
                            <CancelPresentation/>
                            Cancel
                        </IconButton>
                    </Fab>
                </Toolbar>
            </AppBar>
            <Box sx={{alignItems: 'center', flexDirection: 'column', marginTop: 6, display: 'flex'}}>
                <Avatar sx={{width: 80, height: 80, m: 3, marginTop: 4}} src={image}/>
                <Typography component="h1"
                            variant="h4">{name}</Typography>
            </Box>
            <Grid container direction="row" justifyContent="center"
                  alignItems="center">
                <Grid item>
                    {listFriendOfSeaRs_.includes(params.get('email')) ?
                        <Fab>
                            <IconButton onClick={() => {
                                axios.delete("https://anime-douyin.herokuapp.com/unFriend", {
                                    params: {
                                        email: params.get('email'),
                                        emailFr: email
                                    }
                                }).then(resp => setListFrOfSeaRs_(resp.data)).catch(er => console.log(er)).finally(() => alert('UnFriend Success!'))
                            }}><PeopleOutline fontSize={'large'}/></IconButton>UnFriend
                        </Fab> :
                        queueFriendOfSeaRs_.includes(params.get('email')) ?
                            <IconButton onClick={() => {
                                axios.delete('https://anime-douyin.herokuapp.com/unAddFrToQueue', {
                                    params: {
                                        email: params.get('email'),
                                        emailFr: email
                                    }
                                }).then(resp => setQueueFrOfSeaRs_(resp.data)).finally(() => alert('Un Add Friend Request Success'))
                                    .catch(er => console.log(er))
                            }}>
                                <PersonAddDisabled fontSize={'large'}/>
                            </IconButton> :
                            <IconButton onClick={() => {
                                axios.post('https://anime-douyin.herokuapp.com/addFrToQueue', {
                                    email: params.get('email'),
                                    emailFriend: email
                                }).then(resp => setQueueFrOfSeaRs_(resp.data)).catch(er => console.log(er)).finally(() => alert('Send Add Friend Request Success'))
                            }}> <PersonAdd fontSize={'large'}/> </IconButton>}
                </Grid>
                <Grid item>
                    <IconButton><Sms fontSize={'large'}/></IconButton>
                </Grid>
            </Grid>
        </Dialog>
    );
}