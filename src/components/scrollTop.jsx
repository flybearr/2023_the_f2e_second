import "../styles/components/scrollTop.scss";
export default function ScrollTop() {
  const toTopFN = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="to-top-btn" onClick={toTopFN}>
      <span className="material-symbols-outlined">arrow_upward</span>
    </div>
  );
}
