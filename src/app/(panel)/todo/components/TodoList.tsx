import { Todo } from "../types";

import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
};

export const TodoList = ({ todos, onToggleTodo }: TodoListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} onToggleTodo={onToggleTodo} />
        </li>
      ))}
    </ul>
  );
};
