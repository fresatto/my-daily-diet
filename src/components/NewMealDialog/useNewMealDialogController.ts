import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFoodsQuery } from "@/services/queries/foods";
import { CreateMealSchema, createMealSchema } from "./schema";

export function useNewMealDialogController() {
  const form = useForm({
    resolver: zodResolver(createMealSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const { data: foodsData } = useFoodsQuery();

  const handleOpenChange = (open: boolean) => {
    form.reset();
    setIsOpen(open);
  };

  const onSubmit = (data: CreateMealSchema) => {
    console.log(data);
  };

  return {
    form,
    isOpen,
    handleOpenChange,
    onSubmit,
    foods: foodsData?.foods,
  };
}
