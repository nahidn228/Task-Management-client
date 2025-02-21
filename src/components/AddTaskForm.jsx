import axios from "axios";
import { useState } from "react";
import { BiCalendar } from "react-icons/bi";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newTask = {
      title,
      description,
      timestamp: new Date().toISOString(),
      category,
    };

    axios.post(`${import.meta.env.VITE_URL}/tasks`, newTask).then((res) => {
      if (res.data.insertedId) {
        alert("Task added successfully");
        setTitle("");
        setDescription("");
        setCategory("To-Do");
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto md:max-w-xl  shadow-lg rounded-lg p-6 my-10">
      <h2 className="text-2xl font-semibold   mb-4 flex items-center justify-center gap-2"><BiCalendar /> Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Field */}
        <div>
          <label className="block font-medium ">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <p className="text-xs  mt-1">Max 50 characters</p>
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium ">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
          <p className="text-xs  mt-1">Max 200 characters</p>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-medium ">Category</label>
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
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
          ➕ Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
