import React, {FC} from 'react';
import {useDrag} from "react-dnd";
import {Paper, styled} from "@mui/material";

interface DropResult {
  name: string
}

export interface CardProps {
  name: string
  type: string
  saveCard: (name: string) => void
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const Card: FC<CardProps> = ({name, type, saveCard}) => {

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: type,
    item: {name},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        saveCard(item.name)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  return (
    <div ref={dragPreview} style={{opacity: isDragging ? 0.2 : 1, paddingTop: 5}}>
      <div ref={drag}>
        <Item elevation={2}>
          {name}
        </Item>
      </div>
    </div>
  );
}

export default Card;