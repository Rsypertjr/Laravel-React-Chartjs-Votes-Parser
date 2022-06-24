import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import MyCarousel from './MyCarousel';
import MyNavbar from './MyNavbar';


export default class WorkPortfolio extends React.Component {
    constructor(props){
        super(props);  
    }
    
    
    render(){
        return(
            <>
                <Container className="d-flex h-auto p-3 mb-4 top rounded-3">
                    <div class="container-fluid py-2 top-container">
                        <h1 class="d-flex justify-content-center fw-bold pb-4">Richard L. Sypert Jr's Work Portfolio</h1>
                        <MyCarousel className="d-flex h-auto" />
                    </div> 
                </Container> 
                 
                <MyNavbar/>               
            </>
               
           
        );
    }
}


if (document.getElementById('work-portfolio-react')){
    ReactDOM.render(<WorkPortfolio />, document.getElementById('work-portfolio-react'));
}