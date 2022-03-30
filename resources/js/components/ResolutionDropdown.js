import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

export default function ResolutionDropdown(props){ 
    const[resolution, setResolution ] = useState();
   
    const selectResolution = (e) => {           
        props.selectResolution(e.target.value); 
    }
    useEffect(() => {
        
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
                            { props.theResolutions.map((res) => 
                               <input type="input" class="dropdown-item" href="#" id={'res_'+res} onClick={selectResolution} value={res}/>
                            )}
                         
                        </div>
                    </div>
                </div>
                <div class="container h-10 d-flex justify-content-center">
                    <h6 id="interval_message"></h6>
                </div>
            </div>    
    );



}