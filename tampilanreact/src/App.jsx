
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"


  const Home = React.lazy(() => import("./components/Home"));
  const MahasiswaList = React.lazy(() => import("./components/mahasiswa/list"));
  const MahasiswaCreate = React.lazy(() => import("./components/mahasiswa/create"));
  const MahasiswaEdit = React.lazy(() => import("./components/mahasiswa/edit"));
  
  const App = () => {

  return (
    <Router>
        {/* <Navbar /> */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">MDP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/mahasiswa">Mahasiswa</NavLink>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Suspense fallback='loading....'> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mahasiswa" element={<MahasiswaList />} />
      <Route path="/mahasiswa/create" element={<MahasiswaCreate />} />
      <Route path="/mahasiswa/edit/:id" element={<MahasiswaEdit />} />
      </Routes>
        </Suspense>
      </div>
    </Router>
    
  )
}

export default App
