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


function PageButton(props){

    return (
            <button>{ props.num }</button>
    );
}

export default class VoteTableReact extends React.Component {
    constructor(props){
        super(props);        
        this.handlePage = this.handlePage.bind(this);
        this.setPages = this.setPages.bind(this);
        this.leftArrow = this.leftArrow.bind(this);        
        this.rightArrow = this.rightArrow.bind(this);
        this.getVotes = this.getVotes.bind(this);

        this.state = {
            theVotes: [],
            DataisLoaded: false,
            theCurrentPage: [],
            theCurrentPages: [],
            theNumberOfPages: 0,
            thePageNumber:1,
            thePagingArray: [],
            thePageSize:0,
            theStartPage:0,
            raceId: '',
            raceSlug: '',
            raceUrl:''

        };

        let state = 'Michigan';
        //let stateUrl = 'http://'+window.location.host+'/vote-rows/'+ state;
        let stateUrl ='https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/'+ state.toLowerCase().replace(/\-/,'') + '/president.json';
        fetch(stateUrl).then((res) => res.json())
        .then((json) => {

            //alert(JSON.stringify(json));
            let theVotes = this.getVotes(json);

            let currentPages = [];
            let pageSize = 10;
            let numPages = theVotes.length/pageSize;
            let pageNo = 1;
            let pagingArray = [];
        
            let result = this.setPages(0,pageSize,numPages,theVotes);
            currentPages = JSON.parse(JSON.stringify(result.currentPages));

            pagingArray = JSON.parse(JSON.stringify(result.pagingArray));            
            numPages = currentPages.length;

            this.setState({
                theVotes: theVotes,
                DataisLoaded: true,
                theCurrentPages: currentPages,
                theCurrentPage: currentPages[pageNo-1],
                theNumberOfPages: numPages,
                thePageNumber: pageNo,
                thePagingArray: pagingArray,
                thePageSize: pageSize
                
            });
        });


    }

    votesFromServer(state){

        let stateUrl = 'http://'+window.location.host+'/vote-rows/Michigan';
        fetch(stateUrl).then((res) => res.json())
        .then((json) => {

            return json;
        });
            
    }

    leftArrow(e){
       
        if(this.state.thePageNumber > 1){
            this.setState({          
                theCurrentPage : this.state.theCurrentPages[(parseInt(this.state.thePageNumber) - 2)*parseInt(this.state.thePageSize)],                
                thePageNumber: parseInt(this.state.thePageNumber) - 1 
            });
        }
     
    }

    rightArrow(e){    
        if(this.state.thePageNumber*this.state.thePageSize < this.state.theNumberOfPages){
            let pageNo = e.target.value;
            this.setState({     
                theCurrentPage : this.state.theCurrentPages[parseInt(this.state.thePageNumber)*parseInt(this.state.thePageSize)],   
                thePageNumber: parseInt(this.state.thePageNumber) + 1         
            });      
        }   
        
    }



    handlePage(e){
      
        let pageNo = e.target.value;
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNo).css('background-color','grey');

        if(this.state.theCurrentPages[parseInt(pageNo) - 1] != null){
            this.setState({
                theCurrentPage : this.state.theCurrentPages[parseInt(pageNo) - 1]
            });
            
        }       
     
    }

    setPages(start,pageSize,numPages,theVotes) {
        let currentPages = [];
        let pagingArray = [];
   
        for(var i = 0;i < parseInt(numPages);i++){
            currentPages[i]= theVotes.slice(i*parseInt(pageSize),( i*parseInt(pageSize)+parseInt(pageSize) ) );
            pagingArray[i] = [];
            for(var j = i*parseInt(pageSize)+1; j <= (i*parseInt(pageSize)+parseInt(pageSize)); j++ ){    
                pagingArray[i].push(j);    
                  
            }       
        }
             

        if(theVotes.length > parseInt(numPages)*parseInt(pageSize)){
            currentPages[parseInt(numPages)] = theVotes.slice(parseInt(numPages)*parseInt(pageSize),theVotes.length);
        }

        let result = {
            "currentPages": currentPages,
            "pagingArray": pagingArray
        }
        return result;
    }



    getVotes(res){
        let jobj = res;
      
        let timeseries = jobj.data.races[0].timeseries;
        this.setState({
            raceId: jobj.data.races[0].race_id,
            raceSlug: jobj.data.races[0].race_slug,
            raceData: jobj.data.races[0].url
        });
       
       
              
        // Parse Votes for Master Table
        var total_trump_increase = 0;
        function calc_votes(votes,index){
            let per_adj = votes.vote_shares.bidenj+votes.vote_shares.trumpd;
            let biden = votes.vote_shares.bidenj*votes.votes;
            
            let vote_row = {      
            "index": index,
            "votes": votes.votes,
            "timestamp": votes.timestamp,
            "bidenj": votes.vote_shares.bidenj,
            "biden_votes":0,
            "trumpd": votes.vote_shares.trumpd,
            "trump_votes":0,
            "other_votes":0,
            "total_vote_add":0,
            "total_vote_add_trump":0,
            "total_vote_add_biden":0,
            "total_vote_add_other":0,
            "total_vote_add_total":0,
            "percent_of_remaining_trump":0,
            "percent_of_remaining_biden":0,
            "time":votes.timestamp
            };
                                
            return vote_row;
        }
      
      
        let presVotes = timeseries.map(calc_votes);
        let thePresVotes = presVotes;      
        var pres_votes = thePresVotes;
        
        pres_votes = pres_votes.map(function(votes,index){
          if(index == 0){
              votes.biden_votes = votes.bidenj*votes.votes;
              votes.trump_votes = votes.trumpd*votes.votes;
              votes.total_vote_add = votes.votes;
              votes.total_vote_add_trump = votes.votes * votes.trumpd;
              votes.total_vote_add_biden = votes.votes * votes.bidenj;
              votes.total_vote_add_other = votes.votes - (votes.votes * votes.trumpd + votes.votes * votes.bidenj);
              votes.other_votes = (1-votes.bidenj-votes.trumpd)*votes.votes;
          }
          else if(index > 0){          
              
              if(votes.votes == 0)
                  votes.total_vote_add = 0;
              else 
                  votes.total_vote_add = pres_votes[index].votes - pres_votes[index-1].votes;      
      
              if(votes.bidenj == 0)
                  votes.biden_votes = 0;
                  votes.biden_votes = votes.bidenj*votes.votes;
              
              if(votes.trumpd == 0)
                  votes.trump_votes = 0;
            
              votes.trump_votes = votes.trumpd*votes.votes;
      
              votes.other_votes = votes.votes - votes.biden_votes - votes.trump_votes;
              votes.total_vote_add_trump = votes.votes*votes.trumpd - pres_votes[index-1].votes*pres_votes[index-1].trumpd;
              votes.total_vote_add_biden = votes.votes*votes.bidenj - pres_votes[index-1].votes*pres_votes[index-1].bidenj;
              votes.total_vote_add_other = (1-votes.bidenj-votes.trumpd)*votes.votes - pres_votes[index-1].votes*(1 - pres_votes[index-1].bidenj - pres_votes[index-1].trumpd);
              votes.total_vote_add_total = pres_votes[index].votes - pres_votes[index-1].votes;
          }
          return votes;
      });

      let temp_rows = pres_votes.map(function(vote,index){         
        vote.percent_of_remaining_trump = vote.total_vote_add_trump*100/(totalnum_votes-vote.votes);
        vote.percent_of_remaining_biden = vote.total_vote_add_biden*100/(totalnum_votes-vote.votes);
        return vote;
    });

      var totalnum_votes = pres_votes[pres_votes.length-1].votes;      
      let vote_rows = temp_rows.map(function(vote,index){
          return {"id":index,"bidenj":vote.bidenj,"biden_votes":vote.biden_votes,"trumpd":vote.trumpd,"trump_votes":vote.trump_votes,"other_votes":vote.other_votes,"timestamp":vote.timestamp,"votes":vote.votes,"total_vote_add":vote.total_vote_add,"trump_added":vote.total_vote_add_trump,
              "biden_added":vote.total_vote_add_biden, "remaining_percent_trump":vote.percent_of_remaining_trump,"remaining_percent_biden": vote.percent_of_remaining_biden};
      });
      return vote_rows;
      
      }  
      


    



    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {      
      
    }

  
    
    render() {
        const { DataisLoaded, theVotes } = this.state;
        
        if (!DataisLoaded) {
           
            return <div><h1> Please wait some time.... </h1></div> ;      
        }
     
        
       
        return (
            <div>
                <OuterTable>
                    <tbody>
                        {this.state.theCurrentPage.map(row => 
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
                                <td>{ row.total_vote_add_trump }</td>        
                                <td>{ row.total_vote_add_biden }</td>                                             
                                <td>{ row.percent_of_remaining_biden }</td>    
                                <td>{ row.percent_of_remaining_trump }</td>
                            </tr>
                        )}                  
                    </tbody>
                </OuterTable>
                <div class="container">
                    <input type="button" value="<" onClick={this.leftArrow}/>
                    {
                    this.state.thePagingArray[this.state.thePageNumber-1].map(num => (
                            <input type="button" class="page" id={"page-"+num} value={num} onClick={this.handlePage}/>             
                        ))
                    }   
                    <input type="button" value=">" onClick={this.rightArrow}/>  
                </div>
              
               
              
            </div>
           
        );
    }
}