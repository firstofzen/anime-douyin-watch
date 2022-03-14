import './SideBarVideo.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import MessageIcon from "@material-ui/icons/Message";

import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {
    Avatar,
    Dialog,
    Divider, IconButton,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import {Send} from "@material-ui/icons";

export default function SideBarVideo({_comments, id_vid, _listUserLiked, amountLike}) {

    const [Liked, setLiked] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCLoseDialog = () => {
        setOpenDialog(false)
    }
    let params = (new URL(document.location)).searchParams;
    const [comments, setComments] = useState(_comments);
    const [listUserLiked, setListUserLiked] = useState(_listUserLiked);
    const [textComment, setTextComment] = useState(null);
    const upComment = e => {
        console.log('textComment: ' + textComment)
        console.log('id vid : ' + id_vid)
        axios.put('https://anime-douyin.herokuapp.com/updateComment', {
                id_video : id_vid,
                comment : textComment,
                email : params.get('email')
        }).then(resp => {
            setComments(resp.data)
            console.log(resp.data)
        }).catch(err => console.log(err))
    }
    const updateTym = e => {
        setLiked(true)
        axios.put('https://anime-douyin.herokuapp.com/updateTym', {
            asset_id: id_vid,
            emailLiked: params.get('email')
        }, {headers: {'Access-Control-Allow-Origin': '*'}}).then(resp => {
            setListUserLiked(resp.data.listUserLiked)
        }).catch(error => console.log(error))
    }
    useEffect(() => {
        listUserLiked.forEach(ele => {
            if (params.get('email') != null && ele === params.get('email')) {
                setLiked(true);
            }
        })
    }, [])

    return (
        params.get('email') != null ?
            <div className="videoSidebar">
                <div className="videoSidebar__button">
                    {
                        Liked ?
                            <FavoriteIcon fontSize="default" onClick={updateTym}/>
                            :
                            <FavoriteBorderIcon fontSize="default" onClick={updateTym}/>
                    }
                    <p>{Liked ? amountLike + 1 : amountLike}</p>
                </div>
                <div className="videoSidebar__button">
                    <MessageIcon fontSize="default" onClick={handleOpenDialog}/>
                    <Dialog open={openDialog} onClose={handleCLoseDialog}>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {comments.map(({image, text, name}) =>
                                <div>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src={image}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={name}
                                            secondary={
                                                <Fragment>
                                                    {text}
                                                </Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li"/>
                                </div>
                            )}
                            <ListItem>
                                <Fragment>
                                    <Input bgcolor="default" onChange={e => setTextComment(e.target.value)}/>
                                    <IconButton onClick={upComment}><Send /></IconButton>
                                </Fragment>
                            </ListItem>
                        </List>
                    </Dialog>
                </div>
            </div>
            : <div className="videoSidebar">
                <div className="videoSidebar__button">
                    <IconButton href={'https://anime-douyin.herokuapp.com/redirect'}> <FavoriteBorderIcon fontSize="default" /></IconButton>
                    <p>{amountLike}</p>
                </div>
                <div className="videoSidebar__button">
                    <IconButton href={'https://anime-douyin.herokuapp.com/redirect'}><MessageIcon fontSize="default"/></IconButton>
                </div>
            </div>
    )
}