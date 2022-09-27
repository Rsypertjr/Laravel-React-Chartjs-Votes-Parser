import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, Redirect, useHistory } from 'react-router-dom';
import VotesLineChart2 from './Charts/VotesLineChart2';
import SpikesLineChart from './Charts/SpikesLineChart'; 
import DiffLineChart from './Charts/DiffLineChart';
import PerLineChart from './Charts/PerLineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import BinStackedChart from './Charts/BinStackedChart';
import VoteTableReact from './VoteTableReact';
import VotesApp from './VotesApp';



import styled from "styled-components";
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',
  fontSize: '0.8em'
};

export default function AppRouter(props){   
  

  useEffect(() => {
    $("#navbarNav > ul > li > a").on('mouseover',function(){
      $(this).css('color','grey');
    });
    $("#navbarNav > ul > li > a").on('mouseover',function(){
      $(this).css('color','white');
    });

    $("#navbarNav > ul > li > a").on('click',function(){
      $("#navbarNav > ul > li > a").css('color','white');
      $(this).css('color','grey');
    }); 

  });
   
    return(
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">    
              <a className="navbar-brand align-middle" href="#">Select Table/Chart</a>  
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"  style={linkStyle}  href="#"><span>Reset</span></Link>   
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/" style={linkStyle} >Votes Table</Link><span className="sr-only">(current)</span>  
                  </li>
                  <li className="nav-item" >
                    <Link className="nav-link align-middle" href="#"  to="/voteslinechart"  style={linkStyle}>Votes Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/spikeslinechart" style={linkStyle}>Spikes Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/difflinechart" style={linkStyle}>Difference Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/perlinechart" style={linkStyle}>Percent Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" to="/piechart" style={linkStyle}>Pie Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/barchart" style={linkStyle} >Votes Bar Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#"  to="/binstackedchart" style={linkStyle} >Bin Stacked Chart</Link>
                  </li>
                </ul>
              </div>    
            </nav>
            <Routes>
              <Route path='/home'/>
              <Route exact path="/" element={<VoteTableReact {...props} resetCharts={props.resetCharts}  getPageNumber={props.getPageNumber} type={'table'} rightArrow={props.rightArrow} leftArrow={props.leftArrow}/>} />
              <Route path="/voteslinechart" element={<VotesLineChart2 {...props}  resetCharts={props.resetCharts} selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}/>} />
              <Route path="/spikeslinechart" element={<SpikesLineChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}  />}/>
              <Route path="/difflinechart" element={<DiffLineChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />}/>
              <Route path="/perlinechart" element={<PerLineChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />} />
              <Route path="/piechart" element={<PieChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'pie'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}  />}/>
              <Route path="/barchart" element={<BarChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />}/>
              <Route path="/binstackedchart" element={<BinStackedChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} />} />
            </Routes>
        </BrowserRouter>
            
    );
}