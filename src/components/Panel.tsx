import React from 'react';
import {Paper} from "@mui/material";
import {useDrop} from "react-dnd";
import {CardTypes} from "../types";
import Card from "./Card";

const Panel = ({title, type, cards, acceptTypes, saveCard} :
                 {title: string, type: string, cards: CardTypes[], acceptTypes: string[], saveCard: (name: string) => void}) => {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: acceptTypes,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <Paper
      ref={drop}
      sx={{
        height: '50vh',
        width: '100%',
        backgroundColor: isOver ? 'darkgray' : 'white'
      }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
      {!!cards && cards.map((card: any, index: number) => (
        (card.type === type) ?
          <div key={`cardkey${index}`}>
            <Card name={card.title} type={card.type} saveCard={saveCard} />
          </div> : null
      ))}
    </Paper>
  );
}

export default Panel;