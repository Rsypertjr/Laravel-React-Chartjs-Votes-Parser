import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, Redirect, useHistory} from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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

const linkStyle2 = {
  margin: "1rem",
  textDecoration: "none",
  color: 'lightgrey',
  fontSize: '0.8em'
};


export default function AppRouter(props){   
  const [resetStyle, setResetStyle] = useState(linkStyle);
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

  const changeResetStyle = () => {
    setBinStackedStyle(linkStyle);
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
          <>
            <Navbar className="navbar-dark bg-dark" expand="lg">
              <Container className="d-flex justify-content-between">
                <Navbar.Brand href="#">Select Table/Chart</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="ml-5">
                  <Nav className="me-auto">
                    <Nav.Link href="#" onClick={changeResetStyle}>
                      <Link to="/votes-table"  style={resetStyle}>
                        <Container className="text-center">Home/Reset</Container>                      
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeVTStyle}>
                      <Link to="/" style={voteTableStyle} >
                        <Container className="text-center">Votes Table</Container>                      
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeVLStyle}>
                      <Link to="/voteslinechart"  style={voteLineStyle}>
                        <Container className="text-center">Votes Line Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeSPStyle}>
                      <Link to="/spikeslinechart" style={spikesLineStyle} >
                        <Container className="text-center">Spikes Line Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeDLStyle}>
                      <Link to="/difflinechart" style={diffLineStyle} >
                        <Container className="text-center">Difference Line Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changePLStyle}>
                      <Link to="/perlinechart" style={perLineStyle} >
                        <Container className="text-center">Percent Line Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changePCStyle}>
                      <Link to="/piechart" style={pieChartStyle} >
                        <Container className="text-center">Pie Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeBCStyle}>
                      <Link to="/barchart" style={barChartStyle} >
                        <Container className="text-center">Votes Bar Chart</Container>
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" onClick={changeBSTStyle}>
                      <Link to="/binstackedchart" style={barChartStyle} >
                        <Container className="text-center">Bin Stacked Chart</Container>
                      </Link>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
     
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