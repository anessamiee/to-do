import "./index.css";
import { useContext } from "react";
import ToDos from "./components/ToDo/ToDos";
import ToDoForm from "./components/ToDoForm";
import ToDoContext from "./store/todo-context";

function App() {
  const ctx = useContext(ToDoContext);
  return (
    <div className="m-4 sm:mx-32 flex flex-col items-center justify-center gap-4">
      <ToDoForm onUpdateList={ctx.addItemHandler} />
      <ToDos toDoItems={ctx.toDoItems} />
    </div>
  );
}

export default App;
