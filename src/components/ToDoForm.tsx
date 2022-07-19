import { Reducer, useContext, useReducer } from "react";
import ToDoContext from "../store/todo-context";

const formInitialState = {
  title: { value: "", isValid: false, isTouched: false },
  date: { value: "", isValid: false, isTouched: false },
  description: { value: "", isValid: false, isTouched: false },
};
enum FieldType {
  Title = "title",
  Date = "date",
  Description = "description",
}

type Input = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};
type State = {
  title: Input;
  date: Input;
  description: Input;
};
type Action =
  | {
      val: string;
      field: FieldType | string;
      type: "USER_INPUT";
    }
  | { type: "ON_BLUR"; field: FieldType | string }
  | { type: "SUBMIT" }
  | { type: "VALIDATE" };

const formReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === "USER_INPUT") {
    Object.entries(state).forEach(([key, value]) => {
      if (key === action.field) {
        state = {
          ...state,
          [key]: {
            value: action.val,
            isValid: action.val.trim().length !== 0,
            isTouched: value.isTouched,
          },
        };
      }
    });
    return state;
  }
  if (action.type === "VALIDATE") {
    Object.entries(state).forEach(([key, value]) => {
      state = {
        ...state,
        [key]: {
          value: value.value,
          isValid: value.value.trim().length !== 0,
          isTouched: true,
        },
      };
    });
    return state;
  }
  if (action.type === "ON_BLUR") {
    Object.entries(state).forEach(([key, value]) => {
      if (key === action.field) {
        state = {
          ...state,
          [key]: {
            value: value.value,
            isValid: value.isValid,
            isTouched: false,
          },
        };
      }
    });
    return state;
  }
  if (action.type === "SUBMIT") {
    return formInitialState;
  }
  return state;
};

const ToDoForm: React.FC = () => {
  const ctx = useContext(ToDoContext);

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    formInitialState
  );

  const titleError = !formState.title.isValid && formState.title.isTouched;
  const dateError = !formState.date.isValid && formState.date.isTouched;
  const descriptionError =
    !formState.description.isValid && formState.description.isTouched;

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatchFormState({
      val: value,
      field: name,
      type: "USER_INPUT",
    });
  };
  const blurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    dispatchFormState({ type: "ON_BLUR", field: name });
  };

  const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formState.title.isValid &&
      formState.date.isValid &&
      formState.description.isValid
    ) {
      const newToDo = {
        title: formState.title.value,
        date: formState.date.value,
        description: formState.description.value,
      };
      ctx.addItemHandler(newToDo);
      dispatchFormState({ type: "SUBMIT" });
    } else {
      dispatchFormState({ type: "VALIDATE" });
    }
  };
  return (
    <form
      className="w-full flex flex-col items-center justify-center gap-4"
      onSubmit={onFormSubmit}
    >
      <section className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0 sm:justify-between">
        <label htmlFor="title" className="flex flex-col">
          Title
          <input
            type="text"
            id="title"
            name="title"
            className={
              "border-2 rounded-md px-3 py-2 " +
              `${titleError ? "border-red-500" : "border-zinc-400 "}`
            }
            onBlur={blurHandler}
            value={formState.title.value}
            onChange={inputHandler}
          />
        </label>
        <label htmlFor="due-date" className="flex flex-col">
          Due Date
          <input
            type="date"
            id="due-date"
            name="date"
            className={
              "border-2 rounded-md px-3 py-2 " +
              `${dateError ? "border-red-500" : "border-zinc-400 "}`
            }
            onBlur={blurHandler}
            value={formState.date.value}
            onChange={inputHandler}
          />
        </label>
      </section>
      <label htmlFor="description" className="flex flex-col w-full">
        Description
        <textarea
          name="description"
          id="description"
          cols={5}
          rows={5}
          className={
            "border-2 w-full rounded-md px-2 py-1 " +
            `${descriptionError ? "border-red-500" : "border-zinc-400 "}`
          }
          onBlur={blurHandler}
          value={formState.description.value}
          onChange={inputHandler}
        ></textarea>
      </label>
      <button
        type="submit"
        name="submit"
        className="border-2 w-full sm:w-1/4 rounded-md border-zinc-400 px-4 py-2 bg-lime-300 text-zinc-700 hover:bg-lime-400 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default ToDoForm;
