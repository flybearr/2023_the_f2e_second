import Chart from "react-apexcharts";
import { useVoteContext } from "../context/voteContext";
// import "../styles/components/barChart2.scss";
export default function BarChart2() {
  const { renderBarData, selOption } = useVoteContext();
  const { barData2 } = renderBarData;
  const barWidth =
    barData2?.label.length * 100 > 400 ? barData2?.label.length * 100 : 600;
  console.log(barWidth);

  const state = {
    series: [...barData2.chartData2],
    options: {
      chart: {
        type: "bar",
        height: 100,
        toolbar: {
          show: false, // 關閉圖表工具欄
        },
      },
      colors: [...barData2.color],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "75%",
          endingShape: "rounded",
          //   color,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [...barData2.label],
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "16px",
          },
        },
        axisBorder: {
          color: "#FFFFFF",
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#fff",
          width: 5,
          offsetX: 50,
          offsetY: 0,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "16px",
            colors: "#FFFFFF",
          },
          formatter: function (value) {
            return `${value}%`;
          },
        },
        axisBorder: {
          show: true,
          color: "#FFFFFF",
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#fff",
          width: 5,
          offsetX: 5,
          offsetY: 0,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return +val + "%";
          },
        },
      },
    },
  };

  return (
    <div className="chart-wrap">
      <Chart
        width={barWidth}
        height={350}
        options={state.options}
        series={state.series}
        type="bar"
      />
    </div>
  );
}
