import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from './components/SignUp';
import HomePage from './pages/HomePage'
import Login from './components/Login';
import Forget from './components/Forget';
import Reset from './components/Reset';
import ChatBot from './pages/ChatBot';


function App() {

  


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dash" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatBot />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot" element={<Forget />}></Route>
          <Route path="/resetPaswword/:token" element={<Reset />}></Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
