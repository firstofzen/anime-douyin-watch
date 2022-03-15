
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
    Slide, Dialog, AppBar, Toolbar, DialogContent, List, ListItem, ListItemAvatar, ListItemText, DialogTitle
} from '@mui/material';
import axios from "axios";
import './UserInfo.css';
import React, {useState} from "react";
import Video from "./Video";
import { Forum, Notifications, SupervisorAccount, CancelPresentation, GroupAdd, PersonAdd } from '@material-ui/icons';
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
    const [textSearchFr,setTextSearchFr] =useState("");
    const [resltSearchFr, setResltSearchFr] = useState([]);
    React.useEffect(() => {
        axios.get("https://anime-douyin.herokuapp.com/getAllVideoLiked", { params: { email: params.get('email') }}).then(resp => {
            console.log(resp.data)
            setVidLiked(resp.data)
        }).catch(er => console.log(er));
    }, []);

    const handleOpenDialogFr = () => {
        axios.get("https://anime-douyin.herokuapp.com/getListFr", {params:{email:params.get('email')}})
            .then(resp => setListFr(resp.data))
            .catch(er => console.log(er))
            .finally(() => setOpenDialogFr(true));
    }

    const handleOpenDialogQueueFr = () => {
        axios.get("https://anime-douyin.herokuapp.com/getQueueFr", {params:{email:params.get('email')}}).then(resp => {
            setListQueueFr(resp.data);
        }).catch(er => console.log(er)).finally(() => setOpenDialogQueueFr(true))
    }

    const handleOpenDialogSearchFr = () => {
        axios.get("https://anime-douyin.herokuapp.com/searchUsrByPrefixName", {params:{prefixNameFr:textSearchFr}})
            .then(resp => setResltSearchFr(resp.data))
            .catch(er => console.log(er))
            .finally(() => setOpenDialogSearchFr(true));
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: '#263238', height: '45vh' }}>
                <div style={{
                    padding: 20, marginTop: 16, marginLeft: 45, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ width: 80, height: 80, m: 3, marginTop: 4 }} src={params.get('image')}/>
                    <Typography component="h1" variant="h4">{params.get('name')}</Typography>
                    <Grid sx={{ flexGrow: 1, margin:3, width: 'auto', height: 'auto'}} container justifyContent="center" direction="row" alignItems="center">
                        <Grid item><IconButton ><Notifications fontSize={'large'} /></IconButton></Grid>
                        <Grid item><IconButton ><Forum fontSize={'large'}/></IconButton></Grid>
                        <Grid item>
                            <IconButton onClick={handleOpenDialogFr}><SupervisorAccount fontSize={'large'}/></IconButton>
                            <Dialog TransitionComponent={Transition} fullScreen onClose={() => setOpenDialogFr(false)} open={openDialogFr}>
                                <AppBar sx={{position: 'relative'}}>
                                    <Toolbar>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={() => setOpenDialogFr(false)}
                                            aria-label="close"
                                        >
                                            <CancelPresentation />
                                        </IconButton>
                                        <IconButton edge={'end'} onClick={handleOpenDialogQueueFr}>
                                            <GroupAdd />
                                        </IconButton>
                                        <Dialog open={openDialogQueueFr} onClose={() => setOpenDialogQueueFr(false)}>
                                            <DialogContent>
                                                <List>
                                                    {
                                                        listQueueFr.map(({image, name}) =>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar src={image} />
                                                                </ListItemAvatar>
                                                                <ListItemText primary={name}/>
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
                                        listFr.map(({image, name}) =>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={image} />
                                                </ListItemAvatar>
                                                <ListItemText primary={name}/>
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Dialog>
                        </Grid>
                        <Grid>
                            <IconButton onClick={handleOpenDialogSearchFr}>
                                <PersonAdd />
                            </IconButton>
                            <Dialog open={openDialogSearchFr} onClose={() => setOpenDialogSearchFr(false)}>
                                <DialogTitle>Search User</DialogTitle>
                            </Dialog>
                        </Grid>
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