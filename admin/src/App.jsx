import axios from 'axios';
axios.defaults.timeout = 15000;

import { useEffect, useState } from "react";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (
    <div className='bg-[#FBF7EE] min-h-screen'>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} />
          <div className='flex w-full'>
            <Sidebar />
            <main className='flex-1 px-5 sm:px-10 py-8 max-w-[1100px]'>
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </>}
    </div>
  )
}

export default App
