import "../styles/components/selectProgressBar.scss";
import { useVoteContext } from "../context/voteContext";
export default function SelectProgressBar() {
  const { newTotalVote, isMobile } = useVoteContext();
  const totalValue = newTotalVote.reduce((acc, current) => {
    return acc + parseInt(current?.value?.split(",").join(""), 10);
  }, 0);
  const sortData = newTotalVote?.sort(
    (a, b) =>
      parseInt(b?.value?.split(",").join(""), 10) -
      parseInt(a?.value?.split(",").join(""), 10)
  );
  console.log(totalValue);
  return (
    <div className="select-progress-wrap">
      <div className="select-bar-wrap">
        {sortData.map((v, i) => {
          const width = `${Math.round(
            (parseInt(v?.value?.split(",").join(""), 10) / totalValue) * 100
          )}%`;
          console.log(width);
          let displayName = "";
          if (v.name === "新世代改革黨") displayName = "新世代改革黨 / 蔡菜子";
          if (v.name === "未來前進黨") displayName = "未來前進黨 / 喊國語";
          if (v.name === "星際和平黨") displayName = "星際和平黨 / 宋你魚";
          return (
            <div
              style={{ ...v.color, width: width }}
              className="select-bar"
              key={"select" + v.name}
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
