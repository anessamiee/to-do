import useToDoList from "../../hooks/useToDoList";
import toDoItem from "../../types/toDoItem";

type Props = {
  toDoItem: toDoItem;
  index: number;
};
const ToDoItem: React.FC<Props> = ({ toDoItem, index }) => {
  const { deleteToDo } = useToDoList();
  const handleDelete = () => {
    deleteToDo(toDoItem.id);
  };

  return (
    <div className="table-row">
      <div className="table-cell m-1 p-4 border-r-2 border-t-2 border-zinc-400 text-center">
        {index}
      </div>
      <div className="table-cell m-1 p-4 border-r-2 border-t-2 border-zinc-400">
        {toDoItem.title}
      </div>
      <div className="hidden sm:table-cell m-1 p-4 border-r-2 border-t-2 border-zinc-400">
        {toDoItem.description}
      </div>
      <div className="hidden sm:table-cell m-1 p-4 border-r-2 border-t-2 border-zinc-400">
        {toDoItem.dueDate}
      </div>
      <div className="table-cell m-1 p-4 border-t-2 border-zinc-400 text-center">
        <button
          className="border-2 rounded-md border-zinc-400 px-4 py-2 bg-red-400 text-zinc-700 hover:bg-red-500 transition-colors"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default ToDoItem;
