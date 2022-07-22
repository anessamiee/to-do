import { useSelector } from "react-redux";
import { RootState } from "../../store";
import toDoItem from "../../types/toDoItem";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
  const toDoList = useSelector((state: RootState) => state);
  return (
    <div className="table-row-group">
      {toDoList.map((item: toDoItem, index) => {
        return <ToDoItem toDoItem={item} key={item.id} index={index + 1} />;
      })}
    </div>
  );
};

export default ToDoList;
