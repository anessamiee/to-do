import {
  ChildContextProvider,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { JsxChild } from "typescript";
import FormInput from "../types/FormInput";
import toDoItem from "../types/toDoItem";
const toDoDummyData: toDoItem[] = [
  {
    id: Math.random(),
    title: "first",
    description: "a long description",
    dueDate: "2022-10-13",
  },
  {
    id: Math.random(),
    title: "second",
    description: "another long description",
    dueDate: "2022-12-3",
  },
];
const ToDoContext = createContext({
  toDoItems: toDoDummyData,
  addItemHandler: (newToDoItem: FormInput) => {},
  deleteItemHandler: (id: number) => {},
});

export const ToDoContextProvider = (props: PropsWithChildren) => {
  const [toDoItems, setToDoItems] = useState<toDoItem[]>(toDoDummyData);

  useEffect(() => {
    // console.log(localStorage);
    // setToDoItems();
  }, []);

  const addItemHandler = (newToDoItem: FormInput) => {
    const newToDo: toDoItem = {
      id: Math.random(),
      title: newToDoItem.title,
      description: newToDoItem.description,
      dueDate: newToDoItem.date,
    };
    setToDoItems((state) => [...state, newToDo]);
    // localStorage.setItem(newToDo.id.toString(), String(newToDo));
    // console.log(localStorage)
  };
  const deleteItemHandler = (id: number) => {
    setToDoItems(toDoItems.filter((item) => item.id !== id));
    // localStorage.removeItem(id.toString());
  };

  return (
    <ToDoContext.Provider
      value={{
        toDoItems: toDoItems,
        addItemHandler: addItemHandler,
        deleteItemHandler: deleteItemHandler,
      }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
