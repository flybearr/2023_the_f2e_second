export default function voteReducder(state, action) {
  switch (action.type) {
    case "getVoteData":
      return {
        ...state,
        voteData: action.payload,
      };
    case "selectOption": {
      const { city, district, village } = action.payload;
      return {
        ...state,
        selOption: {
          city: city,
          district: district,
          village: village,
        },
      };
    }
    case "getTotalVote":
      return {
        ...state,
        total: action.payload,
      };
  }
}
