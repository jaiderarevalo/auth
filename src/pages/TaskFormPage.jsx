import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { Link, useParams } from "react-router-dom"; //useparams obtener un objeto con los datos dinamicos de la url
import { useEffect } from "react";
import fondo from "../images/ProtectRoutes.jpg";

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm(); // setvalue
  const { createTask, getTask,UpdateTask } = useTask();
  //const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);
  const onSubmit = async (data) => {
  if(params.id){
    UpdateTask(params.id,data)
  }else{
    createTask(data);
  }
  //navigate("/tasks");
  };
  return (
    <div className=" flex py-8 bg-cover h-screen  "  style={{ backgroundImage: `url(${fondo})` }}>
     <section className="w-full flex justify-center h-96 ">
     <form
        className=" w-2/6 text-white px-20 pb-10 border-2 border-gray-600 rounded-2xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="text-center py-5 text-2xl">write your tasks to do</header>
        <div className="">
          <section>
            <h1>Title</h1>
          </section>
          <input
            className="w-full py-2 px-2"
            {...register("title", { required: true })}
            type="text"
            placeholder="whrite your title"
            autoFocus
          />
        </div>
        <div>
          <section>
            <h1>Description</h1>
          </section>
          <textarea
            className="w-full px-2"
            placeholder="Whrite your description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="flex mt-2">
          <button className="m-auto bg-blue-600 px-10 py-2 rounded-2xl  ">
            Enter
          </button>
        </div>
        <footer className="mt-5 text-center">
        <p>Do you want to see your tasks? <Link to="/tasks " className="hover:text-purple-500 duration-500" >Go</Link></p>
        </footer>
      </form>
     </section>
    </div>
  );
}

export default TaskFormPage;
