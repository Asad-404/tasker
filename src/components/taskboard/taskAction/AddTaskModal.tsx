import { ChangeEvent, useState } from "react";
import { Task } from "../TaskList";

type Props = {
  onCloseClick: () => void;
  taskToUpdate: Task | null;
  onSave: (task: Task, isAdd: boolean) => void;
};
export default function AddTaskModal({
  onSave,
  taskToUpdate,
  onCloseClick,
}: Props) {
  const [task, setTask] = useState<Task>(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "",
      tags: [],
      isFavorite: false,
    },
  );

  const [isAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const name = event.target.name;
    let value: string | string[] = event.target.value;

    if (name === "tags") {
      value = event.target.value.split(",");
    }

    setTask({ ...task, [name]: value });
  };
  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-70"></div>
      <form className="absolute left-1/3 top-16 z-10 mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {Object.is(taskToUpdate, null) ? "Add New Task" : "Edit Task"}
        </h2>
        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              name="description"
              id="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={task.tags}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            type="button"
            onClick={onCloseClick}
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={() => onSave(task, isAdd)}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
