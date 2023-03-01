import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Logo } from '../logo';
import { useState, useEffect } from 'react';
import './Channel.css';
import banner from '../../images/channel/channelBanner.jpg';
import { FiSearch } from 'react-icons/fi';

const Channel = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = localStorage.getItem('user');
  const [channelInfo, setChannelInfo] = useState('');
  const [channelVideos, setChannelVideos] = useState([]);
  const [error, setError] = useState('');
  
  const [searchValue, setSearchValue] = useState(location.state.searchPhrase);

  const filterVideos = (event) => {
    if(event.key === 'Enter' && event.target.value !== ''){
        navigate('/search', {replace: true, state:{searchPhrase: event.target.value}});
        window.location.reload(false);
    }
  }

  const logout = () => {
    navigate('/', {replace: true}); 
  }

  useEffect(() => {
    console.log(location.state.channelId)
    fetch('https://www.googleapis.com/youtube/v3/channels?id='+ location.state.channelId +'&part=snippet,brandingSettings,statistics&key=AIzaSyB68hIfLI1GYqHviC724F4kC9j6gQVII8I')
      .then(res => res.json())
      .then(
        (result) => {
          setChannelInfo(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
    );
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyB68hIfLI1GYqHviC724F4kC9j6gQVII8I&channelId='+ location.state.channelId +'&part=snippet,id&order=date&maxResults=8')
      .then(res => res.json())
      .then(
        (result) => {
          setChannelVideos(result.items);
        },
        (error) => {
          setError(error);
        }
    );
  }, []);


  // channelInfo.items[0].snippet.thumbnails.default.url

  return (
    <div>
      <div className='Channel'>

          <div className='topInfo'>
            <div  className='logo_channel'><Logo /></div>
            <div className='logout_channel'>
              Logged in as: {userInfo}
              <Link to="/" onClick= {() => {localStorage.clear();}}><div className='logout_search'>Log Out</div></Link>
            </div>
          </div>

          <div className='pageCenter_channel'>
            <div>
              <FiSearch className='searchIcon_channel' />
              <input placeholder='search' className='searchVideos_channel' onKeyDown={filterVideos}></input>
            </div>

            <div className='channelBannerInfo'>
              <img className='channelBanner' src={ channelInfo && channelInfo.items[0].brandingSettings.image ? channelInfo.items[0].brandingSettings.image.bannerExternalUrl : ''} />
              <div className='channelTitle'>
                <img className='channelProfileImg' src = {channelInfo.items ? channelInfo.items[0].snippet.thumbnails.default.url : ''}/>
                <div className='channelName'>
                  <div className='channelNameText'>{channelInfo.items ? channelInfo.items[0].snippet.title : ''}</div>
                  <div className='channelNameSubs'>{channelInfo.items ? channelInfo.items[0].statistics.subscriberCount : ''} Subscribers</div>
                </div>
              </div>
            </div>
            <div className='channelVideosList'>
              {channelVideos.map((video, i) => 
                  <Link className='channelVideo' key={i} to={'/video'}  state={{video: video}}>
                    <div className='videoThumbnail_channel'><div className='videoLength_channel'>10:10:10</div><img className='videoThumbnailImage_channel' src={video.snippet.thumbnails.high.url} width="200px"/></div>
                    <div className='videoDetails_channel'>
                      <div className='videoTitle_channel'>{video.snippet.title}</div>
                      <div className='channelTitle_channel'>{video.snippet.channelTitle}</div>
                      <div className='videoDesc_channel'>1M views | 2 weeks ago</div>
                    </div>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <div className='footer_channel'>
        <div className='copyright_channel'>
            <p>Copyright © 2023 ZoneV. All Rights Reserved.</p>
        </div>
        <div className='docsFooter_channel'>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Channel