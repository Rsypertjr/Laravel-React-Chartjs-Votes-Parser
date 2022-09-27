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
            <div>
                <Container className="container mb-5">
                    <Container className="d-flex justify-content-center fw-bold mt-3">
                        <h1>Richard L. Sypert Jr's Work Portfolio</h1>
                    </Container>
                    <MyCarousel />
                </Container>
                <MyNavbar className="mt-5"/>
            </div>
               
           
        );
    }
}


if (document.getElementById('work-portfolio-react')){
    ReactDOM.render(<WorkPortfolio />, document.getElementById('work-portfolio-react'));
}