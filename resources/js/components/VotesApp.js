import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import AppRouter from './AppRouter';
import styled from "styled-components";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { map, takeRightWhile } from 'lodash';



const NavUnlisted = styled.ul`
  text-decoration: none;
`;

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  fontSize: '0.8em'
};

const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
"Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
"Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
"North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
"Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]; 


export default class VotesApp extends React.Component {
  constructor(props){
      super(props);        
      this.setPages = this.setPages.bind(this);
      this.getVotes = this.getVotes.bind(this);
      this.selectState = this.selectState.bind(this);
      this.getStateData = this.getStateData.bind(this);
      this.getPageNumber = this.getPageNumber.bind(this);
      this.leftArrow = this.leftArrow.bind(this);
      this.rightArrow = this.rightArrow.bind(this);
      this.state = {
          theVotes: [],
          DataisLoaded: false,
          theCurrentPage: [],
          theCurrentPages: [],
          theNumberOfPages: 1,
          thePageSetNumber:1,
          isPageEmpty:false,
          thePagingArray: [],
          thePageSize:0,
          pageNo:1,
          raceId: '',
          raceSlug: '',
          raceUrl:'',
          theState:states[0],
          options: states,
          defaultOption:states[0],
          chartData:{},
          graphType:'table',
          goto_Linechart: false,
          parse_resolution: 10,
          noOfChartPages:0,
          theChartArray:[]
        


      };
      let state = this.state.defaultOption;
      this.getStateData(state);
    
  }


  getPageNumber(obj)
  {     
     let num = obj.num;
     this.setState({
         theCurrentPage:this.state.theCurrentPages[parseInt(num)-1],
         pageNo: num
     });
  
  }

  rightArrow(obj){

      let num = obj.num;
      let type = obj.type;
      let newNum = Math.ceil(parseInt(this.state.thePageSetNumber-1) % this.state.thePageSize)*(this.state.thePageSize) + 1;
      if(type == 'table' && parseInt(num) < this.state.thePagingArray.length){
            this.setState({
                thePageSetNumber:this.state.thePageSetNumber + 1,
                pageNo: newNum
            });
        } 
      else if(type != 'table' && parseInt(num) < this.state.chartData.dateHeadersStore.length){
            this.setState({
                thePageSetNumber:this.state.thePageSetNumber+1,
                pageNo: num
            });
        } 
      else if(type == 'table' && parseInt(num) >= this.state.thePagingArray.length){
         
            let newNum2 = (parseInt(this.state.thePageSetNumber) - 1)*this.state.thePageSize + 1;
            this.setState({
                thePageSetNumber:this.state.thePageSetNumber,
                pageNo: newNum2
            });
        }
     else if(type != 'table' && parseInt(num) >= this.state.chartData.dateHeadersStore.length){
            //let newNum2 = (parseInt(this.state.thePageSetNumber) - 1)*this.state.thePageSize;
            this.setState({
                thePageSetNumber:this.state.thePageSetNumber,
                pageNo: num - this.state.thePageSize
            });
            $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
            $('#page-'+newNum2).css('background-color','lightgrey');            
        }  
  }

  leftArrow(obj){
     
      let num = obj.num;
      let newNum = parseInt(num) -this.state.thePageSize;
      if(newNum > 0){
        this.setState({
            thePageSetNumber:parseInt(this.state.thePageSetNumber) - 1,
            pageNo: parseInt(newNum)
        });
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
            $('#page-'+newNum).css('background-color','lightgrey');             
    }
    else {
        this.setState({
            thePageSetNumber:1,
            pageNo: 1
      });
    }
  }


 getStateData(state){
    //let stateUrl = 'http://'+window.location.host+'/vote-rows/'+ state;
    let stateUrl ='https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/'+ state.toLowerCase().replace(/\-/,'') + '/president.json';
    fetch(stateUrl).then((res) => res.json())
    .then((json) => {

        // Parse Votes
        let theVotes = this.getVotes(json);
        let currentPages = [];
        let pageSize = 10;
        let numPages = Math.ceil(parseInt(theVotes.length)/pageSize);
        let pagingArray = [];
    
        
        let result = this.setPages(pageSize,numPages,theVotes);
        currentPages = JSON.parse(JSON.stringify(result.currentPages));

        pagingArray = JSON.parse(JSON.stringify(result.pagingArray));   
        numPages = Math.ceil(currentPages.length);
        // let chartData = this.getChartsData(theVotes);


       

        this.setState({
          theVotes: theVotes,
          DataisLoaded: true,
          theCurrentPages: currentPages,
          theCurrentPage: currentPages[this.state.pageNo-1],
          theNumberOfPages: numPages,
          thePagingArray: pagingArray,
          thePageSize: pageSize,
          defaultOption: this.state.theState
      });

      
      let chartData = this.getChartsData(theVotes);
      //alert(JSON.stringify(chartData));

      this.setState({
       
        chartData: chartData
    });



    return theVotes;
    
  });



 }

  votesFromServer(state){

      let stateUrl = 'http://'+window.location.host+'/vote-rows/Michigan';
      fetch(stateUrl).then((res) => res.json())
      .then((json) => {

          return json;
      });
          
  }

  getChartsData(vote_rows){
    var vote_bins = [];
    var dateheaders = [];
    var datedatabiden = [];
    var datedatabidenadd = [];
    var datedatabidenadddiff = [];
    var datedatatrump = [];
    var datedatatrumpadd = [];
    var datedatatrumpadddiff = [];
    var datedatatotal = [];
    var datedatatotaladd = [];
    var datedataother = [];
    var datedataotheradd = [];
    var perremainingtrump = [];
    var perremainingbiden = [];

    var dateheaders_store = [];
    var datedatabiden_store = [];
    var datedatabidenadd_store = [];
    var datedatabidenadddiff_store = [];
    var datedatatrump_store = [];
    var datedatatrumpadd_store = [];
    var datedatatrumpadddiff_store = [];
    var datedatatotal_store = [];
    var datedataother_store = [];
    var datedataotheradd_store = [];
    var datedatatotaladd_store = [];
    var perremainingtrump_store = [];
    var perremainingbiden_store = [];

    var totalslices = [];
    var bidenslices = [];
    var trumpslices = [];
    var otherslices = [];
    var pieheaders = [];
    var parse_interval = this.state.parse_resolution;
    for(i=0;i<vote_rows.length;i++){

      
        dateheaders[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.timestamp);
        datedatabiden[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.biden_votes);
        datedatatrump[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.trump_votes);
        datedatabidenadd[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.biden_votes);
        datedatatrumpadd[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.trump_votes);
        datedatabidenadddiff[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.biden_votes);
        datedatatrumpadddiff[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.trump_votes);
        datedataotheradd[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.other_votes);
        datedatatotaladd[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.votes);
        datedatatotal[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.votes);
        datedataother[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.other_votes);
        perremainingtrump[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.remaining_percent_trump);
        perremainingbiden[i] = vote_rows.slice(i*parseInt(parse_interval),( i*parseInt(parse_interval)+parseInt(parse_interval) ) ).map( (item) => item.remaining_percent_biden);

        if(i > 0) {
          datedatabidenadd.push(vote_rows[i].biden_votes-vote_rows[i-1].biden_votes);
          datedatatrumpadd.push(vote_rows[i].trump_votes-vote_rows[i-1].trump_votes);
          datedataotheradd.push(vote_rows[i].other_votes-vote_rows[i-1].other_votes);
          datedatatotaladd.push(vote_rows[i].votes-vote_rows[i-1].votes);
          datedatabidenadddiff.push(vote_rows[i].biden_votes - vote_rows[i-1].biden_votes);
          datedatatrumpadddiff.push(vote_rows[i].trump_votes - vote_rows[i-1].trump_votes);

          
        }
    }
   

    datedatabidenadd_store = datedatabidenadd.map((item) => item != null? item: item.delete());
    datedatatrumpadd_store = datedatatrumpadd.map((item) => item);
    
    datedataotheradd_store = datedataotheradd.map((item) => item);
    datedatatotaladd_store = datedatatotaladd.map((item) => item);
    
    datedatabidenadddiff_store = datedatabidenadddiff.map((item) => item);
    datedatatrumpadddiff_store = datedatatrumpadddiff.map((item) => item);
    dateheaders_store = dateheaders.map((item) => item);
    datedatabiden_store = datedatabiden.map((item) => item);
    datedatatrump_store = datedatatrump.map((item) => item);
    datedatatotal_store = datedatatotal.map((item) => item);
    datedataother_store = datedataother.map((item) => item);
    perremainingtrump_store = perremainingtrump.map((item) => item);
    perremainingbiden_store = perremainingbiden.map((item) => item);            

    // PieChart calculations        
    if(datedatabiden_store != null) {
        for(var i = 0;i < datedatabiden_store.length;i++){
                var total_amt = 0;
                var total_biden = 0;
                var total_trump = 0;
                var total_other = 0;
                for(var j = 0;j < datedatatotal_store[i].length;j++){
                    total_amt += datedatatotal_store[i][j];
                    total_biden += datedatabiden_store[i][j];
                    total_trump += datedatatrump_store[i][j];
                    total_other += datedataother_store[i][j];
                    if(j == 0 ){
                        pieheaders[i] = dateheaders_store[i][j] + " To ";
                    }
                    if(j == dateheaders_store[i].length-1){
                        pieheaders[i] +=  dateheaders_store[i][j];
                    }
                }
                totalslices.push(total_amt);                             
                bidenslices.push(total_biden);                           
                trumpslices.push(total_trump);                               
                otherslices.push(total_other);
            }
    }

   // Trim Out Nulls
     
    dateheaders_store  = dateheaders_store.filter((i) => i.length > 0);
    datedatabiden_store  = datedatabiden_store.filter((i) => i.length > 0);
    datedatabidenadd_store  = datedatabidenadd_store.filter((i) => i.length > 0);
    datedatabidenadddiff_store  = datedatabidenadddiff_store.filter((i) => i.length > 0);
    datedatatrump_store  = datedatatrump_store.filter((i) => i.length > 0);
    datedatatrumpadd_store  = datedatatrumpadd_store.filter((i) => i.length > 0);
    datedatatrumpadddiff_store  = datedatatrumpadddiff_store.filter((i) => i.length > 0);
    datedatatotal_store  = datedatatotal_store.filter((i) => i.length > 0);
    datedataother_store  = datedataother_store.filter((i) => i.length > 0);
    datedatatotaladd_store  = datedatatotaladd_store.filter((i) => i.length > 0);
    datedataotheradd_store  = datedataotheradd_store.filter((i) => i.length > 0);
    perremainingtrump_store  = perremainingtrump_store.filter((i) => i.length > 0);
    perremainingbiden_store  = perremainingbiden_store.filter((i) => i.length > 0);
  

    this.setState({
        noOfChartPages: dateheaders_store.length
    });
    var arr = [];
    for(var i=0;i<this.state.noOfChartPages;i++){
        arr[i]=i;
    }

    var arr2 = [];
    for(var i=0;i<arr.length;i++){
        arr2[i]=[];
        for(var j = i*parseInt(this.state.thePageSize); j <= (i*parseInt(this.state.thePageSize)+parseInt(this.state.thePageSize)-1); j++ ){   
           arr2[i].push(j); 
            
      }       
    }
 

    this.setState({
        theChartArray: arr2
    });



    
    // Fill Votebins

    
    // Set up Vote Bins
    var index = 0;
    var interval = 0;
    let vote_bin = {
        "interval":0,
        "biden_in_bin": 0,
        "trump_in_bin":0,
    };
  
  
   let step = Math.floor(parseInt(200000)/(this.state.noOfChartPages*10));
    //var step = 2500;
    interval = vote_bin.interval;
    while(interval <= 200000){
        vote_bin.interval = interval;
        vote_bin.trump_in_bin = 0;
        vote_bin.biden_in_bin = 0;
        vote_bins[index] = vote_bin;
        index++;
        interval = interval + step;
        
        vote_bin = {
            "interval":0,
            "biden_in_bin": 0,
            "trump_in_bin":0,
        };

    }
   


    // Put in Biden Bins
    for(var j = 0;j<datedatabidenadddiff_store.length;j++){
        var store = datedatabidenadddiff_store[j];
        for(var k=0;k < store.length;k++){
            for(var l = 0;l < vote_bins.length;l++){
                if(l > 0)
                    if(store[k] < vote_bins[l].interval && store[k] >= vote_bins[l-1].interval)
                        vote_bins[l].biden_in_bin++;
            }
        }
    }


    


    // Put in Trump Bins
    for(var j = 0;j<datedatatrumpadddiff_store.length;j++){
        var store = datedatatrumpadddiff_store[j];
        for(var k=0;k < store.length;k++){
            for(var l = 0;l < vote_bins.length;l++){
                if(l > 0)
                    if(store[k] < vote_bins[l].interval && store[k] >= vote_bins[l-1].interval)
                        vote_bins[l].trump_in_bin++;
            }
        }
    }
    var bin_headers = [];
    var bin_biden = [];
    var bin_trump = [];
    // Just for update

    var index = 0;
    for(let i=0;i<vote_bins.length;i++){
            if(i == 0){
                bin_headers[index] = [];
                bin_biden[index] = [];
                bin_trump[index] = [];
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
                
            }
            else if( i % parse_interval != 0 ){
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
            }
            else if(i % this.parse_interval == 0) {
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
                
                index++;     
                bin_headers[index] = [];
                bin_biden[index] = [];
                bin_trump[index] = [];     
            }
            else{
                bin_headers[index].push(vote_bins[i].interval);
                bin_biden[index].push(vote_bins[i].biden_in_bin);
                bin_trump[index].push(vote_bins[i].trump_in_bin);
            }

        }
    
        // Trim Out Zeros
        bidenslices = bidenslices.filter((i) => i != 0);
        trumpslices = trumpslices.filter((i) => i != 0);
        otherslices = otherslices.filter((i) => i != 0);
       totalslices = totalslices.filter((i) => i != 0);
        pieheaders = pieheaders.filter((i) => i != null);
        vote_bins = vote_bins.filter((i) => i != null);
        bin_headers = bin_headers.filter((i) => i != null);
        bin_biden = bin_biden.filter((i) => i != null);
        bin_trump = bin_trump.filter((i) => i != null);
    
    

    let dataLoad = {
      "dateHeadersStore": dateheaders_store,
      "dateDataBidenStore": datedatabiden_store,
      "dateDataBidenAddStore": datedatabidenadd_store,
      "dateDataBidenAddDiffStore": datedatabidenadddiff_store,
      "dateDataTrumpStore": datedatatrump_store,
      "dateDataTrumpAddStore":  datedatatrumpadd_store,
      "dateDataTrumpAddDiffStore": datedatatrumpadddiff_store,
      "dateDataTotalStore": datedatatotal_store,
      "dateDataOtherStore": datedataother_store,
      "dateDataOtherAddStore": datedataotheradd_store,
      "dateDataTotalAddStore": datedatatotaladd_store,
      "perRemainingTrumpStore": perremainingtrump_store,
      "perRemainingBidenStore": perremainingbiden_store,
      "bidenSlices": bidenslices,
      "trumpSlices": trumpslices,
      "otherSlices": otherslices,
      "totalSlices": totalslices,
      "pieHeaders":  pieheaders,
      "voteBins": vote_bins,
      "bin_headers": bin_headers,
      "bin_biden": bin_biden,
      "bin_trump": bin_trump
    }

    return dataLoad;
  }





  setPages(pageSize,numPages,theVotes) {
      let currentPages = [];
      let pagingArray = [];
 
      for(var i = 0;i < parseInt(numPages);i++){
          currentPages[i]= theVotes.slice(i*parseInt(pageSize),( i*parseInt(pageSize)+parseInt(pageSize) ) );
          pagingArray[i] = [];
          
            for(var j = i*parseInt(pageSize); j <= (i*parseInt(pageSize)+parseInt(pageSize)-1); j++ ){   
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

  selectState(e){
    this.getStateData(e.value); 
 
    this.setState({
        theState: e.value,      
        //theCurrentPage: currentPages[ this.state.pageNo-1],
        theVotes:this.state.theVotes,
        pageNo: 1,
        thePageSetNumber:1
      });

        if($('.chart-viewer'))
           $('.chart-viewer').css('transition','opacity 5s ease-in-out').css('transition-delay','2s').css('z-index','10').css('margin-top','-15em').css('border-style','none').css('opacity','0.90');
           
        $('.viewerClose').css('display','block');

    
  }


  getVotes(res){
      let jobj = res;
    
      let timeseries = jobj.data.races[0].timeseries;
      this.setState({
          raceId: jobj.data.races[0].race_id,
          raceSlug: jobj.data.races[0].race_slug,
          raceUrl: jobj.data.races[0].url
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

    var totalnum_votes = pres_votes[pres_votes.length-1].votes;      
    let temp_rows = pres_votes.map(function(vote,index){         
      vote.percent_of_remaining_trump = vote.total_vote_add_trump*100/(totalnum_votes-vote.votes);
      vote.percent_of_remaining_biden = vote.total_vote_add_biden*100/(totalnum_votes-vote.votes);
      return vote;
      });

   
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
    return (
      <div className="wrapper">
        <div class="container-fluid">
            <div class="jumbotron text-center" > 
                <div class="row justify-content-start">
                    <div class="col-3"/>
                    <div class="col-1">
                      <span>Select a State: </span>
                    </div>
                    <div class="col-4">
                      <Dropdown options={this.state.options} onChange={this.selectState} value={this.state.defaultOption} placeholder="Select an option" /> 
                    </div>
                </div>
                <h3>Laravel/React 2020 Presidential Election Parser</h3> 
                <h4>Race Data:</h4>   
                <p>{ this.state.raceId }</p>
                <p>{ this.state.raceSlug }</p>
                <p>{ this.state.raceUrl }</p>
                <p>State: { this.state.theState }</p>
                  
            </div> 
            <AppRouter {...this.state} getPageNumber={this.getPageNumber} rightArrow={this.rightArrow} leftArrow={this.leftArrow} />  
             
        </div>     
    
      </div>
      
      
    );
  }
}


if (document.getElementById('votes-table-react')){
    ReactDOM.render(<VotesApp />, document.getElementById('votes-table-react'));
}