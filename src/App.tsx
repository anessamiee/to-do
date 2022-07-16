import "./index.css";
import { useContext, useState } from "react";
import ToDos from "./components/ToDo/ToDos";
import toDoItem from "./types/toDoItem";
import ToDoForm from "./components/ToDoForm";
import FormInput from "./types/FormInput";
import ToDoContext from "./store/todo-context";

// const toDoDummyData: toDoItem[] = [
//   {
//     id: Math.random(),
//     title: "first",
//     description: "a long description",
//     dueDate: "2022-10-13",
//   },
//   {
//     id: Math.random(),
//     title: "second",
//     description: "another long description",
//     dueDate: "2022-12-3",
//   },
// ];
function App() {
  const ctx = useContext(ToDoContext);
  // const [toDoItems, setToDoItems] = useState<toDoItem[]>(toDoDummyData);
  // const addItemHandler = (newToDoItem: FormInput) => {
  //   const newToDo: toDoItem = {
  //     id: Math.random(),
  //     title: newToDoItem.title,
  //     description: newToDoItem.description,
  //     dueDate: newToDoItem.date,
  //   };
  //   setToDoItems((state) => [...state, newToDo]);
  // };
  // const deleteItemHandler = (id: number) => {
  //   setToDoItems(toDoItems.filter((item) => item.id !== id));
  // };
  return (
    <div className="m-4 sm:mx-32 flex flex-col items-center justify-center gap-4">
      <ToDoForm onUpdateList={ctx.addItemHandler} />
      <ToDos toDoItems={ctx.toDoItems} />
    </div>
  );
}

export default App;
