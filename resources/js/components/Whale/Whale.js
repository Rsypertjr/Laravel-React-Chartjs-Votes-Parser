import React from 'react';
//import { useParams } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import Beluga from './Beluga';
import Blue from './Blue';

export default function Whale(props) { 
  // Use with useLocation
  //const { search } = useLocation();  
  const { type } = useParams();
  const message = props.message || {};
  //const { path } = useRoutes();

  // Use with useLocation
  //const match = search.match(/type=(.*)/);
  //const type = match?.[1];

  return (
    <>
      <h2>Whale</h2>
      <h2>{ message }</h2>
        {type === 'beluga' && <Beluga />}
        {type === 'blue' && <Blue />}  

      {/*
        <Routes>
          <Route path={`${path}/beluga`} element={<Beluga />} />
          <Route path={`${path}/blue`} element={<Blue />} />
        </Routes>
      */}
    </>
 
  );
}