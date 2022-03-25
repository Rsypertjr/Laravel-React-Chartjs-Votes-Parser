import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function ChartPager(props){

    const handlePage = (e) => {
        let num = e.target.value;
        let obj = {};
        obj.num = num;
        obj.type = props.type;
        props.getPageNumber(obj);
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','lightgrey');        
     
    }


    

    const leftArrow = (e) => {  
      let num = (parseInt(props.thePageSetNumber) - 1)*(props.thePageSize);
      let obj = {};
      obj.num = num;
      obj.type = props.type;
      props.leftArrow(obj);

    }

    const rightArrow = (e) => {    
         let obj = {};
         let num = parseInt(props.thePageSetNumber)*(props.thePageSize) + 1;
         obj.num = num;
         obj.type = props.type;
         props.rightArrow(obj);
    }


    return(
            <div>
                <input class="page-arrow" type="button" value="<" onClick={leftArrow}/>                
                {  
                
                props.theChartArray[parseInt(props.thePageSetNumber)-1].map((num) => (      
                    //pagingArr.map((num) => (    
                        <span>
                        { (props.chartData.dateHeadersStore[num-1].length > 0 ) &&  <input type="button" class="page" id={`page-${num}`} value={num} onClick={handlePage}/> }
                        </span>
                    ))              
                         
                }                    
                <input class="page-arrow" type="button" value=">" onClick={rightArrow}/> 
            </div>                    
        );
}