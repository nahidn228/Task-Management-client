import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TasksUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/task/${id}`)
      .then((result) => {
        const taskData = result.data;
        setTitle(taskData.title || "");
        setDescription(taskData.description || "");
        setCategory(taskData.category || "To-Do");
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      title,
      description,
      category,
    };

    axios
      .put(`${import.meta.env.VITE_URL}/tasks/${id}`, updateData)
      .then(() => {
        // console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/tasks");
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        📝 Update Task
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Max 50 characters</p>
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Max 200 characters</p>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">📌 To-Do</option>
            <option value="In Progress">🚧 In Progress</option>
            <option value="Done">✅ Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TasksUpdate;
