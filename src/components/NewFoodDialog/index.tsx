import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateFoodSchema, createFoodSchema } from "./schema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

type NewFoodDialogProps = {
  children: React.ReactNode;
};

export function NewFoodDialog({ children }: NewFoodDialogProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      portion_amount: "",
      protein_per_portion: "",
      portion_type: "" as "unit" | "grams",
    },
    resolver: zodResolver(createFoodSchema),
  });

  const { mutate: createFood } = useMutation({
    mutationFn: async (data: CreateFoodSchema) => {
      const response = await api.post("/food", data);
      return response.data;
    },
  });

  const onSubmit = (data: CreateFoodSchema) => {
    createFood(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo alimento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Frango, Patinho, Salmão..."
                    />
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portion_amount"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Quantidade p/ porção</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Quantidade por porção" />
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="protein_per_portion"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Proteína p/ porção</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Proteína por porção" />
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portion_type"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Tipo de porção</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger
                        {...field}
                        className={cn("w-full", error && "border-destructive")}
                      >
                        <SelectValue placeholder="Selecione o tipo de porção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grams">Gramas</SelectItem>
                        <SelectItem value="unit">Unidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
