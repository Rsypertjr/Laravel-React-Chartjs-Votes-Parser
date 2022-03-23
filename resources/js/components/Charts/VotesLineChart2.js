import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
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
  


export default function VoteLineChart2(props) {
    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.selected_index;
        alert(selected_index);
        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartsData =   props.getChartsData(props.theVotes);
        alert(JSON.stringify(chartsData));
        let date_headers =    chartsData.dateHeadersStore.map((item) => item);
        let datedata_biden = chartsData.dateDataBidenStore.map((item) => item);
        let datedata_trump = chartsData.dateDataTrumpStore.map((item) => item);
        let datedata_other = chartsData.dateDataOtherStore.map((item) => item);
        let datasets = [];   
        let labels = date_headers[selected_index];

        
        if(type == 'line'){

            while(typeof(datedata_biden[selected_index]) === undefined)
                selected_index--;

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
            
            datedata_other[selected_index-1].map((data) => {
                data3.data.push(data);
            });
            let dataset3 = data3;

            datasets = [dataset1, dataset2, dataset3]
            //alert(JSON.stringify(datasets));

        }
    
        
        const myChart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: datasets
            }
        }).update();



      }, []);
   
    return (
        <div class="container-sm smaller">
            <canvas id="myChart"></canvas>
            <VotesPager handlePage={props.handlePage} leftArrow={props.leftArrow} rightArrow={props.rightArrow}
                        thePagingArray={props.thePagingArray} thePageSetNumber={props.thePageSetNumber} theCurrentPages={props.theCurrentPages}/>  
                    
        </div>
    );

}
