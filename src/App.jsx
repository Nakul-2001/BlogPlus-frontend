import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Write from './Pages/Write'
import Update from './Pages/Update'
import Blog from './Pages/Blog'
import {Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function App() {
  
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />}></Route>
        <Route path='/register' element={!currentUser ? <Register /> : <Navigate to='/' />}></Route>
        <Route path='/write' element={<Write/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/Blog/:id' element={<Blog/>}></Route>
      </Routes>
    </Router>
    <Toaster></Toaster>
    </>
  )
}

export default App
