import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function VotesPager(props){
            
    const handlePage = (e) => {
        let pageNum = e.target.value;
        let info = {};
        info.num = pageNum;
        info.type = props.type;

        props.getPageNumber(info);
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','grey');        
    }


    

  const leftArrow = (e) => {
      let info = {};
      info.num = props.thePageSetNumber - 1;
      info.type = props.type; 
      props.leftArrow(info);
    }

  const rightArrow = (e) => {    
     
          let info = {};
          info.num = props.thePageSetNumber + 1;
          info.type = props.type; 
          props.rightArrow(info);
    }


    return(
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-4">
                    <input type="button" value="<" onClick={leftArrow}/>
                    
                    {  
                    
                            props.thePagingArray[props.thePageSetNumber-1].map((num) => (      
                            //pagingArr.map((num) => (    
                                <span>
                                { props.theCurrentPages[parseInt(num) - 1] !== undefined  && <input type="button" class="page" id={`page-${num}`} value={num} onClick={handlePage}/> }
                                </span>
                            ))
                    
                    }
                    <input type="button" value=">" onClick={rightArrow}/>  
                </div>
            </div>
           
        </div>
                    
    );
}