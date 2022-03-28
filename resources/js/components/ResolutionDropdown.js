import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

export default function ResolutionDropdown(props){ 
   
    const selectResolution = (e) => {    
        props.selectResolution(e.target.value);        
    }

    return(
            <div class="container">
                <div class="row justify-content-start">
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution
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