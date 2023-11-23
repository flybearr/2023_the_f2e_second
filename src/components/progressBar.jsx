import "../styles/components/progressBar.scss";
import { useVoteContext } from "../context/voteContext";
export default function ProgressBar() {
  const { newTotalVote } = useVoteContext();

  return (
    <div className="progress-wrap">
      <div className="bar-wrap">
        {newTotalVote.map((v) => {
          return (
            <div className="bar" style={v.color} key={v.name}>
              <span>{v.name}</span>
              <span> {v.value} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
