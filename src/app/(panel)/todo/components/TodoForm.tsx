import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  onSubmitTodo: (todo: string) => void;
};

export const TodoForm = ({ onSubmitTodo }: TodoFormProps) => {
  const [todoInputValue, setTodoInputValue] = useState("");

  const handleSubmitTodo = () => {
    onSubmitTodo(todoInputValue);
    setTodoInputValue("");
  };

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
