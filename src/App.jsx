import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Signin, Login, Trade, Catalog, Projects, Design, Shopinterior, OtpVerification  } from './Allcomponents'

export default function App() {
  return (

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signin />} />
          <Route path="/Trade" element={<Trade />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Design" element={<Design />} />
          <Route path="/Shopinterior" element={<Shopinterior />} />
          <Route path="/OtpVerification/:userId" element={<OtpVerification />} />
        </Routes>
      </BrowserRouter>
    
  )
}
