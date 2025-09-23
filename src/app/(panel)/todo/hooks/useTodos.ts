import { useCallback, useState } from "react";
import { Todo } from "../types";

const mockedTodos: Todo[] = [
  { id: "1", title: "Fazer a tarefa", done: false },
  { id: "2", title: "Fazer a tarefa 2", done: false },
  { id: "3", title: "Fazer a tarefa 3", done: false },
  { id: "4", title: "Fazer a tarefa 4", done: false },
  { id: "5", title: "Fazer a tarefa 5", done: false },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(mockedTodos);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleAddTodo = useCallback((title: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { id: generateId(), title, done: false },
    ]);
  }, []);

  const handleToggleTodo = useCallback((id: string) => {
    setTodos((oldTodos) =>
      oldTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  return { todos, handleAddTodo, handleToggleTodo };
};
