import React from 'react';
import './App.css';
import Header from "./components/Header";
import Board from "./components/Board";
import {ItemTitleTypes, ItemTypes} from "./types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {Backdrop, CircularProgress, Dialog} from "@mui/material";

function App() {

  const {data: cards, isLoading: loadingInitialData}: any = useQuery({
    queryKey: ["panelData"],
    queryFn: () =>
      fetch('/todos').then(() =>(
        [
          {title: ItemTitleTypes.NEW, type: ItemTypes.NEW},
          {title: ItemTitleTypes.IN_PROGRESS, type: ItemTypes.NEW},
          {title: ItemTitleTypes.FINISHED, type: ItemTypes.NEW},
        ])
      ).catch(() =>
        ([
          {title: ItemTitleTypes.NEW, type: ItemTypes.NEW},
          {title: ItemTitleTypes.IN_PROGRESS, type: ItemTypes.NEW},
          {title: ItemTitleTypes.FINISHED, type: ItemTypes.NEW},
        ])
      ),
  })

  const queryClient = useQueryClient()
  const {mutate: saveCard, isPending: loadingSaveData} = useMutation({
    mutationFn: (name: string) => {
      return axios.post('/todos', name)
    },
    onError: (data) => {
      queryClient.setQueryData(["panelData"], [
        {title: ItemTitleTypes.NEW, type: ItemTypes.IN_PROGRESS},
        {title: ItemTitleTypes.IN_PROGRESS, type: ItemTypes.IN_PROGRESS},
        {title: ItemTitleTypes.FINISHED, type: ItemTypes.FINISHED},
      ])
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['panelData'], [
        {title: ItemTitleTypes.NEW, type: ItemTypes.IN_PROGRESS},
        {title: ItemTitleTypes.IN_PROGRESS, type: ItemTypes.IN_PROGRESS},
        {title: ItemTitleTypes.FINISHED, type: ItemTypes.FINISHED},
      ])
    },
  })

  return (
    <div className="App">
      <Header/>
      <Board cards={cards} saveCard={saveCard} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingInitialData || loadingSaveData}
      >
        <CircularProgress color={"inherit"}/>
      </Backdrop>
    </div>
  );
}

export default App;