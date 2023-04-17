import { RiDeleteBinLine } from "react-icons/ri";
import { Todos } from "./App";

type Props = {
  todo: Todos;
  toggleComplete: (todo: Todos) => void;
  deleteTodo: (todo: Todos) => void;
};

function Todo({ todo, toggleComplete, deleteTodo }: Props) {
  return (
    <div
      className={`flex justify-between items-center p-5 ${
        todo.completed ? "bg-gray-400" : "bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-x-3">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed}
        />
        <h3
          onClick={() => toggleComplete(todo)}
          className={`text-lg cursor-pointer ${
            todo.completed && "line-through"
          }`}
        >
          {todo.text}
        </h3>
      </div>
      <button onClick={() => deleteTodo(todo)}>
        <RiDeleteBinLine className="text-lg" />
      </button>
    </div>
  );
}

export default Todo;
