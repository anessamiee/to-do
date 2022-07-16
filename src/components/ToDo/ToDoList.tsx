import { useContext } from "react";
import ToDoContext from "../../store/todo-context";
import toDoItem from "../../types/toDoItem";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
  const ctx = useContext(ToDoContext);

  return (
    <div className="table-row-group">
      {ctx.toDoItems.map((item: toDoItem, index) => {
        return <ToDoItem toDoItem={item} key={item.id} index={index + 1} />;
      })}
    </div>
  );
};

export default ToDoList;
