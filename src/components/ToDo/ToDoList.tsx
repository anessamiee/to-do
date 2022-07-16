import toDoItem from "../../types/toDoItem";
import ToDoItem from "./ToDoItem";
type Props = {
  toDoItems: toDoItem[];
};
const ToDoList: React.FC<Props> = ({ toDoItems }) => {
  return (
    <div className="table-row-group">
      {toDoItems.map((item: toDoItem, index) => {
        return <ToDoItem toDoItem={item} key={item.id} index={index + 1} />;
      })}
    </div>
  );
};

export default ToDoList;
