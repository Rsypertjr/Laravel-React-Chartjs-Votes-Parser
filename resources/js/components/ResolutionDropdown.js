import {React, useEffect} from 'react';
import ReactDOM from 'react-dom';

export default function ResolutionDropdown(props){ 
    const selectResolution = (e) => {    
        props.selectResolution(e.target.value);        
    }

    return(
            <div class="container">
                <div class="row justify-content-start">
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution
                        </button>
                        <div class="dropdown-menu">
                            { props.theResolutions.map((res) => 
                               <input type="input" class="dropdown-item" href="#" id={res} onClick={selectResolution} value={res}/>
                            )}
                         
                        </div>
                    </div>
                </div>
            </div>    
    );



}