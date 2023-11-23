import { useCallback } from "react";
import Chart from "react-apexcharts";
import { useVoteContext } from "../context/voteContext";
import "../styles/components/barChart.scss";
export default function BarChart() {
  const { voteData } = useVoteContext();
  const renderData = voteData;
  const barData = {
    label: [],
    chartData: [
      { name: "星際和平黨", data: [], color: "#B4A073" },
      { name: "未來前進黨", data: [], color: "#E756B8" },
      { name: "新世代改革黨", data: [], color: "#08C0BE" },
    ],
    color: ["#B4A073", "#E756B8", "#08C0BE"],
  };
  renderData?.forEach((v) => {
    barData.chartData[0].data.push(
      parseInt(v?.candidate_1.replace(",", ""), 10)
    );
    barData.chartData[1].data.push(
      parseInt(v?.candidate_2.replace(",", ""), 10)
    );
    barData.chartData[2].data.push(
      parseInt(v?.candidate_3.replace(",", ""), 10)
    );
    barData.label.push(v.city_name);
  });
  console.log(barData);
  const state = {
    series: [...barData.chartData],
    options: {
      chart: {
        type: "bar",
        height: 100,
        toolbar: {
          show: false, // 關閉圖表工具欄
        },
      },
      colors: [...barData.color],
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
        categories: [...barData.label],
        labels: {
          style: {
            colors: "#FFFFFF",
          },
        },
        axisBorder: {
          color: "#FFFFFF",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF",
          },
        },
        axisBorder: {
          show: true,
          color: "#FFFFFF",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return (
    <div className="barChart-wrap">
      <div className="chart-wrap">
        <Chart
          width={1300}
          height={350}
          options={state.options}
          series={state.series}
          type="bar"
        />
      </div>

      <div className="bbarData"></div>
    </div>
  );
}
