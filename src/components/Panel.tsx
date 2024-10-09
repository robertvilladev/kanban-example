import React from "react";
import { Paper, Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import { CardTypes } from "../types";
import Card from "./Card";
import useUpdateStatusTaskMutation from "../services/tasks/hooks/useUpdateStatusTaskMutation";

const Panel = ({
  title,
  type,
  cards,
  acceptTypes,
}: {
  title: string;
  cards: CardTypes[];
  acceptTypes: string[];
  type: CardTypes["status"];
}) => {
  const { updateCardStatus, isPending: loadingSaveData } =
    useUpdateStatusTaskMutation();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: acceptTypes,
    drop: () => ({ status: type }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Paper
      ref={drop}
      sx={{
        height: "50vh",
        width: "100%",
        backgroundColor: isOver ? "darkgray" : "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", padding: 2, backgroundColor: "lightgray" }}
      >
        {title}
      </Typography>

      {canDrop ? "Release to drop" : "Drag a box here"}
      {!!cards &&
        cards.map((card, index: number) =>
          card.status === type ? (
            <div key={`cardKey${index}`}>
              <Card card={card} updateCardStatus={updateCardStatus} />
            </div>
          ) : null
        )}
    </Paper>
  );
};

export default Panel;
