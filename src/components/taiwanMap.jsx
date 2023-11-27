import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { select } from "d3";
import { judeNum } from "../utils";
import "../styles/components/taiwanMap.scss";
import { useVoteContext } from "../context/voteContext";
import { func } from "prop-types";
export default function TaiwanMap() {
  const { winnerArray, selOption } = useVoteContext();
  // const winnerArray = voteData.map((v, i) => {
  //   const newVoteArray = [
  //     {
  //       name: "星際和平黨",
  //       value: judeNum(v?.candidate_1),
  //       color: "#AD8427",
  //     },
  //     {
  //       name: "未來前進黨",
  //       value: judeNum(v?.candidate_2),
  //       color: "#E756B8",
  //     },
  //     {
  //       name: "新世代改革黨",
  //       value: judeNum(v?.candidate_3),
  //       color: "#08C0BE",
  //     },
  //   ].sort((a, b) => b.value - a.value);

  //   return {
  //     city: v.city_name,
  //     value: newVoteArray[0].value,
  //     winner: newVoteArray[0].name,
  //     color: newVoteArray[0].color,
  //   };
  // });
  console.log(winnerArray);
  const svg = useRef(null);

  useEffect(() => {
    const svgEle = select(svg.current);
    let width = window.innerWidth * 0.23;
    let height = window.innerHeight * 0.9;
    let projection;
    let geoGenerator;

    // 放大
    // const zoom = d3
    //   .zoom()
    //   .scaleExtent([1, 8]) // 設定最小及最大縮放倍率
    //   .on("zoom", handleZoom);

    d3.json(
      "https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/taiwan.geojson"
    ).then(function (data) {
      projection = d3.geoMercator().fitExtent(
        [
          [0, 0],
          [width, height],
        ],
        data
      );
      // .scale(400) //scale：設定地圖縮放倍率
      // .translate([width / 4, height / 1.5]);

      geoGenerator = d3.geoPath().projection(projection);

      // Draw the map
      svgEle
        .append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("g")
        .attr("class", function (d) {
          return d.properties.name;
        })
        .append("path")
        .attr("fill", function (d) {
          const colorObj = winnerArray?.find(
            (v, i) => v.city === d.properties.name_traditional_chinese
          );
          return colorObj ? colorObj?.color : "#ccc";
        })
        .attr("d", geoGenerator)
        .style("stroke", "#fff")
        .style("margin", "0px")
        .on("mouseover", handleMouseOver)
        .on("mouseout", function (d, i) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("fill", function (d) {
              const colorObj = winnerArray?.find(
                (v, i) => v?.city === d.properties.name_traditional_chinese
              );
              return colorObj ? colorObj?.color : "#ccc";
            });
          svgEle
            .selectAll("text")
            .transition()
            .delay(function (d, i) {
              return 100;
            })
            .text("");
        });
    });
    // svgEle.call(zoom);

    // function handleZoom(event) {
    //   const { transform } = event;
    //   svgEle.selectAll("path").attr("transform", transform);
    // }

    function handleMouseOver(e, d) {
      let centroid = geoGenerator.centroid(d);
      svgEle
        .append("text")
        .text(d.properties.name_traditional_chinese)
        .style("font-size", 20)
        .style("font-weight", "bold")
        .style("display", "inline")
        .attr("transform", `translate( ${centroid} )`)
        .style("fill", "black")
        .transition()
        .delay(function (d, i) {
          return 100;
        });
      d3.select(this).transition().duration(300).attr("fill", "beige");
    }
    function resizeHandler() {
      width = window.innerWidth * 0.25;
      height = window.innerHeight * 0.9;
      // svgEle.attr("width", width).attr("height", height);
    }
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [winnerArray]);

  return <svg ref={svg}></svg>;
}
