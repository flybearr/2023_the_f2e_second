import Chart from "react-apexcharts";
import "../styles/components/pieChart.scss";
export default function PieChart() {
  const chartState = {
    series: [14300940, 163631],

    options: {
      labels: [`有效票數`, `無效票數`],
      dataLabels: {
        style: {
          fontSize: "20px",
        },
      },
      colors: ["#635692", " #4E4376"],
      legend: {
        show: false,
      },
      chart: {
        width: "100%",
        type: "pie",
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        enabledOnSeries: true,
      },
    },
  };
  return (
    <div className="pieChart-wrap">
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="pie"
      />
      <div className="pieChart-text-wrap">
        <ul>
          <li>投票率</li>
          <li>投票數</li>
          <li>有效票數</li>
          <li>無效票數</li>
        </ul>
        <ul>
          <li>98%</li>
          <li>14,464,571</li>
          <li>14300940</li>
          <li>163631</li>
        </ul>
      </div>
    </div>
  );
}
