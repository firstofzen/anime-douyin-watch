import './Home.css';
import {useEffect, useState} from "react";
import axios from "axios";
import HeaderApp from "./HeaderApp";
import Video from "./Video";
import Footer from "./Footer";
import * as React from "react";

export default function Home() {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        axios.get('https://anime-douyin.herokuapp.com/getAllVideo').then(resp => {
            setVideo(resp.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <>
            <HeaderApp/>
            <div className='app'>
                <div className='app_video'>
                    {
                        video.map(({url, comments, amountLike, asset_id, listUserLiked}) =>
                            <Video url={url} comments={comments} id_vid={asset_id} listUserLiked={listUserLiked} amountLike={amountLike}/>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}