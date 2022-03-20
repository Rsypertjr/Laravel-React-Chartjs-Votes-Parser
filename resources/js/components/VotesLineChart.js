// resources/js/components/VotesLineChart.js

import React from 'react';
import ReactDOM from 'react-dom';

export default function VotesLineChart(props) {


 
    this.loadData(votes,parse_interval);
    this.date_headers = this.dateheaders_store[selected_index];
    this.datedata_biden = this.datedatabiden_store[selected_index];
    this.datedata_trump = this.datedatatrump_store[selected_index];
    this.datedata_other = this.datedataother_store[selected_index];
        
    let context = this.votesLineCanvas.nativeElement.getContext('2d');
    // Global Options:
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 12;

    var data = {
      labels: this.date_headers,
      datasets: [{
          label: "Trump Votes",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(167,105,0,0.4)",
          borderColor: "rgb(167, 105, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "black",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "brown",
          pointHoverBorderColor: "yellow",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: false
          data: this.datedata_trump,
          spanGaps: false,
          },{
          label: "Biden Votes",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "red", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "yellow",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: true
          data: this.datedata_biden,
          spanGaps: true,
          }, {
          label: "Other Votes",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(86,105,0,0.4)",
          borderColor: "rgb(86, 105, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "black",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "brown",
          pointHoverBorderColor: "yellow",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: false
          data: this.datedata_other,
          spanGaps: false,
        }

      ]
    };

    // Notice the scaleLabel at the same level as Ticks
    var options = {
        responsive:true,
        scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        },                   
                        scaleLabel: {
                            display: true,
                            labelString: 'Vote Totals',
                            fontSize: 20 
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]        
                } ,
                
    };

    if(this.myLineChart){
        this.myLineChart.destroy();
    }
    // Chart declaration:
    this.myLineChart = new Chart(context, {
        type: 'line',
        data: data,
        options: options
        });













        return (

            <div id="charts"  class="container-fluid vertical-scrollable">
                <h2 class="text-center">Use the Table Paging buttons Above, to Advance Charts Below.  Click a Page Number Twice to Change Chart.</h2>
                <div class="row"  placement="top" ngbTooltip="Scroll through several charts below!">
                    <div id="flinec" class="col-sm-12">
                        <h3 class="text-center">Total Votes</h3>
                        <canvas #votesLineChart id="lineChart" class="achart"></canvas>
                    </div>
                </div>
            </div>
        );

}