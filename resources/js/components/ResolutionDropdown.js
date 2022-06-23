import {React, useEffect, useState, useCallback} from 'react';
import { OverlayTrigger, Tooltip, input,Container, Row, Button } from 'react-bootstrap';

export default function ResolutionDropdown(props){ 
    const[resolution, setResolution ] = useState(props.parse_resolution);
    const[title, setTitle ] = useState('');
   
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
            <>
                <Container className="h-10 d-flex justify-content-end">
                   
                        <div class="w-45 btn-group dropright">
                            <Button variant="warning" className="dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Chart Resolution (X Times)
                            </Button>
                            <div class="dropdown-menu">
                            
                            <>
                                { props.theResolutions.map((res) => (
                                        <OverlayTrigger
                                            key='top'
                                            placement='top'
                                            overlay={
                                                <Tooltip id={`tooltip-${res}`}>
                                                    <strong>{getTitle(res)}</strong>
                                                </Tooltip>
                                            }
                                            >
                                            <input type="input" class="dropdown-item" href="#" id={'res_'+res} onClick={selectResolution} value={res}
                                                    data-toggle="tooltip" data-placement="top" title={title}/> 
                                        </OverlayTrigger>
                                    ))}
                                </>
                            </div>
                        </div>
                </Container>
                
               <Container>
                    <div class="w-75 p-3 pb-4 mt-1 mb-2 ml-5" id="interval_message">
                        <span>{props.interval_message}</span><br/>
                        <span>The Current Chart Resolution is: {resolution}</span>
                    </div>      
               </Container> 
            </>    
    );



}