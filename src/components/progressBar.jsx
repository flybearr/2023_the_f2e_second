import "../styles/components/progressBar.scss";
import { useVoteContext } from "../context/voteContext";
export default function ProgressBar() {
  const { newTotalVote, isMobile } = useVoteContext();
  const sortData = newTotalVote?.sort(
    (a, b) =>
      parseInt(b?.value?.split(",").join(""), 10) -
      parseInt(a?.value?.split(",").join(""), 10)
  );

  return (
    <div className="progress-wrap">
      <div className="bar-wrap">
        {sortData.map((v, i) => {
          const desktop_width = ["43%", "37%", "20%"][i];
          return (
            <div
              style={
                isMobile ? v.color : { ...v.color, width: `${desktop_width}` }
              }
              className="bar"
              key={v.name}
            >
              <p>{v.name}</p>
              <p> {v.value} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
