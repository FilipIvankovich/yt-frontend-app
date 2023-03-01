import React from 'react'
import { Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import { Video } from './Video/Video';
import { Search } from './Search/Search';
import Channel from './Channel/Channel';

export const App = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Login />}></Route>
            <Route path='/video' element={<Video />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/search/video' element={<Video />}></Route>
            <Route path='/search/video/channel' element={<Channel />}></Route>
            <Route path='/search/channel' element={<Channel />}></Route>
            <Route path='/channel/video' element={<Video />}></Route>
        </Routes>
    </>
  )
}
