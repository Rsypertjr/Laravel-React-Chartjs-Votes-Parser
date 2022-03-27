import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import ChartPager from '../ChartPager';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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
  

  const dataLoad = {
    dateHeadersStore: [],
    dateDataBidenStore: [],
    dateDataBidenAddStore: [],
    dateDataBidenAddDiffStore: [],
    dateDataTrumpStore: [],
    dateDataTrumpAddStore: [],
    dateDataTrumpAddDiffStore: [],
    dateDataTotalStore: [],
    dateDataOtherStore: [],
    dateDataOtherAddStore: [],
    dateDataTotalAddStore: [],
    perRemainingTrumpStore: [],
    perRemainingBidenStore: [],
    bidenSlices: [],
    trumpSlices: [],
    otherSlices: [],
    totalSlices: [],
    pieHeaders: [],
    voteBins: [],
    bin_headers: [],
    bin_biden: [],
    bin_trump: []
  };

export default function DiffLineChart(props) {
    
    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');

        $('.viewerClose').on('click', function(){
            $('.chart-viewer').css('margin-top','0').css('transition','opacity 100s ease-in-out').css('z-index','1').css('border-style','none');
            $('.viewerClose').css('display','none');
        });
 

       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.pageNo;

        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        let date_headers =    chartData.dateHeadersStore.map((item) => item);
        let datedata_biden_diff_add = chartData.dateDataBidenAddDiffStore.map((item) => item);
        let datedata_trump_diff_add = chartData.dateDataTrumpAddDiffStore.map((item) => item);
        let datasets = [];   
        let labels = date_headers[selected_index];

        var data1= {};
        data1.label = "Biden Gain/Loss";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        datedata_biden_diff_add[selected_index].map((data) => {               
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Gain/Loss";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        datedata_trump_diff_add[selected_index].map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

       

        datasets = [dataset1, dataset2]
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
      const selectResolution = (e) => {    
               props.selectResolution(e.target.value);        
        }
    
    



    return (      
        <div class="chart-viewer">
            <span class="viewerClose">X</span>         
            <div class="container">
                <div class="row justify-content-start">
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Chart Resolution
                        </button>
                        <div class="dropdown-menu">
                            { props.theResolutions.map((res) => 
                               <input type="input" class="dropdown-item" href="#" id={res} onClick={selectResolution} value={res}/>
                            )}
                         
                        </div>
                    </div>
                </div>
            </div>    
               
            <div class="container h-10 d-flex justify-content-center">
                <h4>Incremental Gain/Loss of Votes</h4>
            </div>
            <div class="container smaller justify-content-center">
                <div><canvas id="myChart"></canvas></div>
            </div> 
            <div class="container h-100 d-flex justify-content-center">
                <ChartPager {...props} getPageNumber={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </div> 
        </div>
    );

}
