import toDoItem from "../../types/toDoItem";
import ToDoItem from "./ToDoItem";
type Props = {
  toDoItems: toDoItem[];
};
const ToDoList: React.FC<Props> = ({ toDoItems }) => {
  // if (toDoItems.length === 0) {
  //   return (
  //     // <div className="table-row-group w-full">
  //     <div className="table-row-group floar w-full m-1 p-4 align-middle border-r-2 border-t-2 border-zinc-400 text-center">
  //       <div className="table-row">
  //         <div className="w-full">No Tasks</div>
  //       </div>
  //     </div>
  //     // </div>
  //   );
  // }
  return (
    <div className="table-row-group">
      {toDoItems.map((item: toDoItem, index) => {
        return <ToDoItem toDoItem={item} key={item.id} index={index + 1} />;
      })}
    </div>
  );
};

export default ToDoList;
