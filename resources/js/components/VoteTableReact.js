// resources/js/components/TableReact.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ChartPager from './ChartPager';


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


export default function VoteTableReact(props)  {
             
        useEffect(() => {
            $('.viewerClose').on('click', function(){
                $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
                $('.viewerClose').css('display','none');
                props.resetCharts();
            });
            $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
            $('#page-'+ props.pageNo).css('background-color','#ffc107');   
     
        });

        return (          
        <div class="chart-viewer">
            <span class="viewerClose"><font color="cyan">Close Chart</font></span>            
            <div class="container h-10 d-flex justify-content-center">
                <h4>2020 Presidential Election Votes</h4>
            </div>
            <div class="container smaller justify-content-center">
                <OuterTable>
                    <tbody>
                        { props.theCurrentPages[props.pageNo-1].map(row => 
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
            </div> 
            <div class="container h-100 d-flex justify-content-center">
                <ChartPager {...props} pageClick={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </div> 
        </div>        
        );
}