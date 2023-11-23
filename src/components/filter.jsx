import "../styles/components/filter.scss";
import { useVoteContext } from "../context/voteContext";
export default function Filter() {
  const { voteData, selOption, dispatch } = useVoteContext();
  const selectFn = (e, inputType) => {
    const value = e.target.value;
    const newData = { ...selOption, [inputType]: value };
    dispatch({
      type: "selectOption",
      payload: newData,
    });
  };
  //縣市
  const districtArray = voteData.find((v) => {
    return v.city_name === selOption?.city;
  });
  //鄉鎮
  const villageArray =
    selOption.city && selOption.district
      ? districtArray?.districts?.find((v, i) => {
          return v.districts_name === selOption?.district;
        })
      : [];
  //   console.log(districtArray);
  //   console.log(villageArray);
  const cityDom = (
    <select
      name="city"
      id="city"
      value={selOption.city}
      onChange={(e) => selectFn(e, "city")}
    >
      <option value="">全國</option>
      {voteData.map((v, i) => {
        return (
          <option value={v.city_name} key={v.city_name}>
            {v.city_name}
          </option>
        );
      })}
    </select>
  );
  const districtsDom = (
    <select
      name="districts"
      id="districts"
      value={selOption.district}
      onChange={(e) => {
        selectFn(e, "district");
      }}
    >
      <option value="">縣市</option>
      {districtArray?.districts?.map((v, i) => {
        if (!selOption.city) return;
        return (
          <option value={v.districts_name} key={v.districts_name}>
            {v.districts_name}
          </option>
        );
      })}
    </select>
  );
  const villagesDom = (
    <select
      name="districts"
      id="districts"
      value={selOption.village}
      onChange={(e) => {
        selectFn(e, "village");
      }}
    >
      <option value="">鄉鎮</option>
      {villageArray?.village?.map((v) => {
        if (!selOption.city && !selOption.district) return;
        return (
          <option value={v.village_name} key={v.village_name}>
            {v.village_name}
          </option>
        );
      })}
    </select>
  );
  return (
    <div className="filter-wrap">
      <div className="selector-wrap">
        {cityDom}
        {districtsDom}
        {villagesDom}
      </div>
      <div className="search-bar">
        <span className="material-symbols-outlined">search</span>
        <input type="text" name="" id="" placeholder="找地區" />
      </div>
    </div>
  );
}
