import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import VotesPager from '../VotesPager';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
  


export default function SpikesLineChart(props) {
    
    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');

       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.pageNo;
        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        //alert(JSON.stringify(chartData));
        let date_headers =    chartData.dateHeadersStore.map((item) => item);
        let datedata_biden_add = chartData.dateDataBidenAddStore.map((item) => item);
        let datedata_trump_add= chartData.dateDataTrumpAddStore.map((item) => item);
        let datedata_other_add = chartData.dateDataOtherAddStore.map((item) => item);        
        let datedata_total_add = chartData.dateDataTotalAddStore.map((item) => item);
        let datasets = [];   
        let labels = date_headers[selected_index-1];

        var data1= {};
        data1.label = "Biden Spike";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        datedata_biden_add[selected_index-1].map((data) => {               
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Spike";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        datedata_trump_add[selected_index].map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

        
        var data3 = {}; 
        data3.label = "Other Spike";
        data3.backgroundColor = bgColors[2];
        data3.borderColor = bgColors[2];          
        data3.data = [];
        
        datedata_other_add[selected_index].map((data) => {
            data3.data.push(data);
        });
        let dataset3 = data3;

        var data4 = {}; 
        data4.label = "Total Spike";
        data4.backgroundColor = bgColors[3];
        data4.borderColor = bgColors[3];          
        data4.data = [];
        
        datedata_total_add[selected_index].map((data) => {
            data4.data.push(data);
        });
        let dataset4 = data4;

        datasets = [dataset1, dataset2, dataset3, dataset4]
        //alert(JSON.stringify(datasets));

       
        const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                }
            });
       
        return () => {
          myChart.destroy()
        }

      });
   
    return (
        <div class="container-sm smaller">
            <div class="row justify-content-start">
                <div class="col-4"/>
                <div class="col-7">
                    <h4>Votes Spike Line Chart</h4>
                </div>
                <div class="col-1">
                </div>
            </div>
            <canvas id="myChart"></canvas>           
            <VotesPager {...props} pageClick={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
             
        </div>

    );

}
