import {
    Avatar,
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    ButtonGroup,
    Button,
    Fab,
    Chip,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    DialogContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    TextField,
    DialogActions, Card, ListItemButton
} from '@mui/material';
import axios from "axios";
import './UserInfo.css';
import React, {useState} from "react";
import Video from "./Video";
import {
    Forum,
    Notifications,
    SupervisorAccount,
    CancelPresentation,
    GroupAdd,
    PersonAdd,
    Details,
    Sms,
    PersonAddDisabled,
    PeopleOutline
} from '@material-ui/icons';
import DialogContext from "@mui/material/Dialog/DialogContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function UserInfo() {
    let params = (new URL(document.location)).searchParams;
    const [listVidLiked, setVidLiked] = useState([]);
    const [openDialogFr, setOpenDialogFr] = useState(false);
    const [openDialogQueueFr, setOpenDialogQueueFr] = useState(false);
    const [listFr, setListFr] = useState([]);
    const [listQueueFr, setListQueueFr] = useState([]);
    const [openDialogSearchFr, setOpenDialogSearchFr] = useState(false);
    const [textSearchFr, setTextSearchFr] = useState("");
    const [resltSearchFr, setResltSearchFr] = useState([]);
    const [infoFr, setInfoFr] = useState({});
    const [openDialogDetailFr, setOpenDialogDetailFr] = useState(false);
    const [listFrOfFr, setListFrOfFr] = useState(infoFr.listFriend);
    const [queueFrOfFr, setQueueFrofFr] = useState(infoFr.queueAddFr);
    React.useEffect(() => {
        axios.get("https://anime-douyin.herokuapp.com/getAllVideoLiked", {params: {email: params.get('email')}}).then(resp => {
            console.log(resp.data)
            setVidLiked(resp.data)
        }).catch(er => console.log(er));
    }, []);

    const handleOpenDialogFr = () => {
        axios.get("https://anime-douyin.herokuapp.com/getAllFriend", {params: {email: params.get('email')}})
            .then(resp => setListFr(resp.data))
            .catch(er => console.log(er))
            .finally(() => setOpenDialogFr(true));
    }

    const handleOpenDialogQueueFr = () => {
        axios.get("https://anime-douyin.herokuapp.com/getQueueFr", {params: {email: params.get('email')}}).then(resp => {
            setListQueueFr(resp.data);
        }).catch(er => console.log(er)).finally(() => setOpenDialogQueueFr(true))
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: '#263238', height: '45vh'}}>
                <div style={{
                    padding: 20, marginTop: 16, marginLeft: 45, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{width: 80, height: 80, m: 3, marginTop: 4}} src={params.get('image')}/>
                    <Typography component="h1" variant="h4">{params.get('name')}</Typography>
                    <Grid sx={{flexGrow: 1, margin: 3, width: 'auto', height: 'auto'}} container justifyContent="center"
                          direction="row" alignItems="center">
                        <Grid item><IconButton><Notifications fontSize={'large'}/></IconButton></Grid>
                        <Grid item><IconButton><Forum fontSize={'large'}/></IconButton></Grid>
                        <Grid item>
                            <IconButton onClick={handleOpenDialogFr}><SupervisorAccount
                                fontSize={'large'}/></IconButton>
                            <Dialog TransitionComponent={Transition} fullScreen onClose={() => setOpenDialogFr(false)}
                                    open={openDialogFr}>
                                <AppBar sx={{position: 'relative'}}>
                                    <Toolbar>
                                        <Fab variant="extended" color="info" aria-label="add"><IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={() => setOpenDialogFr(false)}
                                            aria-label="close"
                                        >
                                            <CancelPresentation/>
                                        </IconButton>
                                            Cancel
                                        </Fab>
                                        <Fab variant="extended" color="info" aria-label="add">
                                        <IconButton edge={'end'} onClick={handleOpenDialogQueueFr}>
                                            <GroupAdd/>
                                        </IconButton>
                                        Request Add Friend
                                        </Fab>
                                        <Dialog open={openDialogQueueFr} onClose={() => setOpenDialogQueueFr(false)}>
                                            <DialogContent>
                                                <List>
                                                    {
                                                        listQueueFr.map(({image, name, email}) =>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar src={image}/>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={name}/>
                                                                <ListItemButton>
                                                                    <Button onClick={() => {axios.post('https://anime-douyin.herokuapp.com/addFriend', {email: params.get('email'), emailFriend : email}).then(resp => {setListFr(resp.data.listFriend); setListQueueFr(resp.data.queueFriend)})
                                                                        .catch(er => console.log(er))
                                                                    }}>Accept</Button>
                                                                </ListItemButton>
                                                            </ListItem>
                                                        )
                                                    }
                                                </List>
                                            </DialogContent>
                                        </Dialog>
                                    </Toolbar>
                                </AppBar>
                                <List>
                                    {
                                        listFr.map(({image, name, email}) =>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={image}/>
                                                </ListItemAvatar>
                                                <ListItemText primary={name}/>
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Dialog>
                        </Grid>
                        <Grid>
                            <IconButton onClick={() => setOpenDialogSearchFr(true)}>
                                <PersonAdd fontSize={'large'}/>
                            </IconButton>
                            <Dialog open={openDialogSearchFr} onClose={() => {
                                setOpenDialogSearchFr(false);
                                setResltSearchFr([]);
                            }}>
                                <DialogTitle>Search User</DialogTitle>
                                <TextField hiddenLabel
                                           id="filled-hidden-label-normal"
                                           variant="filled"
                                           size={'medium'}
                                           onChange={ev => setTextSearchFr(ev.target.value)}
                                />
                                <List>
                                    {
                                        resltSearchFr.map(({image, name, email}) =>
                                            <ListItem secondaryAction={
                                                <Fab variant="extended" color="default" aria-label="add">
                                                    <IconButton
                                                        onClick={() => axios.get("https://anime-douyin.herokuapp.com/getUserInfo", {params: {email: email}}).then(resp => setInfoFr(resp.data)).catch(er => console.log(er)).finally(() => setOpenDialogDetailFr(true))}><Details/></IconButton>
                                                    Details Info
                                                </Fab>
                                            }>
                                                <ListItemAvatar><Avatar src={image}/></ListItemAvatar>
                                                <ListItemText primary={name}/>
                                                <Dialog open={openDialogDetailFr}>
                                                    <Card sx={{display: 'flex'}}>
                                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                            <Avatar src={image}/>
                                                            <Typography component="h1" variant="h4">{name}</Typography>
                                                        </Box>
                                                        <Grid container direction="row" justifyContent="center"
                                                              alignItems="center">
                                                            <Grid item>
                                                                {listFrOfFr.includes(params.get('email')) ?
                                                                    <Fab>
                                                                        <IconButton onClick={() => {
                                                                            axios.delete("https://anime-douyin.herokuapp.com/unFriend", {
                                                                                params: {
                                                                                    email: params.get('email'),
                                                                                    emailFr: email
                                                                                }
                                                                            }).then(resp => setListFrOfFr(resp.data)).catch(er => console.log(er))
                                                                        }}><PeopleOutline/></IconButton>UnFriend
                                                                    </Fab> :
                                                                    queueFrOfFr.includes(params.get('email')) ?
                                                                        <IconButton onClick={() => {

                                                                        }}>
                                                                            <PersonAddDisabled/>
                                                                        </IconButton> :
                                                                        <IconButton onClick={() => {

                                                                        }}> <PersonAdd/> </IconButton>}
                                                            </Grid>
                                                            <Grid item>
                                                                <IconButton><Sms/></IconButton>
                                                            </Grid>

                                                        </Grid>
                                                    </Card>
                                                </Dialog>
                                            </ListItem>
                                        )
                                    }
                                </List>
                                <DialogActions><Button onClick={() => {
                                    axios.get("https://anime-douyin.herokuapp.com/searchUsrByPrefixName", {params: {prefixNameFr: textSearchFr}})
                                        .then(resp => setResltSearchFr(resp.data))
                                        .catch(er => console.log(er));
                                }}>Search</Button></DialogActions>

                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            <Box sx={{bgcolor: '#202c2f', height: '70vh'}}>
                <Chip size='large' label="List Video You Liked :3" color="success"
                      avatar={<Avatar src={params.get('image')}/>}/>
                <div className='vidLiked'>
                    <div className='app'>
                        <div className='app_video'>
                            {
                                listVidLiked.map(({url, comments, amountLike, asset_id, listUserLiked}) =>
                                    <Video url={url} comments={comments} id_vid={asset_id} listUserLiked={listUserLiked}
                                           amountLike={amountLike}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Box>
        </Container>
    );
}