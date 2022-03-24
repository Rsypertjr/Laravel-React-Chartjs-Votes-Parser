import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function VotesPager(props){
            
    const handlePage = (e) => {
        let pageNum = e.target.value;

        props.getPageNumber(parseInt(pageNum)+1);
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','grey');        
    }


    

  const leftArrow = (e) => {
  
      let num = parseInt(props.thePageSetNumber) - 1;
      props.leftArrow(num);
    }

  const rightArrow = (e) => {    
         let num = parseInt(props.thePageSetNumber) + 1;
          props.rightArrow(num);
    }


    return(
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-3">
                    <input type="button" value="<" onClick={leftArrow}/>
                    
                    {  
                    
                            props.thePagingArray[parseInt(props.thePageSetNumber)-1].map((num) => (      
                            //pagingArr.map((num) => (    
                                <span>
                                { props.theCurrentPages[parseInt(num)] !== undefined  && <input type="button" class="page" id={`page-${num}`} value={num} onClick={handlePage}/> }
                                </span>
                            ))
                    
                    }
                    <input type="button" value=">" onClick={rightArrow}/>  
                </div>
            </div>
           
        </div>
                    
    );
}