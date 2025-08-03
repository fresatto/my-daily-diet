import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateMealSchema, createMealSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type NewMealDialogProps = {
  children: React.ReactNode;
};

export function NewMealDialog({ children }: NewMealDialogProps) {
  const form = useForm({
    resolver: zodResolver(createMealSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const onSubmit = (data: CreateMealSchema) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova refeição</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="food_id"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Alimento</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger
                        {...field}
                        className={cn("w-full", error && "border-destructive")}
                      >
                        <SelectValue placeholder="Selecione o alimento" />
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
            <FormField
              control={form.control}
              name="amount"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
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
            <Button type="submit">Cadastrar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
