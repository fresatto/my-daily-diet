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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useNewMealDialogController } from "./useNewMealDialogController";

type NewMealDialogProps = {
  children: React.ReactNode;
};

export function NewMealDialog({ children }: NewMealDialogProps) {
  const {
    form,
    isOpen,
    handleOpenChange,
    onSubmit,
    foods,
    foodItemsFieldArray,
  } = useNewMealDialogController();

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

            {foodItemsFieldArray.fields.map((field, index) => {
              return (
                <FormItem key={field.id}>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.food_id`}
                      render={({
                        field: renderedField,
                        fieldState: { error },
                      }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              {...renderedField}
                              onValueChange={renderedField.onChange}
                            >
                              <SelectTrigger
                                className={cn(
                                  "w-full",
                                  error && "border-destructive"
                                )}
                                data-testid="new-meal-dialog-select-food-input"
                              >
                                <SelectValue placeholder="Alimento" />
                              </SelectTrigger>
                              <SelectContent>
                                {foods?.map((food) => (
                                  <SelectItem key={food.id} value={food.id}>
                                    <span data-testid="new-meal-food-option">
                                      {food.name} ({food.formattedPortionType})
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {error && <FormMessage>{error.message}</FormMessage>}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.amount`}
                      render={({
                        field: renderedField,
                        fieldState: { error },
                      }) => (
                        <FormItem className="w-[100px]">
                          <FormControl>
                            <Input
                              {...renderedField}
                              data-testid="new-meal-dialog-amount-input"
                              placeholder="Quantidade"
                              type="number"
                            />
                          </FormControl>
                          {error && <FormMessage>{error.message}</FormMessage>}
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              );
            })}
            <Button type="submit" data-testid="new-meal-dialog-submit-button">
              Cadastrar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
