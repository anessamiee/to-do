import { useRef, useState } from "react";
import formInput from "../types/formInput";
type Props = {
  onUpdateList: (newToDo: formInput) => void;
};
const ToDoForm: React.FC<Props> = ({ onUpdateList }) => {
  const [userTitle, setTitle] = useState("");
  const [userDate, setDate] = useState("");
  const [userDescription, setDescription] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const titleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    titleRef.current?.classList.remove("border-red-500");
    setTitle(e.currentTarget.value);
  };
  const dateHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dateRef.current?.classList.remove("border-red-500");

    setDate(e.currentTarget.value);
  };
  const descriptionHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    descriptionRef.current?.classList.remove("border-red-500");
    setDescription(e.currentTarget.value);
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      userTitle?.trim().length !== 0 &&
      userDate?.trim().length !== 0 &&
      userDescription?.trim().length !== 0
    ) {
      const userData: formInput = {
        title: userTitle,
        date: userDate,
        description: userDescription,
      };

      onUpdateList(userData);

      setTitle("");
      setDescription("");
      setDate("");
    }
    if (titleRef.current?.value.trim().length === 0) {
      titleRef.current.classList.add("border-red-500");
    }
    if (dateRef.current?.value.trim().length === 0) {
      dateRef.current.classList.add("border-red-500");
    }
    if (descriptionRef.current?.value.trim().length === 0) {
      descriptionRef.current.classList.add("border-red-500");
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center justify-center gap-4"
      onSubmit={submitHandler}
    >
      <section className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0 sm:justify-between">
        <label htmlFor="title" className="flex flex-col">
          Title
          <input
            type="text"
            id="title"
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
            ref={titleRef}
            value={userTitle}
            onChange={titleHandler}
          />
        </label>
        <label htmlFor="due-date" className="flex flex-col">
          Due Date
          <input
            type="date"
            id="due-date"
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
            ref={dateRef}
            value={userDate}
            onChange={dateHandler}
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
          className="border-2 w-full border-zinc-400 rounded-md px-2 py-1"
          ref={descriptionRef}
          value={userDescription}
          onChange={descriptionHandler}
        ></textarea>
      </label>
      <button
        type="submit"
        className="border-2 w-full sm:w-1/4 rounded-md border-zinc-400 px-4 py-2 bg-lime-300 text-zinc-700 hover:bg-lime-400 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default ToDoForm;
