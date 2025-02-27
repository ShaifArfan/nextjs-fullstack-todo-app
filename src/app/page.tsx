import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClearTodo from "@/components/ClearTodo";
import CreateTodo from "@/components/CreateTodo";
import TodoItem from "@/components/TodoItem";
import { prisma } from "@/prisma/prisma";

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
export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="container">
        <div className="my-3">
          <div className="mb-2">
            <CreateTodo></CreateTodo>
          </div>
          <div className="flex justify-between">
            <h1>Todo list ({todos.length})</h1>
            <ClearTodo></ClearTodo>
          </div>
        </div>
        <div>
          {todos.length < 1 ? (
            <p>No todo found</p>
          ) : (
            <ul className="space-y-1.5">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem key={todo.id} todo={todo} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
