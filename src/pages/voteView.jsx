import TaiwanMap from "../components/taiwanMap";
import NavBar from "../components/navBar";
import Filter from "../components/filter";
import ProgressBar from "../components/progressBar";
import PieChart from "../components/pieChart";
import BarChart from "../components/barChart";
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
      <BarChart />
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
          <BarChart />
        </div>
        <div className="map-wrap">
          <TaiwanMap />
        </div>
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

        <Filter />
        <Filter />
      </div>
      {/* <Filter /> */}
      {/* <Filter /> */}
      {/* <div className="chart-wrap"></div> */}
    </div>
  );
}
