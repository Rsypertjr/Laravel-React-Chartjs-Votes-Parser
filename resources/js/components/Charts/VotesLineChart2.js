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
  


export default function VotesLineChart2(props) {
    
    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');
        
        
        $('.viewerClose').on('click', function(){
            $('.chart-viewer').css('margin-top','0').css('transition','opacity 100s ease-in-out').css('z-index','1').css('border-style','none');
            $('.viewerClose').css('display','none');
        });

        let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.pageNo;
        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        //alert(JSON.stringify(chartData));
        let date_headers =    chartData.dateHeadersStore.map((item) => item);
        let datedata_biden = chartData.dateDataBidenStore.map((item) => item);
        let datedata_trump = chartData.dateDataTrumpStore.map((item) => item);
        let datedata_other = chartData.dateDataOtherStore.map((item) => item);
        let datasets = [];   
        let labels = date_headers[selected_index];

        var data1= {};
        data1.label = "Biden Votes";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        datedata_biden[selected_index].map((data) => {               
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Votes";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        datedata_trump[selected_index].map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

        
        var data3 = {}; 
        data3.label = "Other Votes";
        data3.backgroundColor = bgColors[2];
        data3.borderColor = bgColors[2];          
        data3.data = [];
        
        datedata_other[selected_index].map((data) => {
            data3.data.push(data);
        });
        let dataset3 = data3;

        datasets = [dataset1, dataset2, dataset3]
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
        <div class="chart-viewer">
            <span class="viewerClose">X</span>            
            <div class="container h-10 d-flex justify-content-center">
                <h3>Votes Line Chart</h3>
            </div>
            <div class="container smaller justify-content-center">
                <div><canvas id="myChart"></canvas></div>
            </div> 
            <div class="container h-100 d-flex justify-content-center">
                <VotesPager {...props} pageClick={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </div>   
        </div>

    );

}
