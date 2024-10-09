import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { Paper, styled } from "@mui/material";
import { CardTypes, TaskStatus } from "../types";

interface DropResult {
  status: TaskStatus;
}

export interface CardProps {
  card: CardTypes;
  updateCardStatus: (id: string, status: TaskStatus) => Promise<void>;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1.5),
}));

const Card: FC<CardProps> = ({ card, updateCardStatus }) => {
  const { status: cardStatus, title: cardTitle, description } = card;
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: cardStatus,
    item: { title: cardTitle, description, type: cardStatus },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      const dropStatus = dropResult?.status;

      if (item && dropResult) {
        const cardId = card.id;
        updateCardStatus(cardId, dropStatus as TaskStatus);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.2 : 1, paddingTop: 5 }}
    >
      <div ref={drag}>
        <Item elevation={2}>{card.title}</Item>
      </div>
    </div>
  );
};

export default Card;
