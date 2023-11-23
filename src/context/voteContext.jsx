import {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import voteReducder from "../reducer";
const VoteContext = createContext({});
export default VoteContext;

// eslint-disable-next-line react/prop-types
export const VoteContextProvider = function ({ children }) {
  const initState = {
    voteData: [],
    total: {},
    selOption: { city: "", district: "", village: "" },
  };
  const [reducer, dispatch] = useReducer(voteReducder, initState);
  const voteData = reducer?.voteData;
  const selOption = reducer?.selOption;
  const newTotalVote = [
    {
      name: "星際和平黨",
      value: reducer?.total?.candidate_1,
      color: {
        background:
          "linear-gradient(89.28deg, #AD8427 0.74%, rgba(252, 238, 207, 0) 162.36%)",
      },
    },
    {
      name: "未來前進黨",
      value: reducer?.total?.candidate_2,
      color: {
        background:
          "linear-gradient(86.8deg, #C857A3 2.93%, rgba(188, 143, 174, 0) 191.01%)",
      },
    },
    {
      name: "新世代改革黨",
      value: reducer?.total?.candidate_3,
      color: {
        background:
          "linear-gradient(86.18deg, #08C0BE 1.78%, rgba(200, 240, 240, 0) 122.05%)",
      },
    },
  ];
  console.log(newTotalVote);
  const winnerArray = reducer?.voteData?.map((v, i) => {
    const newVoteArray = [
      {
        name: "星際和平黨",
        value: parseInt(v?.candidate_1.replace(",", ""), 10),
        color: "#B4A073",
      },
      {
        name: "未來前進黨",
        value: parseInt(v?.candidate_2.replace(",", ""), 10),
        color: "#E756B8",
      },
      {
        name: "新世代改革黨",
        value: parseInt(v?.candidate_3.replace(",", ""), 10),
        color: "#08C0BE",
      },
    ].sort((a, b) => b.value - a.value);
    return {
      city: v.city_name,
      winner: newVoteArray[0].name,
      color: newVoteArray[0].color,
    };
  });
  // const total = reducer?.voteData.reduce((current,))

  //   console.log(winnerArray);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/data/output.json");
        const data = await res.data;
        dispatch({ type: "getVoteData", payload: data });
        const res2 = await axios.get("/data/total.json");
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
      value={{ newTotalVote, voteData, selOption, dispatch, winnerArray }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = function () {
  return useContext(VoteContext);
};
