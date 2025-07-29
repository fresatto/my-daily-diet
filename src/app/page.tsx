"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/Typography";
import { api } from "@/services/api";
import { DailyGoalRequest } from "@/@types/dtos";

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

  return (
    <div className=" flex flex-col p-4 gap-4 max-w-lg mx-auto items-center justify-center w-full h-screen">
      <Typography size="h1">
        Antes de começar, vamos definir o seu objetivo diário
      </Typography>

      <Input type="number" placeholder="Insira seu objetivo diário" />
      <Button
        className="w-full"
        onClick={() => mutate({ protein: 100 })}
        disabled={isPending}
      >
        {isPending ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
