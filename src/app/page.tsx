import ClearTodo from "@/components/ClearTodo";
import CreateTodo from "@/components/CreateTodo";
import TodoItem from "@/components/TodoItem";

const mockTodo = [
  {
    id: 1,
    title: "Todo item 01",
    done: false,
  },
  {
    id: 2,
    title: "Todo item 02",
    done: false,
  },
];
export default function Home() {
  return (
    <>
      <div className="container">
        <div className="my-3">
          <div className="mb-2">
            <CreateTodo></CreateTodo>
          </div>
          <div className="flex justify-between">
            <h1>Todo list ({mockTodo.length})</h1>
            <ClearTodo></ClearTodo>
          </div>
        </div>
        <div>
          <ul className="space-y-1.5">
            {mockTodo.map((todo) => (
              <li key={todo.id}>
                <TodoItem key={todo.id} todo={todo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
