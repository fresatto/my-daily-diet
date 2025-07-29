export type Food = {
  id: string;
  name: string;
  portion_type: "grams" | "unit";
  portion_amount: number;
  protein_per_portion: number;
};
