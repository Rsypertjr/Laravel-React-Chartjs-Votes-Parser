import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function VotesPager(props){

    //const [ pagingArr, setPagingArr ] = useState(props.setPages(props.thePageSize,props.theNumberOfPages,props.theVotes).pagingArray);
   // const [ pagingArr, setPagingArr ] = useState([]);
    //const [ currPage, setCurrPage] = useState(props.setPages(props.thePageSize,props.theNumberOfPages,props.theVotes).currentPages[props.pageNo-1]);
    //let result = props.setPages(this.props.thePageSize,this.props.theNumberOfPages,this.props.theVotes);
   // setPagingArr(result.pagingArray);   
            
    const handlePage = (e) => {
        let pageNum = e.target.value;
        //alert(pageNum);
        props.pageClick(pageNum);
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNum).css('background-color','grey');

        //let result = props.setPages(props.thePageSize,props.theNumberOfPages,props.theVotes);
       // let the_ = JSON.parse(JSON.stringify(result.currentPages));
        
        //setPagingArr(result.pagingArray);       
        //setCurrPage(result.currentPages[parseInt(pageNum) - 1]);     
        
    }


    

  const leftArrow = (e) => {
    /*
        if(this.state.thePageSetNumber > 1){
            this.setState({          
                theCurrentPage : this.state.theCurrentPages[(parseInt(this.state.thePageSetNumber) - 2)*parseInt(this.state.thePageSize)],                
                thePageSetNumber: parseInt(this.state.thePageSetNumber) - 1 
            });
        }
    */
    }

  const rightArrow = (e) => {    
      /*
            if(this.state.thePageSetNumber*this.state.thePageSize < this.state.theNumberOfPages){
                let pageNo = e.target.value;
                this.setState({     
                    theCurrentPage : this.state.theCurrentPages[parseInt(this.state.thePageSetNumber)*parseInt(this.state.thePageSize)],   
                    thePageSetNumber: parseInt(this.state.thePageSetNumber) + 1         
                });      
            }   

            */
    
    }


    return(
        <div class="container">
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
                    
    );
}