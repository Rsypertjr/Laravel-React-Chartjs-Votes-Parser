import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './Sea.css';
import Manatee from '../Manatee/Manatee';
import Narwhal from '../Narwhal/Narwhal';
import Whale from '../Whale/Whale';


export default function Sea() {
  return (
    <div className="wrapper">
      <h1>Marine Mammals</h1>      
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/manatee">Manatee</Link></li>
            <li><Link to="/narwhal">Narwhal</Link></li>
            <li><Link to="/whale">Whale</Link></li>
        {/* <li><Link to="/whale?type=beluga">Beluga Whale</Link></li>
            <li><Link to="/whale?type=blue">Blue Whale</Link></li>  */}
            <li><Link to="/whale/beluga">Beluga Whale</Link></li>
            <li><Link to="/whale/blue">Blue Whale</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/manatee" element={<Manatee />}/>
          <Route path="/narwhal" element={<Narwhal />}/>
          <Route exact path="/whale" element={<Whale />}/>
          <Route path="/whale/:type" element={<Whale message="I am a whale"/>}/> 
        </Routes>      
      </BrowserRouter>
    </div>
  );
}


if (document.getElementById('sea-animals-react')){
    ReactDOM.render(<Sea />, document.getElementById('sea-animals-react'));
}


