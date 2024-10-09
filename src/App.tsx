import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import { Backdrop, CircularProgress } from "@mui/material";
import useGetTasksQuery from "./services/tasks/hooks/useGetTasksQuery";

function App() {
  const { data, isLoading: loadingInitialData } = useGetTasksQuery();

  return (
    <div className="App">
      <Header />
      <Board cards={data} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingInitialData}
      >
        <CircularProgress color={"inherit"} />
      </Backdrop>
    </div>
  );
}

export default App;
