import { Button, Paper, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { TaskStatus } from "../types";
import { useCreateTaskMutation } from "../services/tasks/hooks/useCreateTaskMutation";

const NewCard = () => {
  const [name, setName] = React.useState<string>("");
  const { createCard: saveCard, isPending: loadingSaveData } =
    useCreateTaskMutation();

  const onSaveCard = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (!name) return;

      await saveCard({
        title: name,
        status: TaskStatus.NEW,
        //TODO: set random images
      });

      setName("");
    },
    [name, saveCard]
  );

  return (
    <Paper
      sx={{
        height: "50vh",
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(event) => setName(event.target.value)}
        style={{ paddingBottom: 1, fontSize: 12 }}
      />
      <Button
        variant="contained"
        onClick={onSaveCard}
        disabled={loadingSaveData}
      >
        Create Card
      </Button>
    </Paper>
  );
};

export default NewCard;
