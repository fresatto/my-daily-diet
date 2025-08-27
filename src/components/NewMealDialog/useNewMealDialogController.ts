"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFoodsQuery } from "@/services/queries/foods";
import { useCreateMealMutation } from "@/services/queries/meals";

import { CreateMealSchema, createMealSchema } from "./schema";
import { useConsumedMealsMutation } from "@/services/queries/consumed-meals";

export function useNewMealDialogController() {
  const form = useForm({
    defaultValues: {
      name: "",
      items: [
        {
          food_id: "",
          amount: undefined,
        },
      ],
    },
    resolver: zodResolver(createMealSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const { data: foodsData } = useFoodsQuery();

  const { mutate: createConsumedMeal, isPending: isCreatingConsumedMeal } =
    useConsumedMealsMutation({
      onSuccess: () => {
        toast.success("Refeição adicionada com sucesso!");
      },
    });

  const { mutate: createMeal, isPending } = useCreateMealMutation({
    onSuccess: ({ id: meal_id }) => {
      createConsumedMeal({ meal_id });
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
    isPending: isPending || isCreatingConsumedMeal,
    foods: foodsData?.foods,
  };
}
