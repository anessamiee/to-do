import "./index.css";
import ToDos from "./components/ToDo/ToDos";
import ToDoForm from "./components/ToDoForm";

function App() {
  return (
    <div className="m-4 sm:mx-32 flex flex-col items-center justify-center gap-4">
      <ToDoForm />
      <ToDos />
    </div>
  );
}

export default App;
