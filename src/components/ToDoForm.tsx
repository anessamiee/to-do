import { Reducer, useContext, useEffect, useReducer, useState } from "react";
import ToDoContext from "../store/todo-context";

const formInitialState = {
  title: { value: "", isValid: null },
  date: { value: "", isValid: null },
  description: { value: "", isValid: null },
};
enum FieldType {
  Title = "title",
  Date = "date",
  Description = "description",
}

type Input = {
  value: string;
  isValid: boolean | null;
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
    return {
      ...state,
      [action.field]: {
        value: action.val,
        isValid: action.val.trim().length !== 0,
      },
    };
  }
  if (action.type === "ON_BLUR") {
    Object.entries(state).forEach(([key, value]) => {
      if (key === action.field) {
        console.log(key);
        state = {
          ...state,
          [key]: {
            value: value.value,
            isValid: null,
          },
        };
        return;
      }
    });
    return state;
  }
  if (action.type === "VALIDATE") {
    return {
      ...state,
      title: {
        value: state.title.value,
        isValid: state.title.value.trim().length !== 0,
      },
      date: {
        value: state.date.value,
        isValid: state.date.value.trim().length !== 0,
      },
      description: {
        value: state.description.value,
        isValid: state.description.value.trim().length !== 0,
      },
    };
  }
  if (action.type === "SUBMIT") {
    return formInitialState;
  }
  return state;
};

const ToDoForm: React.FC = () => {
  const ctx = useContext(ToDoContext);

  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    formInitialState
  );

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity!");
  //     // dispatchFormState({ type: "VALIDATE" });
  //     if (
  //       formState.date.isValid &&
  //       formState.title.isValid &&
  //       formState.description.isValid
  //     )
  //     {
  //       // setFormIsValid(true);
  //       dispatchFormState({ type: "VALIDATE" });

  //     }
  //   }, 500);

  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier);
  //   };
  // }, [
  //   formState.date.isValid,
  //   formState.title.isValid,
  //   formState.description.isValid,
  // ]);

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
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    dispatchFormState({ type: "ON_BLUR", field: name });
  };

  const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (formIsValid) {
    //   ctx.addItemHandler({
    //     title: formState.title.value,
    //     date: formState.date.value,
    //     description: formState.description.value,
    //   });
    //   dispatchFormState({ type: "SUBMIT" });
    // }
    dispatchFormState({ type: "VALIDATE" });
    console.log(formState);
    if (
      formState.date.isValid &&
      formState.title.isValid &&
      formState.description.isValid
    ) {
      console.log("valid");
      ctx.addItemHandler({
        title: formState.title.value,
        date: formState.date.value,
        description: formState.description.value,
      });
      dispatchFormState({ type: "SUBMIT" });
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
              `${
                formState.title.isValid === false
                  ? "border-red-500"
                  : "border-zinc-400 "
              }`
            }
            onBlur={handleBlur}
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
              `${
                formState.date.isValid === false
                  ? "border-red-500"
                  : "border-zinc-400 "
              }`
            }
            onBlur={handleBlur}
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
            `${
              formState.description.isValid === false
                ? "border-red-500"
                : "border-zinc-400 "
            }`
          }
          onBlur={handleBlur}
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
