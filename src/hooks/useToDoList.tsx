import { useContext } from "react";
import ToDoContext from "../store/todo-context";

const useToDoList = () => {
  const ctx = useContext(ToDoContext);
  const toDoList = ctx.toDoItems;
  const deleteToDo = ctx.deleteItemHandler;
  return { toDoList, deleteToDo };
};
export default useToDoList;
