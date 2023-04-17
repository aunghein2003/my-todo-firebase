import { RiDeleteBinLine } from "react-icons/ri";

function Todo() {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-200">
      <div className="flex items-center gap-x-3">
        <input type="checkbox" />
        <h3 className="text-lg">Learn React</h3>
      </div>
      <button>
        <RiDeleteBinLine className="text-lg" />
      </button>
    </div>
  );
}

export default Todo;
