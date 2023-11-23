import TaiwanMap from "../components/taiwanMap";
import NavBar from "../components/navBar";
import Filter from "../components/filter";
import ProgressBar from "../components/progressBar";
import PieChart from "../components/pieChart";
import BarChart from "../components/barChart";
import "../styles/voteView.scss";
export default function VoteView() {
  return (
    <div className="vote-view-wrap">
      <NavBar />
      <Filter />
      <ProgressBar />
      <PieChart />
      <div className="bar-chart-big-wrap">
        <BarChart />
        <div className="empty-scroll-bar"></div>
      </div>
      <Filter />
      <Filter />
      {/* <div className="map-wrap">
        <TaiwanMap />
      </div> */}
      {/* <Filter /> */}
      {/* <Filter /> */}
      {/* <div className="chart-wrap"></div> */}
    </div>
  );
}
