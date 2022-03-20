import { Bar } from "react-chartjs-2";

export default function BarChart(props){
  alert(JSON.stringify(props.chartData));

  return (
    <div class="container">
      <h1>Test Bar Chart</h1>
      <Bar
        data={props.chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
}