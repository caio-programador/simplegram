import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetails from './components/PostDetails'
import Footer from './components/Footer'
import About from './pages/About'
import CreatePost from './pages/CreatePost'

function App () {
  return (
    
      <BrowserRouter>
        <Navbar/>
        <div data-testid='container' className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About />}/>
            <Route path='/posts/create' element={<CreatePost />} />
            <Route path='/posts/:id' element={<PostDetails />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
  )
}

export default App