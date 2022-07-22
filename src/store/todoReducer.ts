import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import FormInput from "../types/formInput";
import toDoItem from "../types/toDoItem";

const initialTodoState: toDoItem[] = [
  {
    id: Math.random(),
    title: "first",
    description: "a long description",
    dueDate: "2022-10-13",
  },
  {
    id: Math.random(),
    title: "second",
    description: "another long description",
    dueDate: "2022-12-3",
  },
];
const makeToDo = (todo: FormInput): toDoItem => {
  const newToDo: toDoItem = {
    id: Math.random(),
    title: todo.title,
    description: todo.description,
    dueDate: todo.date,
  };
  return newToDo;
};
const todoSlice = createSlice({
  name: "toDo",
  initialState: initialTodoState,
  reducers: {
    add(state: RootState, action: PayloadAction<FormInput>) {
      const newToDo = makeToDo(action.payload);
      state.push(newToDo);
    },
    delete(state: RootState, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.findIndex((item) => item.id === id);
      state.splice(index, 1);
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
