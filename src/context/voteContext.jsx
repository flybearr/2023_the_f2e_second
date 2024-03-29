import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useMemo,
} from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import voteReducder from "../reducer";
import { judeNum, randomPrecent } from "../utils";
const VoteContext = createContext({});
export default VoteContext;

// eslint-disable-next-line react/prop-types
export const VoteContextProvider = function ({ children }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const initState = {
    voteData: [],
    total: {},
    selOption: { city: "", district: "", village: "" },
  };
  const [reducer, dispatch] = useReducer(voteReducder, initState);
  const voteData = reducer?.voteData;
  const selOption = reducer?.selOption;
  const totalVote = reducer?.total;
  console.log(totalVote);
  const newTotalVote = [
    {
      name: "星際和平黨",
      value: totalVote?.candidate_1,
      color: {
        background:
          "linear-gradient(89.28deg, #AD8427 0.74%, rgba(252, 238, 207, 0) 162.36%)",
      },
    },
    {
      name: "未來前進黨",
      value: totalVote?.candidate_2,
      color: {
        background:
          "linear-gradient(86.8deg, #C857A3 2.93%, rgba(188, 143, 174, 0) 191.01%)",
      },
    },
    {
      name: "新世代改革黨",
      value: totalVote?.candidate_3,
      color: {
        background:
          "linear-gradient(86.18deg, #08C0BE 1.78%, rgba(200, 240, 240, 0) 122.05%)",
      },
    },
  ];
  const winnerArray = useMemo(() => {
    return voteData.map((v, i) => {
      const newVoteArray = [
        {
          name: "星際和平黨",
          value: judeNum(v?.candidate_1),
          color: "#AD8427",
        },
        {
          name: "未來前進黨",
          value: judeNum(v?.candidate_2),
          color: "#E756B8",
        },
        {
          name: "新世代改革黨",
          value: judeNum(v?.candidate_3),
          color: "#08C0BE",
        },
      ].sort((a, b) => b.value - a.value);

      return {
        city: v.city_name,
        value: newVoteArray[0].value,
        winner: newVoteArray[0].name,
        color: newVoteArray[0].color,
      };
    });
  }, [voteData]);

  const districtObj = useMemo(() => {
    const district = voteData.find((v) => {
      return v.city_name === selOption?.city;
    });

    return district;
  }, [selOption]);

  const villageObj = useMemo(() => {
    const village = districtObj?.districts?.find((v) => {
      return v.districts_name === selOption?.district;
    });
    return village;
  }, [selOption]);

  const renderBarData = useMemo(() => {
    //什麼都沒選，預設值"全國"
    let newData = voteData;
    let compareKey = "city_name";
    if (selOption.city && !selOption.district && !selOption.village) {
      newData = districtObj?.districts;
      compareKey = "districts_name";
    } else if (selOption.city && selOption.district && !selOption.village) {
      newData = villageObj?.village;
      compareKey = "village_name";
    } else if (selOption.city && selOption.district && selOption.village) {
      console.log("village");
      console.log(villageObj);
      newData = [
        villageObj?.village?.find((v) => {
          return v.village_name === selOption?.village;
        }),
      ];
      compareKey = "village_name";
    }
    const barData = {
      label: [],
      chartData: [
        {
          name: "星際和平黨",
          data: [],
          color: "#B4A073",
          year: "2020",
          precent: [],
        },
        {
          name: "未來前進黨",
          data: [],
          color: "#E756B8",
          year: "2016",
          precent: [],
        },
        {
          name: "新世代改革黨",
          data: [],
          color: "#08C0BE",
          year: "2012",
          precent: [],
        },
      ],
      color: ["#B4A073", "#E756B8", "#08C0BE"],
    };

    const barData2 = {
      label: [],
      chartData2: [
        {
          name: "2012",
          data: [],
        },
        {
          name: "2016",
          data: [],
        },
        {
          name: "2020",
          data: [],
        },
      ],
      color: ["#65A5D0", "#85618B", "#9B8DCD"],
    };

    newData?.forEach((v) => {
      barData.chartData[0].data.push(judeNum(v?.candidate_1));
      barData.chartData[1].data.push(judeNum(v?.candidate_2));
      barData.chartData[2].data.push(judeNum(v?.candidate_3));
      barData2.chartData2[0].data.push(randomPrecent(0.75, 0.85));
      barData2.chartData2[1].data.push(randomPrecent(0.75, 0.85));
      barData2.chartData2[2].data.push(randomPrecent(0.75, 0.85));
      barData.label.push(v[compareKey]);
      barData2.label.push(v[compareKey]);
    });
    return { barData, barData2 };
  }, [selOption, voteData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("./data/output.json");
        const data = await res.data;
        dispatch({ type: "getVoteData", payload: data });
        const res2 = await axios.get("./data/total.json");
        const data2 = await res2.data;
        dispatch({ type: "getTotalVote", payload: data2 });
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <VoteContext.Provider
      value={{
        newTotalVote,
        totalVote,
        voteData,
        selOption,
        dispatch,
        winnerArray,
        districtObj,
        villageObj,
        renderBarData,
        isMobile,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = function () {
  return useContext(VoteContext);
};
