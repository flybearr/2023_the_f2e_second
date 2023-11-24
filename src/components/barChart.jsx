import Chart from "react-apexcharts";
import { useVoteContext } from "../context/voteContext";
import "../styles/components/barChart.scss";
import { useEffect, useState } from "react";
export default function BarChart() {
  const { renderBarData, selOption } = useVoteContext();
  const barWidth =
    renderBarData?.label.length * 100 > 400
      ? renderBarData?.label.length * 100
      : 600;
  console.log(barWidth);
  // console.log(renderBarData);
  // const renderData = voteData;
  // const barData = {
  //   label: [],
  //   chartData: [
  //     { name: "星際和平黨", data: [], color: "#B4A073" },
  //     { name: "未來前進黨", data: [], color: "#E756B8" },
  //     { name: "新世代改革黨", data: [], color: "#08C0BE" },
  //   ],
  //   color: ["#B4A073", "#E756B8", "#08C0BE"],
  // };
  // renderData?.forEach((v) => {
  //   barData.chartData[0].data.push(
  //     parseInt(v?.candidate_1.replace(",", ""), 10)
  //   );
  //   barData.chartData[1].data.push(
  //     parseInt(v?.candidate_2.replace(",", ""), 10)
  //   );
  //   barData.chartData[2].data.push(
  //     parseInt(v?.candidate_3.replace(",", ""), 10)
  //   );
  //   barData.label.push(v.city_name);
  // });
  // console.log(barData);
  const state = {
    series: [...renderBarData.chartData],
    options: {
      subtitle: {
        text: "萬",
        align: "left",
        offsetX: 8,
        offsetY: 5,
        style: {
          fontSize: "16px",
          fontWeight: "normal",
          fontFamily: undefined,
          color: "#fff",
        },
      },
      chart: {
        type: "bar",
        height: 100,
        toolbar: {
          show: false, // 關閉圖表工具欄
        },
      },
      colors: [...renderBarData.color],
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
        categories: [...renderBarData.label],
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "16px",
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
          formatter: function (value) {
            return value / 10000;
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
            return +val + "人投票";
          },
        },
      },
    },
  };

  return (
    <div className="barChart-wrap">
      <h1>各縣市政黨得票數</h1>
      <div className="chart-wrap">
        <Chart
          width={barWidth}
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
