import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { Logo } from '../logo'
import './Video.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dolls from '../../images/mock/dolls.jpg';
import elephant from '../../images/mock/elephant.jpg';
import ice from '../../images/mock/ice.jpg';
import idk from '../../images/mock/idk.jpg';
import lion from '../../images/mock/lion.jpg';
import { FiSearch } from 'react-icons/fi';

export const Video = () => {

  
  const userInfo = localStorage.getItem('user');
  const [showMore, setShowMore] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState('');
  const [channelInfo, setChannelInfo] = useState('');
  const [text, setText] = useState('');

  const locationVideo = useLocation();
  console.log(locationVideo.state.video);
  const videoVideo = locationVideo.state.video;

  useEffect(() => {
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId='+ videoVideo.id.videoId +'&type=video&maxResults=20&key=AIzaSyB68hIfLI1GYqHviC724F4kC9j6gQVII8I')
      .then(res => res.json())
      .then(
        (result) => {
          setRelatedVideos(result.items);
          setText(videoVideo.snippet.description);
        },
        (error) => {
          setError(error);
        }
    );

    fetch('https://www.googleapis.com/youtube/v3/channels?id='+ videoVideo.snippet.channelId +'&part=snippet&key=AIzaSyB68hIfLI1GYqHviC724F4kC9j6gQVII8I')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setChannelInfo(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const filterVideos = (event) => {
    if(event.key === 'Enter' && event.target.value !== ''){
      navigate('/search', {replace: true, state:{searchPhrase: event.target.value}});
    }
  }
  const logout = () => {
    navigate('/', {replace: true}); 
  }

  return (
    <div className='video'>
      
      <div className='topInfo'>
        <Link to="/search" state={{searchPhrase: ''}}><Logo/></Link>
        <div>
            Logged in as: {userInfo}
            <Link to="/" onClick={() => {localStorage.clear()}}><div className='logout_search'>Log Out</div></Link>
        </div>
      </div>
      <div className='Video'>
        <div className='pageCenter_video'>
          <div className='searchCorrection'>
            <FiSearch className='searchIcon_video'/>
            <input placeholder='search' className='searchVideos_video' onKeyDown={filterVideos} />
          </div>
        </div>
        <div className='pageContent'>
          <div className='videoContent'>
            <iframe
              width="1053"
              height="600"
              src={`https://www.youtube.com/embed/` + videoVideo.id.videoId}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className='videoVideo'
            />
            <h2 className='videoTitle'> {videoVideo.snippet.title}</h2>
            <div className='subTitle'>
              <div>1M views</div> | <div> {videoVideo.snippet.publishTime.slice(0,10)}</div>
            </div>
            <Link className='channelInfo' to={'/search/video/channel'} state={{channelId: videoVideo.snippet.channelId}}>
              <img className='channelImg' src={channelInfo.items ? channelInfo.items[0].snippet.thumbnails.default.url : ''}/>
              <div className='channelSubinfo'>
                <h3>{videoVideo.snippet.channelTitle}</h3>
                <div>111M subscribers</div>
              </div>
            </Link>
            <div className='videoDesc'>
              {showMore ? text : text.substring(0, 250)}
              <button className='showMoreDesc' onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
          <div className='sidePage_video'>
            <div className='related'>Related</div>
            <div className='recommendedVideos'>
              {relatedVideos.slice(0, 20).map((video, i) => 
                <Link onClick={() => {window.location.href='/search/video';}} className='recommendedVideo' key={i} to={'/search/video'}  state={{video: video}}>
                  <div className='videoThumbnail_video'><div className='videoLength_video'>10:10:10</div><img className='videoThumbnailImage_video' src={video.snippet.thumbnails.high.url} width="200px"/></div>
                  <div className='videoDetails_video'>
                    <div className='videoTitle_video'>{video.snippet.title}</div>
                    <div className='channelTitle_video'>{video.snippet.channelTitle}</div>
                    <div className='videoDesc_video'>1M views | 2 weeks ago</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='footer_video' onClick={() => {alert(location.state.video.name);}}>
            <div className='copyright_video'>
                <p>Copyright © 2023 ZoneV. All Rights Reserved.</p>
            </div>
            <div className='docsFooter_video'>
                <p>Terms of Use</p>
                <p>Privacy Policy</p>
            </div>
      </div>
    </div>
  )
}
