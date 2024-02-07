import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";
import fondo from "../images/ProtectRoutes.jpg";

function TaskPage() {
  const { getTasks, tasks, DeleteTask } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0)
    return (
      <div className="flex bg-gradient-to-tr from-black to-purple-900 ">
        <h1 className="m-auto  text-white text-2xl py-2 ">
        There are no tasks you want to create ? <Link to="/add-task" className="hover:text-purple-700 duration-500">Go</Link>
        </h1>
      </div>
    );

  return (
    <div className="container flex mx-auto p-4 bg-cover w-full min-h-screen  justify-center  h-screen" style={{ backgroundImage: `url(${fondo})` }}>
      <table className="w-2/4 h-96  ">
        <thead>
          <tr className="text-white">
            <th className="px-4 py-2 bg-gradient-to-tr from-blue-800 to-black text-white">Title</th>
            <th className="px-4 py-2  bg-gradient-to-tr from-blue-800 to-black">Description</th>
            <th className="px-4 py-2  bg-gradient-to-tr from-blue-800 to-black">Date</th>
            <th className="py-2 border-t-0 "></th>
            <th className=" py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="text-center text-white">
              <td className="px-4 py-2 border border-gray-400">{task.title}</td>
              <td className="px-4 py-2 border border-gray-400">
                {task.description}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {new Date(task.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border border-gray-400 ">
                <Link
                  to={`/tasks/${task._id}`}
                  className="bg-yellow-500 text-white px-7  rounded-xl"
                >
                  Edit
                </Link>
              </td>
              <td className="px-4 py-2 border border-gray-400 ">
                <button
                  className="bg-red-500  text-white px-5  rounded-xl"
                  onClick={() => {
                    DeleteTask(task._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <Link to="/add-task" >Back</Link>
      </footer>
    </div>
  );
}

export default TaskPage;
