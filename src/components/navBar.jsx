import React from "react";
import "../styles/components/navBar.scss";
export default function NavBar() {
  const yearArray = [2020, 2016, 2014];
  return (
    <div className="nav-bg">
      <div className="nav-img-wrap">
        <img src="/images/vote.png" alt="" />
      </div>
      <div className="nav-date-wrap">
        <div className="year-wrap">
          {yearArray.map((v, i) => (
            <p className="year-num" key={v}>
              {v}
            </p>
          ))}
        </div>
        <div className="line-wrap">
          <div className="line">
            <div className="line-ball">
              <div className="now"></div>
            </div>
            <div className="line-ball"></div>
            <div className="line-ball"></div>
          </div>
        </div>
        <p>第15任總統副總選舉</p>
      </div>
    </div>
  );
}
