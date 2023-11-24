import { useVoteContext } from "../context/voteContext";
import "../styles/components/tag.scss";
export default function Tag() {
  const { newTotalVote, isMobile } = useVoteContext();
  return (
    <div className="tag-wrap">
      <div className="tag-inside-wrap">
        {newTotalVote.map((v, i) => {
          return (
            <div style={v.color} className="bar" key={"tag" + v.name}>
              <p>
                <span className="material-symbols-outlined">
                  counter_{i + 1}
                </span>{" "}
                {v.name}
              </p>
            </div>
          );
        })}
      </div>
      {isMobile ? (
        <div className="tag-img-wrap">
          <img src="/images/uranus2.png" alt="" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
