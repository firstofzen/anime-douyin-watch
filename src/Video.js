import { useState, useRef } from 'react';
import SideBarVideo from "./SideBarVideo";
import './Video.css'
export default function Video({url, amountLike ,comments, id_vid, listUserLiked}) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    return (
        <div className='Video'>
            <div className='Video_player'>
                <video width="100%" height="100%" loop={true} onClick={onVideoPress} ref={videoRef} src={url}/>
                <SideBarVideo _comments = {comments} id_vid={id_vid} _listUserLiked={listUserLiked} amountLike={amountLike}/>
            </div>
        </div>
    )
}