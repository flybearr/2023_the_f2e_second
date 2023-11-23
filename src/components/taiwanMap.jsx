import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { select } from "d3";
import "../styles/components/taiwanMap.scss";
import { useVoteContext } from "../context/voteContext";
export default function TaiwanMap() {
  const { winnerArray } = useVoteContext();

  console.log(winnerArray);
  const svg = useRef(null);
  useEffect(() => {
    const svgEle = select(svg.current);
    const width = window.innerWidth * 0.2;
    const height = window.innerHeight * 0.9;
    let projection;
    let geoGenerator;

    // 放大
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // 設定最小及最大縮放倍率
      .on("zoom", handleZoom);

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
          const colorObj = winnerArray.find(
            (v, i) => v.city === d.properties.name_traditional_chinese
          );
          return colorObj ? colorObj?.color : "#ccc";
        })
        .attr("d", geoGenerator)
        .style("stroke", "#fff")
        .style("margin", "0px")
        .on("mouseover", handleMouseOver)
        .on("mouseout", function (d, i) {
          d3.selectAll("text")
            .transition()
            .delay(function (d, i) {
              return 100;
            })
            .text("");
        });
    });
    svgEle.call(zoom);

    function handleZoom(event) {
      const { transform } = event;
      svgEle.selectAll("path").attr("transform", transform);
    }

    function handleMouseOver(e, d) {
      let centroid = geoGenerator.centroid(d);
      svgEle
        .append("text")
        .text(d.properties.name_traditional_chinese)
        .style("font-size", 20)
        .style("font-weight", "bold")
        .style("display", "inline")
        .attr("transform", "translate(" + centroid + ")")
        .style("fill", "black")
        .transition()
        .delay(function (d, i) {
          return 100;
        });
    }
  }, [winnerArray]);

  return <svg ref={svg}></svg>;
}
