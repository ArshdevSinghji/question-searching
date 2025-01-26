import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './Components/Context/Context'

import './App.css';
import Home from './Components/Pages/Home';
import Anagram from './Components/Questions/Anagram';
import Read_Along from './Components/Questions/Read_Along';
import Content_Only from './Components/Questions/Content_Only';
import Mcqs from './Components/Questions/Mcqs';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/anagram' element={<Anagram/>}/>
          <Route path='/read_along' element={<Read_Along/>}/>
          <Route path='/content_only' element={<Content_Only/>}/>
          <Route path='/mcq' element={<Mcqs/>}/>
        </Routes>
      </Router>
    </ContextProvider>
  )
}

export default App
