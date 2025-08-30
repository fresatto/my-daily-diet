"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNewMealDialogController } from "./useNewMealDialogController";
import { MultiFoodField } from "./components/MultiFoodField";

type NewMealDialogProps = {
  children: React.ReactNode;
};

export function NewMealDialog({ children }: NewMealDialogProps) {
  const { form, isOpen, handleOpenChange, onSubmit, isPending } =
    useNewMealDialogController();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent data-testid="new-meal-dialog-content">
        <DialogHeader>
          <DialogTitle data-testid="new-meal-dialog-title">
            Nova refeição
          </DialogTitle>
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
                      placeholder="Insira o nome da refeição"
                      type="text"
                    />
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
            <MultiFoodField />
            <Button
              disabled={isPending}
              loading={isPending}
              type="submit"
              data-testid="new-meal-dialog-submit-button"
            >
              Cadastrar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
