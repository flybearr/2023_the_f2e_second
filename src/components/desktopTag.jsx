import React from "react";
import { useVoteContext } from "../context/voteContext";
export default function DesktopTag() {
  const { newTotalVote } = useVoteContext();
  return <div></div>;
}
