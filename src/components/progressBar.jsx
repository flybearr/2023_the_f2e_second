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
          let displayName = "";
          if (v.name === "新世代改革黨") displayName = "新世代改革黨 / 蔡菜子";
          if (v.name === "未來前進黨") displayName = "未來前進黨 / 喊國語";
          if (v.name === "星際和平黨") displayName = "星際和平黨 / 宋你魚";
          return (
            <div
              style={
                isMobile ? v.color : { ...v.color, width: `${desktop_width}` }
              }
              className="bar"
              key={v.name}
            >
              <p>{displayName}</p>
              <p> {v.value} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
