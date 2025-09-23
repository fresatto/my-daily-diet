import { memo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  onSubmitTodo: (todo: string) => void;
};

const TodoFormBase = ({ onSubmitTodo }: TodoFormProps) => {
  const [todoInputValue, setTodoInputValue] = useState("");

  const handleSubmitTodo = () => {
    onSubmitTodo(todoInputValue);
    setTodoInputValue("");
  };

  console.log("renderizou todo form");

  return (
    <>
      <Input
        placeholder="Adicionar todo"
        value={todoInputValue}
        onChange={(e) => setTodoInputValue(e.target.value)}
      />
      <Button onClick={handleSubmitTodo}>Adicionar</Button>
    </>
  );
};

export const TodoForm = memo(TodoFormBase);
