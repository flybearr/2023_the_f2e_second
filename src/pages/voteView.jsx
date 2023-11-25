import TaiwanMap from "../components/taiwanMap";
import NavBar from "../components/navBar";
import Filter from "../components/filter";
import ProgressBar from "../components/progressBar";
import PieChart from "../components/pieChart";
import BarChart from "../components/barChart";
import BarChart2 from "../components/barChart2";
import ScrollTop from "../components/scrollTop";
import Tag from "../components/tag";
import "../styles/voteView.scss";
import { useVoteContext } from "../context/voteContext";
export default function VoteView() {
  const { isMobile } = useVoteContext();
  const display = isMobile ? (
    <>
      <ProgressBar />
      <PieChart />
      <Tag />
      <div className="barChart-wrap">
        <h1 className="barChart-title"> 各縣市政黨得票數</h1>
        <BarChart />
      </div>
      <div className="percent-barChart-wrap ">
        <h1 className="barChart-title"> 各縣市歷屆投票率變化</h1>
        <BarChart2 />
      </div>
    </>
  ) : (
    <div className="desktop-section1">
      <Tag />
      <div className="section1-topArea">
        <ProgressBar />
      </div>
      <div className="section1-bottomArea">
        <div className="section1-chart-wrap">
          <div className="section1-up-wrap">
            <div className="section1-up-img-wrap">
              <img src="/images/uranus1.png" alt="" />
            </div>
            <PieChart />
          </div>

          <div className="barChart-wrap">
            <h1 className="barChart-title"> 各縣市政黨得票數</h1>
            <BarChart />
          </div>
        </div>
        <div className="map-wrap">
          <TaiwanMap />
        </div>
      </div>
      <div className="percent-barChart-wrap ">
        <h1 className="barChart-title"> 各縣市歷屆投票率變化</h1>
        <BarChart2 />
      </div>
    </div>
  );
  return (
    <div className="vote-view-wrap">
      <ScrollTop />
      <NavBar />
      <div className="vote-view-inside-wrap">
        <Filter />
        {display}
      </div>
    </div>
  );
}
