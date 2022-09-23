import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Button, OverlayTrigger, Tooltip, input,Container, Row } from 'react-bootstrap';

export default function ResolutionDropdown(props){ 
    const[resolution, setResolution ] = useState(props.parse_resolution);
   
    const selectResolution = (e) => {   
        if(getTitle(e.target.value) == "Available")
            setResolution(e.target.value);  
        props.selectResolution(e.target.value); 
      
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
                <Row className="justify-content-start">
                    <div className="btn-group dropright">
                        <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution (X Times)
                        </button>
                        <div className="dropdown-menu">
                        
                           <>
                               { 
                                props.theResolutions.map((res) => (
                                    <span>
                                        <OverlayTrigger
                                            key='top'
                                            placement='top'
                                            overlay={
                                                <Tooltip key={res.toString()} id={`tooltip-${res}`}>
                                                    <strong>{getTitle(res)}</strong>
                                                </Tooltip>
                                            }
                                            >
                                            <ResSelect key={res.toString()} res={res} selectResolution={selectResolution} /> 
                                        </OverlayTrigger>
                                    </span>
                                    ))
                                
                                }

                                
                                    
                            </>
                        </div>
                    </div>
                </Row>
               <Container className="h-10 d-flex justify-content-center">
                    <h6 id="interval_message">
                        <span>{props.interval_message}</span><br/>
                        <span>The Current Chart Resolution is: {resolution}</span>
                    </h6>      
               </Container> 
            </Container>    
    );
}

function ResSelect(props){
    return <input  type="number" className="dropdown-item" href="#" id={'res_'+ props.res} onClick={props.selectResolution} value={props.res}
                data-toggle="tooltip" data-placement="top"/> 
}

