import React from 'react';
import dolls from '../../images/mock/dolls.jpg';
import elephant from '../../images/mock/elephant.jpg';
import ice from '../../images/mock/ice.jpg';
import idk from '../../images/mock/idk.jpg';
import lion from '../../images/mock/lion.jpg';
import { Logo } from '../logo'
import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import  backgroundImage  from '../../images/search/searchBackground.png';

let YT_API_KEY = 'AIzaSyB68hIfLI1GYqHviC724F4kC9j6gQVII8I';

function Home(){

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [limit, setLimit] = useState(9);
  const [videosDetailed, setVideosDetailed] = useState([]);
  const [searchValue, setSearchValue] = useState(location.state.searchPhrase);

  const filterVideos = (event) => {
    if(event.key === 'Enter' && event.target.value !== ''){
        navigate('/home', {replace: true, state:{searchPhrase: event.target.value}});
        window.location.reload(false);
    }
  }

  const loadMore = () => {
    if(limit < videosMock.length){
      setLimit(limit + 9);
    }
    if(limit + 9 >= videosMock.length) {
      setAllLoaded(true);
      setLimit(videosMock.length);
    }
  }

  const logout = () => {
    navigate('/', {replace: true}); 
  }

  

  //mock
  const videosMock = [
    {id:1, name: 'testing video 1', description: 'description of testing video 1', creator: 'John Doe', thumbnailUrl: dolls, keywords: ['dolls', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:2, name: 'testing video 2', description: 'description of testing video 2', creator: 'Jane Doe', thumbnailUrl: elephant, keywords: ['elephant', 'animal'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:3, name: 'testing video 3', description: 'description of testing video 3', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:4, name: 'testing video 4', description: 'description of testing video 4', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:5, name: 'testing video 5', description: 'description of testing video 5', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '12K', date:'2 weeks ago', length:'1:22:14'},
    {id:6, name: 'testing video 6', description: 'description of testing video 6', creator: 'John Doe', thumbnailUrl: dolls, keywords: ['dolls', 'wooden'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:7, name: 'testing video 7', description: 'description of testing video 7', creator: 'Jane Doe', thumbnailUrl: elephant, keywords: ['elephant', 'animal'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:8, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:9, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:10, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:11, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:12, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:13, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:14, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:15, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:16, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:17, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:18, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:19, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:20, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:21, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:22, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:23, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:24, name: 'testing video 8', description: 'description of testing video 8', creator: 'Johnny Doe', thumbnailUrl: ice, keywords: ['ice', 'cold'], views: '412K', date:'2 weeks ago', length:'1:22:14'},
    {id:25, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:26, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:27, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:28, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:29, name: 'testing video 9', description: 'description of testing video 9', creator: 'Jack Doe', thumbnailUrl: idk, keywords: ['random', 'wooden'], views: '42K', date:'2 weeks ago', length:'1:22:14'},
    {id:30, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'},
    {id:31, name: 'testing video 10', description: 'description of testing video 10', creator: 'JIll Doe', thumbnailUrl: lion, keywords: ['lion', 'animal'], views: '11k', date:'3 weeks ago', length:'1:22:14'}
  ];
/*
  useEffect(() => {
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBeV3UoOpQgQRFIckNj3RulFxVz4Nia0M4&q=' + location.state.searchPhrase + '&maxResults=100&part=snippet&type=video')
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
      )
  }, [])

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
  })

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {*/
    return (
      <div className='Home'>
        
        <img className='bgImage_home' src={backgroundImage} />

        <div className='logo_home'><Logo/></div>
        <div className='logout_home' onClick={() => {logout()}}>Log Out</div>

        <div className='pageCenter'>
          <input className='searchVideos_home' onKeyDown={filterVideos} onChange={(event) => {setSearchValue(event.target.value)}} value={searchValue}/>

          <div className='homeVideosList'>
            {/* videos.slice(0, limit).map(video => (
              <div className='homeVideo' key={video.id.videoId} onClick={() => {navigate('/video', { state:{video: video} });}}>
                <img className='videoThumbnail' src={video.snippet.thumbnails.high.url} width="200px"/>
                <br/>
                <div>{video.snippet.title}</div>
              </div>
            )) */}

            { videosMock.slice(0, limit).map((video, i) => 
              <div className='homeVideo' key={i} onClick={() => {navigate('/video', { state:{video: video} });}}>
                <div className='videoThumbnail'><div className='videoLength_home'>{video.length}</div><img className='videoThumbnailImage' src={video.thumbnailUrl} width="200px"/></div>
                <div className='videoDetails_home'>
                  <div className='videTitle_home'>{video.name}</div>
                  <div className='videoDesc_home'>{video.views} views | {video.date}</div>
                </div>
              </div>
            ) }
            <br/>
            { !allLoaded&& <button className='loadMoreButton' onClick={loadMore}>Load More</button>}
          </div>
        </div>
        <div className='footer_home'>
          <div className='copyright_home'>
              <p>Copyright © 2023 ZoneV. All Rights Reserved.</p>
          </div>
          <div className='docsFooter_home'>
              <p>Terms of Use</p>
              <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    );
  }
//}

export default Home