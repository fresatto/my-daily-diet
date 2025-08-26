import React from "react";
import { Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFoodsQuery } from "@/services/queries/foods";

import { CreateMealSchema } from "../../schema";

export const MultiFoodField: React.FC = () => {
  const { data } = useFoodsQuery();

  const { control } = useFormContext<CreateMealSchema>();

  const { fields, append, remove } = useFieldArray<CreateMealSchema>({
    control,
    name: "items",
  });

  const handleAddFoodItem = () => {
    append({
      food_id: "",
      amount: 0,
    });
  };

  const handleRemoveFoodItem = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => {
        const shouldShowRemoveButton = index > 0;

        return (
          <FormItem key={field.id}>
            <div className="flex gap-2">
              <FormField
                control={control}
                name={`items.${index}.food_id`}
                render={({ field: renderedField, fieldState: { error } }) => (
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
                          {data?.foods?.map((food) => (
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
                control={control}
                name={`items.${index}.amount`}
                render={({ field: renderedField, fieldState: { error } }) => (
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

              <Button
                type="button"
                disabled={!shouldShowRemoveButton}
                variant={shouldShowRemoveButton ? "destructive" : "secondary"}
                onClick={() => handleRemoveFoodItem(index)}
              >
                <Trash />
              </Button>
            </div>
          </FormItem>
        );
      })}

      <Button type="button" variant="secondary" onClick={handleAddFoodItem}>
        Adicionar alimento
      </Button>
    </div>
  );
};
