"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMealSchema, createMealSchema } from "./schema";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateMeal() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createMealSchema),
  });

  const { mutate: createMeal } = useMutation({
    mutationFn: async (data: CreateMealSchema) => {
      const response = await api.post("/meals", data);
      return response.data;
    },
  });

  const onSubmit = (data: CreateMealSchema) => {
    createMeal(data);
  };

  return (
    <div>
      <PageHeader title="Cadastrar alimento" />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Alimento" {...register("food_id")} />
        {errors.food_id && (
          <small className="text-red-500">{errors.food_id.message}</small>
        )}

        <Input placeholder="Quantidade" {...register("amount")} />
        {errors.amount && (
          <small className="text-red-500">{errors.amount.message}</small>
        )}

        <Button type="submit">Cadastrar refeição</Button>
      </form>
    </div>
  );
}
