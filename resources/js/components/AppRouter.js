import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes, Redirect, useHistory } from 'react-router-dom';
import { Router } from 'react-router-dom';
import VotesLineChart2 from './Charts/VotesLineChart2';
import SpikesLineChart from './Charts/SpikesLineChart'; 
import DiffLineChart from './Charts/DiffLineChart';
import PerLineChart from './Charts/PerLineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import BinStackedChart from './Charts/BinStackedChart';
import VoteTableReact from './VoteTableReact';



import styled from "styled-components";
import { map, takeRightWhile } from 'lodash';

const NavUnlisted = styled.ul`
  text-decoration: none;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  fontSize: '0.8em'
};

export default function AppRouter(props){




    return(
        <BrowserRouter>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#"><Link to="/votestable" style={linkStyle} >Votes Table</Link><span class="sr-only">(current)</span></a>   
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/voteslinechart" style={linkStyle} >Votes Line Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/spikeslinechart" style={linkStyle} >Spikes Line Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/difflinechart" style={linkStyle} >Difference Line Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/perlinechart" style={linkStyle} >Percent Line Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/piechart" style={linkStyle} >Pie Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/barchart" style={linkStyle} >Votes Bar Chart</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link to="/binstackedchart" style={linkStyle} >Bin Stacked Chart</Link></a>
              </li>
            </ul>
          </div>
        </nav>
          <Routes>
            <Route exact path="/votestable" element={<VoteTableReact {...props} getPageNumber={props.getPageNumber} type={'table'} rightArrow={props.rightArrow} leftArrow={props.leftArrow}/>} />
            <Route path="/voteslinechart" element={<VotesLineChart2 {...props} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}/>} />
            <Route path="/spikeslinechart" element={<SpikesLineChart {...props} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}  />}/>
            <Route path="/difflinechart" element={<DiffLineChart  {...props} selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />}/>
            <Route path="/perlinechart" element={<PerLineChart  {...props} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />} />
            <Route path="/piechart" element={<PieChart />}/>
            <Route path="/barchart" element={<BarChart  {...props} getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />}/>
            <Route path="/binstackedchart" element={<BinStackedChart {...props} getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />} />
          </Routes>
        </BrowserRouter>
    );
}