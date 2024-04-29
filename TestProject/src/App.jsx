import { useState } from 'react'
import {BrowserRouter,Routes,Route} from  "react-router-dom";
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage'
import Login from './components/Login';
import Forget from './components/Forget';
import Reset from './components/Reset';
import Dummy from './components/Dummy';
import Chat from './components/Chat';
import ChatBot from './pages/ChatBot';
import Check from './components/Check';


function App() {
  
 
  return (
    <>
<BrowserRouter>

<Routes>
  <Route path="/" element={<Dummy/>}></Route>
  <Route path="/dash" element={<HomePage/>}></Route>
  <Route path="/chat" element={<ChatBot/>}></Route>
  <Route path="/ch" element={<Check/>}></Route>


  <Route path="/signup" element={<SignUp/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/forgot" element={<Forget/>}></Route>
  <Route path="/resetPaswword/:token" element={<Reset/>}></Route>
  
  
</Routes>
</BrowserRouter>


      {/* <HomePage/> */}
    </>
  )
}

export default App
