"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMealSchema, createMealSchema } from "./schema";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodsResponse } from "@/@types/dtos";

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

  const { data: foodsData } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await api.get<FoodsResponse>("/food");
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

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Alimentos</SelectLabel>
              {foodsData?.foods.map((food) => (
                <SelectItem key={food.id} value={food.id}>
                  {food.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="submit">Cadastrar refeição</Button>
      </form>
    </div>
  );
}
