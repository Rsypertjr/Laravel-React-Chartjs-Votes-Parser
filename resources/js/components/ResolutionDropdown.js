import {React, useEffect, useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Button, OverlayTrigger, Tooltip, input } from 'react-bootstrap';


function ResolutionOption(props){


    return(
        <input type="input" class="dropdown-item" href="#" id={'res_'+props.res} onMouseEnter={props.checkResolution} onClick={props.selectResolution} value={props.res}
                               data-toggle="tooltip" data-placement="top" title={props.title}/> 
    );


}



export default function ResolutionDropdown(props){ 
    const[resolution, setResolution ] = useState();
    const[isAvail, setIsAvail] = useState(true);
    const[title, setTitle ] = useState('');
   
    const selectResolution = (e) => {           
        props.selectResolution(e.target.value); 
    }

   

    const checkResolution = useCallback((e) => {
      
        try {
            let test = props.getChartsData(e.target.value).dateHeadersStore;
        
            if(test.length > 0 && typeof(test) != "undefined" && test[0] != null)
            {               
               
                setTitle('Available');
                $('[data-toggle="tooltip"]').tooltip();
            }               
        }
       catch(err){
           setTitle('Not Available');
           $('[data-toggle="tooltip"]').tooltip();
       }
    });

    const getTitle = useCallback((res) => {
      
        try {
            let test = props.getChartsData(res).dateHeadersStore;
        
            if(test.length > 0 && typeof(test) != "undefined" && test[0] != null)
            {     
                return "Available";
            }
               
        }
       catch(err){
           return "Not Available";
       }
       
    });

    let titles = [];
    for(var i=0;i<props.theResolutions.length;i++){
        titles[i] = getTitle(props.theResolutions[i]);
    }

    useEffect(() => {        
       
        $('[data-toggle="tooltip"]').tooltip();
        setResolution(props.parse_resolution);
        if(typeof(props.chartData.interval_message) != "undefined")
           $('#interval_message').html(props.chartData.interval_message + "<br>"); 
        if(!$('#interval_message').html().toString().match('The Current Chart') && typeof(resolution) != "undefined" )
           $('#interval_message').append("The Current Chart Resolution is: "+ resolution );       
    });

    return(
            <div class="container">
                <div class="row justify-content-start">
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution (X Times)
                        </button>
                        <div class="dropdown-menu">
                           {/*} { props.theResolutions.map((res) => 
                              <ResolutionOption selectResolution={selectResolution} checkResolution={checkResolution} res={res} title={titles[res]}/>
                           )}*/}
                           <>
                               {/* {['top', 'right', 'bottom', 'left'].map((placement) => ( */}
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
                </div>
               <div class="container h-10 d-flex justify-content-center">
                    <h6 id="interval_message"></h6>
                            </div> 
          
               
            </div>    
    );



}