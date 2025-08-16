"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DailyGoals } from "./components/DailyGoals";
import { DailyGoalSchema, dailyGoalSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDailyGoalMutation } from "@/services/queries/daily-goal";
import { toast } from "sonner";

export default function DailyGoal() {
  const form = useForm({
    defaultValues: {
      protein: "",
      carbohydrate: "",
      fat: "",
      calories: "",
    },
    resolver: zodResolver(dailyGoalSchema),
  });

  const { mutate: updateDailyGoal, isPending } = useDailyGoalMutation({
    onSuccess: () => {
      form.reset({
        protein: "",
        carbohydrate: "",
        fat: "",
        calories: "",
      });
      toast.success("Metas atualizadas com sucesso");
    },
  });

  const onSubmit = (data: DailyGoalSchema) => {
    updateDailyGoal(data);
  };

  return (
    <>
      <PageHeader title="Objetivos diários" />
      <div className="flex flex-col gap-4">
        <Card.Container>
          <h3 className="font-bold">Metas atuais</h3>
          <Suspense fallback={<DailyGoals.Loading />}>
            <DailyGoals.List />
          </Suspense>
        </Card.Container>
        <Card.Container>
          <div>
            <h3 className="font-bold">Alterar metas</h3>
            <p className="text-xs">
              Estabeleça suas metas diárias de macronutrientes
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proteínas (g)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade de proteínas"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carbohydrate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carboidratos (g)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade de carboidrato"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carbohydrate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gorduras (g)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade de gorduras"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carbohydrate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calorias (kcal)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade de calorias"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button loading={isPending} type="submit">
                Salvar
              </Button>
            </form>
          </Form>
        </Card.Container>
      </div>
    </>
  );
}
