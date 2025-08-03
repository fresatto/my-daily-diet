"use client";

import { DailyGoalResponse, DailyGoalSummaryResponse } from "@/@types/dtos";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DailyGoal() {
  const { data } = useQuery({
    queryKey: ["daily-goal"],
    queryFn: async () => {
      const response = await api.get<DailyGoalResponse>("/daily-goal");

      return response.data;
    },
  });

  const { data: summary } = useQuery({
    queryKey: ["daily-goal-summary"],
    queryFn: async () => {
      const response = await api.get<DailyGoalSummaryResponse>(
        "/daily-goal/summary"
      );

      return response.data;
    },
  });

  const proteinConsumed = summary?.proteinConsumed || 0;
  const proteinGoal = data?.dailyGoal?.protein || 0;
  const proteinDifference = Number(proteinGoal - proteinConsumed).toFixed(1);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-2xl font-bold">
        {proteinConsumed}g / {proteinGoal}g
      </h3>
      <p className="text-center text-sm">
        Você consumiu <strong>{summary?.proteinConsumed}g</strong> de proteínas
        hoje, você está à <strong>{proteinDifference}g</strong> do seu objetivo.
      </p>
      <Button className="self-center" asChild>
        <Link href="/">Alterar objetivo</Link>
      </Button>
    </div>
  );
}
