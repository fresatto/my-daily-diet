import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFoodsQuery } from "@/services/queries/foods";
import { useCreateMealMutation } from "@/services/queries/meals";

import { CreateMealSchema, createMealSchema } from "./schema";

export function useNewMealDialogController() {
  const form = useForm({
    resolver: zodResolver(createMealSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const { data: foodsData } = useFoodsQuery();
  const { mutate: createMeal } = useCreateMealMutation({
    onSuccess: () => {
      toast.success("Refeição cadastrada com sucesso");
      handleOpenChange(false);
    },
    onError: () => {
      toast.error("Erro ao cadastrar refeição");
    },
  });

  const handleOpenChange = (open: boolean) => {
    form.reset();
    setIsOpen(open);
  };

  const onSubmit = (data: CreateMealSchema) => {
    createMeal(data);
  };

  return {
    form,
    isOpen,
    handleOpenChange,
    onSubmit,
    foods: foodsData?.foods,
  };
}
