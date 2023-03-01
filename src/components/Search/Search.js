import React from 'react'
import './Search.css';
import { Logo } from '../logo'
import  backgroundImage  from '../../images/search/searchBackground.png';
import { Link, useFetcher } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import dolls from '../../images/mock/dolls.jpg';
import elephant from '../../images/mock/elephant.jpg';
import ice from '../../images/mock/ice.jpg';
import idk from '../../images/mock/idk.jpg';
import lion from '../../images/mock/lion.jpg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

export const Search = () => {

      
    const userInfo = localStorage.getItem('user');
    const location = useLocation();

    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [videos, setVideos] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);
    const [limit, setLimit] = useState(9);
    const [videosDetailed, setVideosDetailed] = useState([]);
    const [searchValue, setSearchValue] = useState(location.state.searchPhrase);
    const [searchStyle, setSearchStyle] = useState('siteTitle_search')
    const [videosListStyle, setVideosListStyle] = useState('homeVideosList')

    const loadMore = () => {
        if(limit < videos.length){
            setLimit(limit + 9);
        }
        if(limit + 9 >= videos.length) {
            setAllLoaded(true);
            setLimit(videos.length);
        }
    }

    useEffect(() => {
        if(location.state.searchPhrase !== ''){
            setLimit(9);
            setAllLoaded(false);
            setSearchStyle('siteTitle_search_up');
            setVideosListStyle('homeVideosList_change');
            setVideos([]);
            
            
            fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBeV3UoOpQgQRFIckNj3RulFxVz4Nia0M4&q=' + searchValue + '&maxResults=100&part=snippet&type=video')
            .then(res => res.json())
            .then(
                (result) => {
                setIsLoaded(true);
                setVideos(result.items);
                },
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            );
            

            videos.forEach((video) => {
                fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+ video.id.videoId +'&key=AIzaSyBeV3UoOpQgQRFIckNj3RulFxVz4Nia0M4')
                .then(res => res.json())
                .then(
                    (result) => {
                    setVideosDetailed(videosDetailed => [...videosDetailed, result.items]);
                    },
                    (error) => {
                    console.log(error);
                    }
                )
            });
        }
    }, []);

    const filterVideos = (event) => {
        if(event.key === 'Enter' && event.target.value !== ''){
            setLimit(9);
            setAllLoaded(false);
            setSearchStyle('siteTitle_search_up');
            setVideosListStyle('homeVideosList_change');
            setVideos([]);
            
            
            fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBeV3UoOpQgQRFIckNj3RulFxVz4Nia0M4&q=' + searchValue + '&maxResults=100&part=snippet&type=video')
            .then(res => res.json())
            .then(
                (result) => {
                setIsLoaded(true);
                setVideos(result.items);
                },
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            );
            

            videos.forEach((video) => {
                fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+ video.id.videoId +'&key=AIzaSyBeV3UoOpQgQRFIckNj3RulFxVz4Nia0M4')
                .then(res => res.json())
                .then(
                    (result) => {
                    setVideosDetailed(videosDetailed => [...videosDetailed, result.items]);
                    },
                    (error) => {
                    console.log(error);
                    }
                )
            });
        }
    }

    return (
        <div className='Search'>
            
            <img className='bgImage_search' src={backgroundImage} />

            <div className='topInfo'>
                <Logo/>
                <div>
                    Logged in as: {userInfo}
                    <Link to="/" onClick= {() => {localStorage.clear();}}><div className='logout_search'>Log Out</div></Link>
                </div>
            </div>

            <div className='pageCenter'>
            
                <div className={searchStyle}>
                    {videos.length===0&& <p className='titleDesc_search'>Search over 1M videos</p>}
                    {videos.length===0&& <h1 className='title_search'>What do you want to watch?</h1>}
                    <div>
                        <FiSearch className='searchIcon_search'/>
                        <input placeholder='Search' className='searchVideos_search' onKeyDown={filterVideos} onChange={(event) => {setSearchValue(event.target.value)}} value={searchValue} />
                    </div>
                </div>

                <div className={videosListStyle}>
                    {/* videos.slice(0, limit).map(video => (
                    <div className='homeVideo' key={video.id.videoId} onClick={() => {navigate('/video', { state:{video: video} });}}>
                        <img className='videoThumbnail' src={video.snippet.thumbnails.high.url} width="200px"/>
                        <br/>
                        <div>{video.snippet.title}</div>
                    </div>
                    )) */}
                    <div className='videosOrganized'>
                        {videos.slice(0, limit).map(video => 
                        <Link className='homeVideo' key={video.id} to={'/search/video/'} state={{video: video}}>
                            <img className='videoThumbnail' src={video.snippet.thumbnails.high.url} width="200px"/>
                            <div className='videoLength_home'>10:10:10</div>
                            <div className='videoDetails_home'>
                                <div className='videoTitle_home'>{video.snippet.title}</div>
                                <div className='channelTitle_home'>{video.snippet.channelTitle}</div>
                                <div className='videoDesc_home'>1M views | 2 weeks ago</div>
                            </div>
                        </Link>
                        ) }
                    </div>
                    {videos.length>9&& <div>{!allLoaded&& <button className='loadMoreButton' onClick={loadMore}>Load More</button>}</div>}
                </div>
            </div>

            <div onClick={console.log(videosDetailed[0])} className='footer_search'>
                <div className='copyright_search'>
                    <p>Copyright © 2023 ZoneV. All Rights Reserved.</p>
                </div>
                <div className='docsFooter_search'>
                    <p>Terms of Use</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}
