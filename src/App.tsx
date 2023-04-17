import { FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Todos = {
  id: string;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  //Create Todo
  const createTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current?.value) {
      alert("Please add a text");
    } else {
      await addDoc(collection(db, "todos"), {
        text: ref.current.value,
        completed: false,
      });
      ref.current.value = "";
    }
  };

  //Read Todos from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      let todoArr: Todos[] = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id } as Todos);
      });
      setLoading(false);
      setTodos(todoArr);
    });

    return () => unsubscribe();
  }, []);

  //Update Todo from firebase
  const updateTodo = async (todo: Todos) => {
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, {
      completed: !todo.completed,
    });
  };

  //Delete Todo
  const deleteTodo = async (todo: Todos) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <div className="h-screen overflow-y-scroll p-5 shadow bg-gradient-to-r from-blue-500 via-sky-500 via-30% to-cyan-500">
      <div className="mx-auto p-5 py-7 max-w-lg rounded-md bg-white">
        <h1 className="text-2xl font-bold text-center text-black">Todo App</h1>
        <form
          className="w-full mt-5 p-5 flex justify-between items-center border rounded-md shadow"
          onSubmit={createTodo}
        >
          <input
            ref={ref}
            className="text-xl focus:outline-none"
            type="text"
            placeholder="Add todos"
          />
          <button className="text-xl" type="submit">
            <AiOutlinePlus />
          </button>
        </form>
        {loading && (
          <div className="p-2 mt-5 text-center text-2xl font-bold">
            Loading...
          </div>
        )}
        <div className="py-2 flex flex-col gap-y-2">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={updateTodo}
              deleteTodo={deleteTodo}
            />
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
