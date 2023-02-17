import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button, Tooltip, Container, Row, Col } from 'react-bootstrap';

export default function ResolutionDropdown(props){
    const[resolution, setResolution ] = useState(props.parse_resolution);
    const[isAvail, setIsAvail] = useState(true);
    const[title, setTitle ] = useState('');
    const[defaultResolution, setDefaultResolution] = useState(props.theResolutions[0].toString());
    const[chArray, setCHArray] = useState(props.chartData.chartArray);

    const selectResolution = (e) => {
        if(getTitle(e.value) == "Available"){
            setResolution(e.value);
            props.selectResolution(e.value);
        }
        else {
            alert("This resolution is not Available!");
        }
    }

    const getTitle = useCallback((res) => {
            let test = (props.pageNo-1)*10*res+res;

            if(test <=  props.theVotes.length)
                return "Available";
            else
                return "Not Available";
    });

    useEffect(() => {

        $('[data-toggle="tooltip"]').tooltip();
        setResolution(props.parse_resolution);


    });

    return(

            <Container>
                <Row className="mb-2">
                    <Col className="col-4" ></Col>
                    <Col className="col-3 bg-warning bg-gradient text-dark p-0 pt-2 ps-4">
                       <span>Select Chart Resolution (X Times)</span> 
                    </Col>
                    <Col className="col-1 mt-0">
                        <Dropdown options={props.theResolutions} onChange={selectResolution} value={defaultResolution} placeholder="Please Select an Option"/>
                    </Col>
                    <Col className="col-6"></Col>
                </Row>

            </Container>
    );
}
