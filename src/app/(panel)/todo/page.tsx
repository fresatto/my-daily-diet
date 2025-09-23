"use client";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

import { useTodos } from "./hooks/useTodos";

export default function TodoPage() {
  const { todos, handleAddTodo, handleToggleTodo } = useTodos();

  return (
    <div className="flex flex-col gap-2">
      <TodoForm onSubmitTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleTodo={handleToggleTodo} />
    </div>
  );
}
