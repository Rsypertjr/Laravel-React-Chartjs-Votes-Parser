import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import 'react-dropdown/style.css';
import { Button, Tooltip, Container, Row, Col } from 'react-bootstrap';

export default function ResolutionDropdown(props){
    const[resolution, setResolution ] = useState("1");
    const[isAvail, setIsAvail] = useState(true);
    const[title, setTitle ] = useState('');
    const[defaultResolution, setDefaultResolution] = useState(props.theResolutions[0].toString());
    const[chArray, setCHArray] = useState(props.chartData.chartArray);

    const selectResolution = (e) => {
        setResolution(e.toString());
        if(getTitle(e) == "Available" || parseInt(e) < parseInt(props.parse_resolution) ){

            props.selectResolution(e);
            //alert(resolution);
        }
        else {
            alert("Resolution " + e.toString() + " is not Available!");
            setResolution("1");
            props.selectResolution("1");
        }

    }

    const Select = ({ values, onValueChange, selected, ...rest }) => {
        return (
            <select
                onChange={({ target: { value }}) => onValueChange(value)}
                {...rest}
            >
                {values.map(([value, text]) => (
                    <option key={value} selected={selected === value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        );
    };

    const choices = [
        ['1','one'],
        ['2','two'],
        ['3','three'],
        ['4','four'],
        ['5','five'],

    ];

    const getTitle = useCallback((res) => {
            let test = (parseInt(props.pageNo)-1)*10*parseInt(res)+parseInt(res);

            if(parseInt(test) <=  props.theVotes.length)
                return "Available";
            else
                return "Not Available";
    });

    useEffect(() => {

        $('[data-toggle="tooltip"]').tooltip();
       // setResolution(props.parse_resolution);


    });

    return(

            <Container className='resolution'>
                <Row>
                    <Col className="col-4" ></Col>
                    <Col className="col-3 bg-warning bg-gradient text-dark pt-3">
                        <p>Select Chart Resolution (X Times)</p>
                    </Col>
                    <Col className="col-1 p-2">
                        <Select
                            values={choices}
                            selected={resolution}
                            onValueChange={selectResolution}
                        />
                    </Col>
                    <Col className="col-6"></Col>
                </Row>

            </Container>
    );
}
