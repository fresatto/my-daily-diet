"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFoodSchema, CreateFoodSchema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";

export default function CreateFood() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFoodSchema),
  });

  const { mutate: createFood } = useMutation({
    mutationFn: async (data: CreateFoodSchema) => {
      const response = await api.post("/food", data);
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });

  const onSubmit = (data: CreateFoodSchema) => {
    createFood(data);
  };

  return (
    <div>
      <PageHeader
        title="Cadastrar alimento"
        breadcrumbItems={[
          { label: "Alimentos cadastrados", href: "/foods" },
          { label: "Cadastrar alimento" },
        ]}
      />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Nome" {...register("name")} />
        {errors.name && (
          <small className="text-red-500">{errors.name.message}</small>
        )}
        <Input
          placeholder="Quantidade (porção)"
          {...register("portion_amount")}
        />
        {errors.portion_amount && (
          <small className="text-red-500">
            {errors.portion_amount.message}
          </small>
        )}
        <Input
          placeholder="Proteína (porção)"
          {...register("protein_per_portion")}
        />
        {errors.protein_per_portion && (
          <small className="text-red-500">
            {errors.protein_per_portion.message}
          </small>
        )}
        <Input
          placeholder="Tipo de porção (grams ou unit)"
          {...register("portion_type")}
        />
        {errors.portion_type && (
          <small className="text-red-500">{errors.portion_type.message}</small>
        )}
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
