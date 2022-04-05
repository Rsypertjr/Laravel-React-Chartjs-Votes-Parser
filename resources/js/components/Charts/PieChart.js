import {React, useEffect, useState} from 'react';
import ChartPager from '../ChartPager';
import ResolutionDropdown from '../ResolutionDropdown';

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

export default function PieChart(props) {
    const [title,setTitle] = useState('');
    
    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');

        $('.viewerClose').on('click', function(){
            $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
            $('.viewerClose').css('display','none');
            props.resetCharts();
        });
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ props.pageNo).css('background-color','#ffc107');   
     
       // let data = [65, 59, 80, 81, 56, 55, 40];
        //let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.pageNo;

        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        let date_headers =    chartData.dateHeadersStore[selected_index-1];
        //let biden_slices = chartData.bidenSlices.map((item) => item);
        //let trump_slices = chartData.trumpSlices.map((item) => item);
        //let other_slices = chartData.otherSlices.map((item) => item);

        let labels = ["Biden Votes","Trump Votes","Other Votes"];
        let label = "Votes from: " + date_headers[0].replace(/T/g,'@').replace(/Z/g,' ') + " to "+ date_headers[date_headers.length-1].replace(/T/g,'@').replace(/Z/g,' ');
        setTitle(label);
        let biden_slice = chartData.bidenSlices[selected_index-1];
        let trump_slice = chartData.trumpSlices[selected_index-1];
        let other_slice = chartData.otherSlices[selected_index-1];
        let datasets = [
          {
            label:label,
            data:[biden_slice,trump_slice,other_slice],
            backgroundColor:[bgColors[0],bgColors[1],bgColors[2]],
            borderColor:[bgColors[0],bgColors[1],bgColors[2]], 
            borderWidth:1,
          }
        ];   
        //let labels = date_headers[selected_index-1];

        //var data1= {};
        //data1.label = "Biden Votes";
        //data1.backgroundColor = bgColors[0];
        //data1.borderColor = bgColors[0];
        //data1.data = [];

        //let dataset = [biden_slice,trump_slice,other_slice]
        
        //biden_slices[selected_index-1].map((dat) => {       
       /* biden_slices.map((dat) => {               
            data1.data.push(dat);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Votes";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        //trump_slices[selected_index-1].map((data) => {       
        trump_slices.map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

        var data3 = {};
        data3.label = "Other Votes";
        data3.backgroundColor = bgColors[2];
        data3.borderColor = bgColors[2];
        data3.data = [];
        //other_slices[selected_index-1].map((data) => {           
        other_slices.map((data) => {           
            data2.data.push(data);
        });
        let dataset3 = data3;
        //alert(JSON.stringify(dataset3));

       

        datasets = [dataset1, dataset2, dataset3]
        */
        //alert(JSON.stringify(datasets));

       
        const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                  responsive:false,
                }
               
            });
       
        return () => {
          myChart.destroy()
        }

      });
   
    



    return (      
        <div class="chart-viewer">
            <div class="container h-10 d-flex justify-content-center">
                <h6>Votes Pie Chart</h6>
            </div>
            <span class="viewerClose">Close Chart</span>         
            <ResolutionDropdown {...props} theResolutions={props.theResolutions} selectResolution={props.selectResolution}/> 
            <div class="container h-10 d-flex justify-content-center">
                <h4>{title}</h4>
            </div>
            <div class="container justify-content-center">
                <div><canvas id="myChart" class="pie-chart" width="400px" height="400px" left="300px"></canvas></div>
            </div> 
            <div class="container h-100 d-flex justify-content-center pie-pager">
                <ChartPager {...props} getPageNumber={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </div> 
        </div>
    );

}
