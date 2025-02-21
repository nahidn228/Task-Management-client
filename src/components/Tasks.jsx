import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Tasks = () => {
  const navigate = useNavigate();

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/tasks`);
      return res.data;
    },
  });

  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleUpdate = (taskId) => {
    navigate(`/tasks/update/${taskId}`);
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_URL}/tasks/${taskId}`)
          .then((res) => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const tasksInColumn = localTasks.filter(
        (task) => task.category === source.droppableId
      );
      const otherTasks = localTasks.filter(
        (task) => task.category !== source.droppableId
      );
      const newTasksInColumn = Array.from(tasksInColumn);
      const [movedTask] = newTasksInColumn.splice(source.index, 1);
      newTasksInColumn.splice(destination.index, 0, movedTask);
      setLocalTasks([...otherTasks, ...newTasksInColumn]);
    } else {
      const sourceTasks = localTasks.filter(
        (task) => task.category === source.droppableId
      );
      const destinationTasks = localTasks.filter(
        (task) => task.category === destination.droppableId
      );
      const otherTasks = localTasks.filter(
        (task) =>
          task.category !== source.droppableId &&
          task.category !== destination.droppableId
      );

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.category = destination.droppableId;
      destinationTasks.splice(destination.index, 0, movedTask);

      setLocalTasks([...otherTasks, ...sourceTasks, ...destinationTasks]);

      try {
        await axios.put(`http://localhost:5000/tasks/${draggableId}`, {
          category: destination.droppableId,
        });
        refetch();
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    }
  };

  const categories = [
    {
      id: 1,
      name: "To-Do",
      bgClass: "bg-gray-100 border border-gray-300 shadow-md",
      icon: <CiBoxList className="text-xl" />,
    },
    {
      id: 2,
      name: "In Progress",
      bgClass: "bg-blue-100 border border-blue-300 shadow-md",
      icon: <TbProgress className="text-xl animate-spin" />,
    },
    {
      id: 3,
      name: "Done",
      bgClass: "bg-green-100 border border-green-300 shadow-md",
      icon: <IoCheckmarkDoneCircleOutline className="text-xl" />,
    },
  ];

  return (
    <div className="  min-h-screen">
        <div className="container mx-auto ">
      <h2 className="text-3xl font-bold py-10 text-center flex items-center justify-center gap-2 ">
        <FaTasks /> Task Board
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {categories.map((column) => (
            <Droppable key={column.name} droppableId={column.name}>
              {(provided) => (
                <div
                  className={`${column.bgClass} bg-transparent  p-5 rounded-lg min-h-[300px]`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2
                    className={`text-xl font-bold mb-3  flex items-center justify-center gap-2 ${
                      column.id == 2 && "text-blue-600"
                    } ${column.id == 3 && "text-green-700"}`}
                  >
                    {column.icon} {column.name}
                  </h2>
                  {localTasks
                    .filter((task) => task.category === column.name)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3  rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 flex items-center gap-2 my-3"
                          >
                            <div className="">
                              <h3 className="font-semibold text-lg text-gray-800 uppercase">
                                {task.title}
                              </h3>
                              <p className="text-gray-600 mb-3">
                                {task.description}
                              </p>
                            </div>
                            {/* CTA Button */}
                            <div className="flex items-center gap-1">
                              <button
                                className="btn btn-sm btn-primary rounded-xl  text-white  transition duration-300"
                                onClick={() => handleUpdate(task._id)}
                              >
                                <FiEdit className="" />
                              </button>

                              <button
                                onClick={() => handleDelete(task._id)}
                                className="group relative flex h-9 w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2  bg-red-500 hover:bg-red-600"
                              >
                                <svg
                                  viewBox="0 0 1.625 1.625"
                                  className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                  height="9"
                                  width="9"
                                >
                                  <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                                  <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                                  <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                                </svg>
                                <svg
                                  width="12"
                                  fill="none"
                                  viewBox="0 0 39 7"
                                  className="origin-right duration-500 group-hover:rotate-90"
                                >
                                  <line
                                    strokeWidth="4"
                                    stroke="white"
                                    y2="5"
                                    x2="39"
                                    y1="5"
                                  ></line>
                                  <line
                                    strokeWidth="3"
                                    stroke="white"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1="12"
                                  ></line>
                                </svg>
                                <svg
                                  width="16"
                                  fill="none"
                                  viewBox="0 0 33 39"
                                  className=""
                                >
                                  <mask fill="white" id="path-1-inside-1_8_19">
                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                  </mask>
                                  <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="white"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  ></path>
                                  <path
                                    strokeWidth="4"
                                    stroke="white"
                                    d="M12 6L12 29"
                                  ></path>
                                  <path
                                    strokeWidth="4"
                                    stroke="white"
                                    d="M21 6V29"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
    </div>
  );
};

export default Tasks;
