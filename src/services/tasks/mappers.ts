import { Task } from "../../types";

export const mapTaskModelToCard = (task: Task): Task => {
  const card = {...task,  id: task._id};
  return card;
};

