import { VoteContextProvider } from "./context/voteContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VoteView from "./pages/voteView";
function App() {
  return (
    <VoteContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VoteView />} />
        </Routes>
      </BrowserRouter>
    </VoteContextProvider>
  );
}

export default App;
