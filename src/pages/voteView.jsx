import TaiwanMap from "../components/taiwanMap";
import NavBar from "../components/navBar";
import Filter from "../components/filter";
import ProgressBar from "../components/progressBar";
import PieChart from "../components/pieChart";
import "../styles/voteView.scss";
export default function VoteView() {
  return (
    <div className="vote-view-wrap">
      <NavBar />
      <Filter />
      <ProgressBar />
      <PieChart />
      {/* <div className="map-wrap">
        <TaiwanMap />
      </div> */}
      <div className="chart-wrap"></div>
    </div>
  );
}
