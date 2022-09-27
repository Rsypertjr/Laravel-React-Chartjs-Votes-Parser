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
  color: 'black',
  fontSize: '0.8em'
};

const linkStyle2 = {
  margin: "1rem",
  textDecoration: "none",
  color: 'lightgrey',
  fontSize: '0.8em'
};


export default function AppRouter(props){   
  const [voteLineStyle, setVoteLineStyle] = useState(linkStyle);
  const [voteTableStyle, setVoteTableStyle] = useState(linkStyle);
  const [spikesLineStyle, setSpikesLineStyle] = useState(linkStyle);
  const [diffLineStyle, setDiffLineStyle] = useState(linkStyle);
  const [perLineStyle, setPerLineStyle] = useState(linkStyle);
  const [pieChartStyle, setPieChartStyle] = useState(linkStyle);
  const [barChartStyle, setBarChartStyle] = useState(linkStyle);
  const [binStackedStyle, setBinStackedStyle] = useState(linkStyle);


  const changeVLStyle = () => {
    setVoteLineStyle(linkStyle2);  
    setVoteTableStyle(linkStyle);
    setSpikesLineStyle(linkStyle); 
    setDiffLineStyle(linkStyle); 
    setPerLineStyle(linkStyle);  
    setPieChartStyle(linkStyle);
    setBarChartStyle(linkStyle);
  }

  const changeVTStyle = () => {
      setVoteTableStyle(linkStyle2);  
      setVoteLineStyle(linkStyle);  
      setSpikesLineStyle(linkStyle);
      setDiffLineStyle(linkStyle);  
      setPerLineStyle(linkStyle);  
      setPieChartStyle(linkStyle);
      setBarChartStyle(linkStyle);
      setBinStackedStyle(linkStyle);
   } 

  const changeSPStyle = () => {
    setSpikesLineStyle(linkStyle2);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle);  
    setDiffLineStyle(linkStyle); 
    setPerLineStyle(linkStyle);  
    setPieChartStyle(linkStyle);
    setBarChartStyle(linkStyle);
    setBinStackedStyle(linkStyle);
  } 

  const changeDLStyle = () => {
    setDiffLineStyle(linkStyle2)
    setSpikesLineStyle(linkStyle);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle); 
    setPerLineStyle(linkStyle); 
    setPieChartStyle(linkStyle); 
    setBarChartStyle(linkStyle);
    setBinStackedStyle(linkStyle);
  } 

  const changePLStyle = () => {
    setPerLineStyle(linkStyle2);
    setDiffLineStyle(linkStyle)
    setSpikesLineStyle(linkStyle);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle);  
    setPieChartStyle(linkStyle);
    setBarChartStyle(linkStyle);
    setBinStackedStyle(linkStyle);
  } 

  const changePCStyle = () => {
    setPieChartStyle(linkStyle2);
    setPerLineStyle(linkStyle);
    setDiffLineStyle(linkStyle)
    setSpikesLineStyle(linkStyle);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle);  
    setBarChartStyle(linkStyle);
    setBinStackedStyle(linkStyle);
  } 
  const changeBCStyle = () => {
    setBarChartStyle(linkStyle2);
    setPieChartStyle(linkStyle);
    setPerLineStyle(linkStyle);
    setDiffLineStyle(linkStyle)
    setSpikesLineStyle(linkStyle);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle);  
    setBinStackedStyle(linkStyle);
  } 

  const changeBSTStyle = () => {
    setBinStackedStyle(linkStyle2);
    setBarChartStyle(linkStyle);
    setPieChartStyle(linkStyle);
    setPerLineStyle(linkStyle);
    setDiffLineStyle(linkStyle)
    setSpikesLineStyle(linkStyle);
    setVoteTableStyle(linkStyle);  
    setVoteLineStyle(linkStyle);  
  } 


  useEffect(() => {
  
  });
   
    return(
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">    
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
                    <Link className="nav-link align-middle" href="#" onClick={changeVTStyle} to="/" style={voteTableStyle} >Votes Table</Link><span className="sr-only">(current)</span>  
                  </li>
                  <li className="nav-item" >
                    <Link className="nav-link align-middle" href="#" onClick={changeVLStyle} to="/voteslinechart"  style={voteLineStyle}>Votes Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changeSPStyle} to="/spikeslinechart" style={spikesLineStyle}>Spikes Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changeDLStyle} to="/difflinechart" style={diffLineStyle}>Difference Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changePLStyle}  to="/perlinechart" style={perLineStyle}>Percent Line Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changePCStyle} to="/piechart" style={pieChartStyle}>Pie Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changeBCStyle}  to="/barchart" style={barChartStyle} >Votes Bar Chart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link align-middle" href="#" onClick={changeBSTStyle}  to="/binstackedchart" style={binStackedStyle} >Bin Stacked Chart</Link>
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