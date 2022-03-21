import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';




function rightArrow(e){    
  
       useEffect(() => {
        if(thePageSetNumber*thePageSize < theNumberOfPages){
                setTheCurrentPage([ theCurrentPages[parseInt(thePageSetNumber)*parseInt(thePageSize)]]);
                setThePageSetNumber([parseInt(thePageSetNumber) + 1 ]);
            }
       });
}

function leftArrow(e){

    useEffect(() => {
        if(thePageSetNumber > 1){
            setTheCurrentPage([ theCurrentPages[parseInt(thePageSetNumber)*parseInt(thePageSize)]]);
            setThePageSetNumber([parseInt(thePageSetNumber) - 1 ]);
        }
     
    });
 
  
}


function setPages(pageSize,numPages,theVotes){
    let currentPages = [];
    let pagingArray = [];

    for(var i = 0;i < parseInt(numPages);i++){
        currentPages[i]= theVotes.slice(i*parseInt(pageSize),( i*parseInt(pageSize)+parseInt(pageSize) ) );
        pagingArray[i] = [];
        
          for(var j = i*parseInt(pageSize)+1; j < (i*parseInt(pageSize)+parseInt(pageSize)); j++ ){   
                pagingArray[i].push(j); 
                
          }       
      }
  
  let pArray = pagingArray.map((page,index1) => {
       return page.map((row, index2) => {          
              return row; 
       });
   })
   
  pagingArray = pArray;  

    
  if(theVotes.length > parseInt(numPages)*parseInt(pageSize)){
        currentPages[parseInt(numPages)] = theVotes.slice(parseInt(numPages)*parseInt(pageSize),theVotes.length);
        
    }

    let result = {
        "currentPages": currentPages,
        "pagingArray": pagingArray
    }
    return result;
}






export default function VotesPager(props){

    let the_Votes = props.theVotes;    
    let pageSize = props.pageSize;
   
    const [theVotes, setTheVotes] = useState(the_Votes);
    let numPages = Math.ceil(theVotes.length/pageSize);
    let result = setPages(pageSize,numPages,theVotes);

    const [theCurrentPage, setTheCurrentPage] = useState([]);
    const [theCurrentPages, setTheCurrentPages] = useState(result.currentPages);
    const [pageNo, setPageNo]= useState([]);
    const [thePageSetNumber, setThePageSetNumber] = useState(1);
    const [thePagingArray, setThePagingArray] = useState(result.pagingArray);
    const [theNumberOfPages, setTheNumberOfPages] = useState(numPages);
    const [thePageSize, setThePageSize] = useState(pageSize); 
    const [activePoint, _setActivePoint] = React.useState(null);

        
    // define a ref
    const activePointRef = React.useRef(activePoint);

    // in place of original `setActivePoint`
    const setActivePoint = x => {
        activePointRef.current = x; // keep updated
        _setActivePoint(x);
    };

    const handleResize = () => {
        // now when reading `activePointRef.current` you'll
        // have access to the current state
        alert(JSON.stringify(activePointRef.current));
    };
      
    const handlePage = (e) => {    
        let pageNum = e.target.value;       
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','grey');
         
    
        let result = setPages(thePageSize,theNumberOfPages,theVotes);
        setTheCurrentPages(result.currentPages);
    
        if(theCurrentPages[parseInt(pageNum) - 1] != null){
                    setTheCurrentPage([theCurrentPages[parseInt(pageNum) - 1]]);
                    setPageNo(pageNum);
            }          
       
       
    };
 

    return(
        <div class="container">
            <input type="button" value="<" onClick={leftArrow}/>
            
            {  
              
                    thePagingArray[thePageSetNumber-1].map((num) => (      
                        <span>
                        { theCurrentPage[parseInt(num) - 1] !== undefined  && <input type="button" class="page" id={`page-${num}`} value={num} onClick={handlePage}/> }
                        </span>
                    ))
              
            }
            <input type="button" value=">" onClick={rightArrow}/>  
        </div>
    );
}