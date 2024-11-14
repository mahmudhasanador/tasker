import { useState } from "react";
import AddTaskModal from "./addTaskModal";
import NoTaskFound from "./noTaskFound";
import SearchTask from "./searchTask";
import TaskActions from "./taskActions";
import TaskList from "./taskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I want to learn React",
    tags: ["react", "node", "js"],
    priority: "High",
    isFavourite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleSaveTask(newTask, isAddTask) {
    console.log(newTask);
    if (isAddTask) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setShowAddModal(true);
    setTaskToUpdate(task);
  }

  function handleDeleteTask(taskToDelete) {
    setTasks(
      tasks.filter((task) => {
        return task.id != taskToDelete.id;
      })
    );
  }
  function handleDeleteAllTask() {
    console.log("Delete");

    setTasks([]);
  }
  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleMakeFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  }

  function searchTask(termToSearch) {
    console.log(termToSearch);

    const filteredItems = tasks.filter((task) => {
      return task.title.toLowerCase().includes(termToSearch.toLowerCase());

      // console.log(task.title.toLowerCase().includes(termToSearch.toLowerCase()));// true
    });
    console.log(filteredItems);

    setTasks([...filteredItems]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleSaveTask}
          taskToUpdate={taskToUpdate}
          onClose={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={searchTask} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllTasks={handleDeleteAllTask}
          />

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleMakeFav}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
