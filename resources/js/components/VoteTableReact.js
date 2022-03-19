// resources/js/components/TableReact.js

import React from 'react';
import ReactDOM from 'react-dom';




function OuterTable(props){
    const headers = ["Index","Biden %","Biden Votes","Trump %","Trump Votes","Other Votes","Time Stamps","Votes", "Votes Added","Trump Added","Biden Added","% of Remaining Biden","% of Remaining Trump"];
    //const headers = ['X','Y','Z']
    return (
            <div class="container">
                <table class="table table-striped table-bordered table-responsive table-hover table-sm">
                    <thead>
                        <tr>
                            {headers.map(header => (
                                 <th scope="col">{ header }</th>
                             ))}
                    
                        </tr>
                    </thead>
                   {props.children}
                </table>
            </div>
    );
}


 

export default function VoteTableReact(props) {
        return (
            <div>
                <OuterTable>
                    <tbody>
                        {props.theCurrentPage.map(row => 
                            <tr>
                                <td>{ row.id }</td>
                                <td>{ row.bidenj }</td>
                                <td>{ row.biden_votes }</td>
                                <td>{ row.trumpd }</td>
                                <td>{ row.trump_votes }</td>
                                <td>{ row.other_votes }</td>
                                <td>{ row.timestamp }</td>
                                <td>{ row.votes }</td>
                                <td>{ row.total_vote_add }</td>                           
                                <td>{ row.trump_added }</td>        
                                <td>{ row.biden_added }</td>                                             
                                <td>{ row.remaining_percent_biden }</td>    
                                <td>{ row.remaining_percent_trump }</td>
                            </tr>
                        )}                  
                    </tbody>
                </OuterTable>
                <div class="container">
                    <input type="button" value="<" onClick={props.leftArrow}/>
                    
                    {
                        props.thePagingArray[props.thePageNumber-1].map((num) => (      
                            <span>
                             { JSON.stringify(props.theCurrentPages[parseInt(num) - 1]) !== undefined  && <input type="button" class="page" id={`page-${num}`} value={num} onClick={props.handlePage}/> }
                            </span>
                        ))
                    }
                    <input type="button" value=">" onClick={props.rightArrow}/>  
                </div>
              
               
              
            </div>
           
        );
}