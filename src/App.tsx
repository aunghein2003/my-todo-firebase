import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState(["Learn React", "Grint Leetcode"]);

  return (
    <div className="h-screen p-5 shadow bg-gradient-to-r from-blue-500 via-sky-500 via-30% to-cyan-500">
      <div className="mx-auto p-5 py-7 max-w-lg rounded-md bg-white">
        <h1 className="text-2xl font-bold text-center text-black">Todo App</h1>
        <form className="w-full mt-5 p-5 flex justify-between items-center border rounded-md shadow">
          <input
            className="text-xl focus:outline-none"
            type="text"
            placeholder="Add todos"
          />
          <button className="text-xl" type="submit">
            <AiOutlinePlus />
          </button>
        </form>
        <div className="py-2 flex flex-col gap-y-2">
          {todos.map((todo) => (
            <Todo key={todo} />
          ))}
        </div>
        <h3 className="text-lg font-semibold text-center py-3">
          You have {todos.length} todos
        </h3>
      </div>
    </div>
  );
}

export default App;
