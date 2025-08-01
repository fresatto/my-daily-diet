"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMealSchema, createMealSchema } from "./schema";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodsResponse } from "@/@types/dtos";
import { useRouter } from "next/navigation";

export default function CreateMeal() {
  const router = useRouter();
  const form = useForm<CreateMealSchema>({
    defaultValues: {
      food_id: "",
      amount: 0,
    },
    resolver: zodResolver(createMealSchema),
  });

  const { mutate: createMeal } = useMutation({
    mutationFn: async (data: CreateMealSchema) => {
      const response = await api.post("/meals", data);
      return response.data;
    },
    onSuccess: () => {
      router.push("/meals");
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
    createMeal({ ...data, amount: Number(data.amount) });
  };

  return (
    <div>
      <PageHeader
        title="Cadastrar refeição"
        breadcrumbItems={[
          { label: "Refeições", href: "/meals" },
          { label: "Cadastrar refeição" },
        ]}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="food_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alimento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um alimento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {foodsData?.foods.map((food) => (
                      <SelectItem key={food.id} value={food.id}>
                        {food.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {form.formState.errors?.food_id?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Quantidade"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors?.amount?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Cadastrar refeição</Button>
        </form>
      </Form>
    </div>
  );
}
