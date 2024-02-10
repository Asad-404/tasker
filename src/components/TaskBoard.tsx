import { useState } from "react";

import NoTaskFound from "./taskboard/NoTaskFound";
import Search from "./taskboard/Search";
import TaskAction from "./taskboard/TaskAction";
import TaskList, { Task } from "./taskboard/TaskList";
import AddTaskModal from "./taskboard/taskAction/AddTaskModal";

export default function TaskBoard() {
  const initialTask = {
    id: crypto.randomUUID(),
    title: "Title 1",
    description: "Task one description",
    tags: ["web", "react", "next"],
    priority: "high",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState<Task[]>([initialTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  const handleAddEditTask = (newTask: Task, isAdd: boolean) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        }),
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task: Task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const taskAfterDelete = tasks.filter((el) => el.id !== taskId);
    setTasks(taskAfterDelete);
  };

  const handleFavorite = (taskId: string) => {
    const newTasks = [...tasks];
    const taskIndex = tasks.findIndex((el) => el.id === taskId);
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  };

  const handleSearch = (searchText: string) => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    setTasks(filteredTasks);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container mx-auto">
        <Search onSearch={handleSearch} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onDeleteAllClick={() => setTasks([])}
            onAddClick={() => setShowAddModal(true)}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onFav={handleFavorite}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
