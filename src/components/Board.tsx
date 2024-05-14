import React, {useState} from 'react';
import {Button, Container, Grid, Paper, TextField} from "@mui/material";
import Panel from "./Panel";
import {CardTypes, ItemTitleTypes, ItemTypes} from "../types";

function Board({cards, saveCard}: {cards: CardTypes[], saveCard: (name: string) => void }) {

  const [name, setName] = useState<string>("")
  const panels = [
    {title: ItemTitleTypes.NEW, type: ItemTypes.NEW, accept: [ItemTypes.IN_PROGRESS]},
    {title: ItemTitleTypes.IN_PROGRESS, type: ItemTypes.IN_PROGRESS, accept: [ItemTypes.NEW]},
    {title: ItemTitleTypes.FINISHED, type: ItemTypes.FINISHED, accept: [ItemTypes.NEW, ItemTypes.IN_PROGRESS]},
  ]

  const onSaveCard = () => !!name && saveCard(name);

  return (
    <Container maxWidth="xl" sx={{
      paddingTop: 10,
      backgroundColor: '#f5f5f7',
      height: '100vh',
    }}>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid key={0} item xs={2} sm={2} md={2}>
              <Paper
                sx={{
                  height: '50vh',
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  onChange={(event) => setName(event.target.value)}
                  style={{paddingBottom: 5}}
                />
                <Button variant="contained" onClick={onSaveCard}>Create Card</Button>
              </Paper>
            </Grid>
            {panels.map((value, index) => (
              <Grid key={`panel${index}`} item xs={3} sm={3} md={3}>
                <Panel
                  title={value.title}
                  type={value.type}
                  cards={cards}
                  acceptTypes={value.accept}
                  saveCard={saveCard}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Board;