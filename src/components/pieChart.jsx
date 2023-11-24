import Chart from "react-apexcharts";
import "../styles/components/pieChart.scss";
export default function PieChart() {
  const chartState = {
    series: [9269060, 14464571],
    options: {
      dataLabels: {
        style: {
          fontSize: "20px",
        },
      },
      colors: ["#4E4376", "#635692"],
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
        custom: function ({ seriesIndex, w }) {
          const text = seriesIndex === 0 ? "人沒投票" : "投票";
          return `<div class="custom-tooltip">${w.config.series[seriesIndex]} ${text}</div>`;
        },
      },
      stroke: {
        show: false,
      },
    },
  };
  return (
    <div className="pieChart-wrap">
      <h1 className="pieChart-title">選舉概況</h1>
      <div className="pieChart-bottom-wrap">
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
            <li>60.9%</li>
            <li>14,464,571</li>
            <li>14300940</li>
            <li>163631</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
