import {IconButton} from "@material-ui/core";
import axios from "axios";
import {useState} from "react";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {Send} from "@material-ui/icons";

export default function Footer() {

    let params = (new URL(document.location)).searchParams;
    const [textFeedBack, setTextFeedBack] = useState(null);
    const sendFeedBack = e => {
        axios.post('https://anime-douyin.herokuapp.com/feedBack', {email: params.get('email'), text: textFeedBack}).then(resp => {
        }).catch(er => console.log(er))
        setTextFeedBack("");
    }
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <div>
                <TextField fullWidth label="Feed Back Me" onChange={e => setTextFeedBack(e.target.value)}/>
                {
                    params.get('email') != null ? <IconButton onClick={sendFeedBack}><Send/></IconButton> :
                        <IconButton><Send /></IconButton>
                }
            </div>
        </Box>

    );
}