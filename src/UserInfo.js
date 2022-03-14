
import { Avatar, Box, Container, Grid, Typography, IconButton, ButtonGroup, Button, Fab, Chip } from '@mui/material';
import axios from "axios";
import './UserInfo.css';
import React from "react";
import Video from "./Video";
import { Forum, Notifications } from '@material-ui/icons';
export default function UserInfo() {
    let params = (new URL(document.location)).searchParams;
    const [listVidLiked, setVidLiked] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://anime-douyin.herokuapp.com/getAllVideoLiked", { params: { email: params.get('email') }}).then(resp => {
            console.log(resp.data)
            setVidLiked(resp.data)
        }).catch(er => console.log(er));
    }, []);
    return (
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: '#263238', height: '45vh' }}>
                <div style={{
                    padding: 20, marginTop: 16, marginLeft: 45, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ width: 80, height: 80, m: 3, marginTop: 4 }} />
                    <Typography component="h1" variant="h4">{params.get('name')}</Typography>
                    <Grid sx={{ flexGrow: 1, margin:3}} container justifyContent="center" direction="row" alignItems="center">
                        <Grid item><Fab variant="extended" color="primary" aria-label="add"><Notifications />Notifications</Fab></Grid>
                        <Grid item><Fab variant="extended" color="primary" aria-label="add"><Forum />Messenger</Fab></Grid>
                        <Grid item><Fab variant="extended" color="primary" aria-label="add"></Fab></Grid>
                    </Grid>
                </div>
            </Box>
            <Box sx={{ bgcolor: '#202c2f', height: '70vh' }}>
            <Chip size='large' label="List Video You Liked :3" color="success" avatar={<Avatar src={params.get('image')} />} /> 
                <div className='vidLiked'>
                    <div className='app'>
                        <div className='app_video'>
                            {
                                listVidLiked.map(({url, comments, amountLike, asset_id, listUserLiked}) =>
                                    <Video url={url} comments={comments} id_vid={asset_id} listUserLiked={listUserLiked} amountLike={amountLike}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Box>
        </Container>
    );
}