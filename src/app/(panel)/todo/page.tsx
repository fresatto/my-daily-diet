"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const mockedTodos: Todo[] = [
  { id: "1", title: "Fazer a tarefa", done: false },
  { id: "2", title: "Fazer a tarefa 2", done: false },
  { id: "3", title: "Fazer a tarefa 3", done: false },
  { id: "4", title: "Fazer a tarefa 4", done: false },
  { id: "5", title: "Fazer a tarefa 5", done: false },
];

export default function TodoPage() {
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>(mockedTodos);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleAddTodo = (title: string) => {
    setTodos([...todos, { id: generateId(), title, done: false }]);
    setTodoInputValue("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Adicionar todo"
        value={todoInputValue}
        onChange={(e) => setTodoInputValue(e.target.value)}
      />
      <Button onClick={() => handleAddTodo(todoInputValue)}>Adicionar</Button>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="flex items-center justify-between">
              <h1 className={cn(todo.done && "line-through text-green-600")}>
                {todo.title}
              </h1>
              <Button
                variant="outline"
                onClick={() => handleToggleTodo(todo.id)}
              >
                <span>Marcar como feito</span>
                {todo.done ? (
                  <CircleCheck className="w-1 h-1" color="green" />
                ) : (
                  <Circle className="w-1 h-1" />
                )}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
