import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/tasks`)
      .then((data) => setTasks(data?.data));
  }, []);
  const handleDelete = (id) => {
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
          .delete(`http://localhost:5000/tasks/${id}`)
          .then((result) => {
            console.log(result);
            if (result) {
              setTasks(tasks.filter((task) => task._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error("Error deleting task:", error));
      }
    });
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
        <img
          src="https://img.icons8.com/?size=100&id=9w0CNdCWMuaG&format=png&color=000000"
          alt=""
          className="w-14"
        />{" "}
        Task Board
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-Do Column */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=8118&format=png&color=000000"
              alt=""
              className="w-4"
            />{" "}
            To-Do
          </h2>
          {tasks
            .filter((task) => task.category === "To-Do")
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-200 hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-gray-800 text-lg uppercase">
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                {/* CTA button */}
                <div className="flex gap-2">
                  <Link
                    to={`/tasks/update/${task._id}`}
                    className="btn btn-xs btn-accent"
                  >
                    Update
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* In Progress Column */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-lg border border-blue-300">
          <h2 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            <FaSpinner className="animate-spin text-blue-600" /> In Progress
          </h2>
          {tasks
            .filter((task) => task.category === "In Progress")
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-lg shadow-md mb-3 border border-blue-200 hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-blue-800 text-lg uppercase">
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                {/* CTA button */}
                <div className="flex gap-2">
                  <Link
                    to={`/tasks/update/${task._id}`}
                    className="btn btn-xs btn-accent"
                  >
                    Update
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Done Column */}
        <div className="bg-green-100 p-6 rounded-xl shadow-lg border border-green-300">
          <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" /> Done
          </h2>
          {tasks
            .filter((task) => task.category === "Done")
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-lg shadow-md mb-3 border border-green-200 hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-green-800 text-lg uppercase">
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                {/* CTA button */}
                <div className="flex gap-2">
                  <Link
                    to={`/tasks/update/${task._id}`}
                    className="btn btn-xs btn-accent"
                  >
                    Update
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
