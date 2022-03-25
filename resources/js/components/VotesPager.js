import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function VotesPager(props){
          
    const handlePage = (e) => {
        let pageNum = e.target.value;

        props.getPageNumber(parseInt(pageNum));
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','lightgrey');        
    }


    

  const leftArrow = (e) => {
  
     let num = (parseInt(props.thePageSetNumber) - 1)*(props.thePageSize);
      props.leftArrow(num);
    }

  const rightArrow = (e) => {    
         let num = parseInt(props.thePageSetNumber)*(props.thePageSize);
         props.rightArrow(num);
    }


    return(
            <div>
                <input class="page-arrow" type="button" value="<" onClick={leftArrow}/>                
                {                      
                    props.thePagingArray[parseInt(props.thePageSetNumber)-1].map((num) => (      
                    //pagingArr.map((num) => (    
                        <span>
                        { props.theCurrentPages[parseInt(num)] !== undefined  && <input type="button" class="page" id={`page-${num+1}`} value={num+1} onClick={handlePage}/> }
                        </span>
                    ))                    
                }                    
                <input class="page-arrow" type="button" value=">" onClick={rightArrow}/> 
            </div>                    
        );
}