import "../styles/components/filter.scss";
import { useVoteContext } from "../context/voteContext";
export default function Filter() {
  const { voteData, selOption, dispatch, districtObj, villageObj } =
    useVoteContext();
  const selectFn = (e, inputType) => {
    const value = e.target.value;
    const newData = { ...selOption, [inputType]: value };
    if (selOption.city && selOption.district && selOption.village) {
      if (inputType === "district") newData.village = "";
      if (inputType === "city") {
        newData.district = "";
        newData.village = "";
      }
    } else if (selOption.city && selOption.district) {
      if (inputType === "city") {
        newData.district = "";
      }
    }
    dispatch({
      type: "selectOption",
      payload: newData,
    });
  };
  // console.log(findArea);
  // const districtArray = {};
  // const villageArray = {};
  // const { districtArray, villageArray } = findAreaArray;
  //縣市
  // const districtArray = voteData.find((v) => {
  //   return v.city_name === selOption?.city;
  // });
  // //鄉鎮
  // const villageArray =
  //   selOption?.city && selOption?.district
  //     ? districtArray?.districts?.find((v, i) => {
  //         return v.districts_name === selOption?.district;
  //       })
  //     : [];
  const cityDom = (
    <select
      name="city"
      id="city"
      value={selOption?.city}
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
      value={selOption?.district}
      onChange={(e) => {
        selectFn(e, "district");
      }}
    >
      {/* districtArray */}
      <option value="">縣市</option>
      {districtObj?.districts?.map((v, i) => {
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
      name="village"
      id="village"
      value={selOption?.village}
      onChange={(e) => {
        selectFn(e, "village");
      }}
    >
      <option value="">鄉鎮</option>
      {villageObj?.village?.map((v) => {
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
