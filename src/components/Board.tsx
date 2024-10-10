import { Container, Grid } from "@mui/material";
import Panel from "./Panel";
import { TaskStatus, CardTypes, ItemTitleTypes } from "../types";
import NewCard from "./NewCard";

const panels = [
  {
    title: ItemTitleTypes.NEW,
    type: TaskStatus.NEW,
    accept: [TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
  },
  {
    title: ItemTitleTypes.IN_PROGRESS,
    type: TaskStatus.IN_PROGRESS,
    accept: [TaskStatus.NEW, TaskStatus.COMPLETED],
  },
  {
    title: ItemTitleTypes.FINISHED,
    type: TaskStatus.COMPLETED,
    accept: [TaskStatus.NEW, TaskStatus.IN_PROGRESS],
  },
];

interface BoardProps {
  cards: CardTypes[];
}

const Board: React.FC<BoardProps> = ({ cards }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: 10,
        backgroundColor: "#f5f5f7",
        height: "100vh",
      }}
    >
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid key={0} item xs={2} sm={2} md={2}>
              <NewCard />
            </Grid>

            {panels.map((value, index) => (
              <Grid
                key={`panel${index}`}
                item
                xs={3}
                sm={3}
                md={3}
                sx={{ mx: 1 }}
              >
                <Panel
                  title={value.title}
                  type={value.type}
                  cards={cards}
                  acceptTypes={value.accept}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Board;
