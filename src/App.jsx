import { VoteContextProvider } from "./context/voteContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VoteView from "./pages/voteView";
function App() {
  return (
    <VoteContextProvider>
      <BrowserRouter basename="/2023_the_f2e_second">
        <Routes>
          <Route path="/" element={<VoteView />} />
        </Routes>
      </BrowserRouter>
    </VoteContextProvider>
  );
}

export default App;
