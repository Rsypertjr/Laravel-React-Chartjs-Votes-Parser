import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import VotesLineChart from './Charts/VotesLineChart';
import SpikesLineChart from './Charts/SpikesLineChart'; 
import DiffLineChart from './Charts/DiffLineChart';
import PerLineChart from './Charts/PerLineChart';
import PieChart from './Charts/PieChart';
import StackedChart from './Charts/StackedChart';
import BinStackedChart from './Charts/BinStackedChart';
import VoteTableReact from './VoteTableReact';


export default function VoteRouter() {
  return (
    <div className="wrapper">
      <h1>Marine Mammals</h1>      
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/votestable">Votes Table</Link></li>   
            <li><Link to="/voteslinechart">Votes Line Chart</Link></li>
            <li><Link to="/spikeslinechart">Spikes Line Chart</Link></li>
            <li><Link to="/difflinechart">Difference Line Chart</Link></li>
            <li><Link to="/perlinechart">Per Line Chart</Link></li>
            <li><Link to="/piechart">Pie Chart</Link></li>  
            <li><Link to="/stackedchart">Stacked Chart</Link></li>
            <li><Link to="/binstackedchart">Bin Stacked Chart</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/votestable" element={<VoteTableReact />}/>
          <Route path="/voteslinechart" element={<VotesLineChart />}/>
          <Route path="/spikeslinechart" element={<SpikesLineChart />}/>
          <Route path="/difflinechart" element={<DiffLineChart />}/>
          <Route path="/perlinechart" element={<PerLineChart />} />
          <Route path="/piechart" element={<PieChart />}/>
          <Route path="/stackedchart" element={<StackedChart />}/>
          <Route path="/binstackedchart" element={<BinStackedChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



if (document.getElementById('votes-table-react')){
    ReactDOM.render(<VoteRouter />, document.getElementById('votes-table-react'));
}