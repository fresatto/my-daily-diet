import { Circle, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
};

export const TodoItem = ({ todo, onToggleTodo }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className={cn(todo.done && "line-through text-green-600")}>
        {todo.title}
      </h1>
      <Button variant="outline" onClick={() => onToggleTodo(todo.id)}>
        <span>Marcar como feito</span>
        {todo.done ? (
          <CircleCheck className="w-1 h-1" color="green" />
        ) : (
          <Circle className="w-1 h-1" />
        )}
      </Button>
    </div>
  );
};
