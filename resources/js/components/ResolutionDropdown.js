import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Button, Tooltip, input,Container, Row } from 'react-bootstrap';

export default function ResolutionDropdown(props){ 
    const[resolution, setResolution ] = useState(props.parse_resolution);
    const[isAvail, setIsAvail] = useState(true);
    const[title, setTitle ] = useState('');
    const[chArray, setCHArray] = useState(props.chartData.chartArray);
   
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
                <Row className="justify-content-center">
                    <div className="btn-group w-50 mb-4">
                        <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution (X Times)
                        </button>
                        <div className="dropdown-menu">
                        
                           <>
                               { 
                                props.theResolutions.map((res,j) => (
                                        
                                        <input key={j} type="number" className="dropdown-item" href="#" id={'res_'+res} onClick={selectResolution} value={res}
                                                data-toggle="tooltip" data-placement="top" title={title}/> 
                                    ))
                                
                                }

                                
                                    
                            </>
                        </div>
                    </div>
                </Row>
               <Container className="h-10 d-flex justify-content-center">
                    <h6 id="resolution_message">
                        <span>The Current Chart Resolution is: {resolution}</span>
                    </h6>      
               </Container> 
            </Container>    
    );
}

