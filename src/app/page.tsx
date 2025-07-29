"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/Typography";
import { api } from "@/services/api";
import { DailyGoalRequest } from "@/@types/dtos";
import { DailyGoalSchema, dailyGoalSchema } from "./schema";

export default function Home() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: DailyGoalRequest) => {
      const response = await api.post("/daily-goal", data);
      return response.data;
    },
    onSuccess: () => {
      router.push("/foods");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dailyGoalSchema),
  });

  const onSubmit = (data: DailyGoalSchema) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col p-4 gap-4 max-w-lg mx-auto items-center justify-center w-full h-screen">
      <Typography size="h1">
        Antes de começar, vamos definir o seu objetivo diário
      </Typography>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Insira seu objetivo diário"
          {...register("protein")}
        />
        {errors.protein && (
          <p className="text-red-500">{errors.protein.message}</p>
        )}

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  );
}
