import ToDoList from "./ToDoList";

const ToDos: React.FC = () => {
  return (
    <div className="table w-full border-2 rounded-md m-1 sm:m-4 border-zinc-400 border-separate text-left ">
      <div className="table-row-group">
        <div className="table-row">
          <div className="table-cell m-1 p-4 border-r-2 w-1/12 border-zinc-400 text-center ">
            No
          </div>
          <div className="table-cell m-1 p-4 border-r-2 w-2/12  border-zinc-400 ">
            Title
          </div>
          <div className="hidden sm:table-cell m-1 p-4 border-r-2 w-5/12 border-zinc-400 ">
            Description
          </div>
          <div className="hidden sm:table-cell m-1 p-4 border-r-2 w-2/12  border-zinc-400 ">
            Due Date
          </div>
          <div className="table-cell m-1 p-4 border-r- w-3/12  border-zinc-400 "></div>
        </div>
      </div>
      <ToDoList />
    </div>
  );
};
export default ToDos;
