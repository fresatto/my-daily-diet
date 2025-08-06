import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TodayMeals } from "../index";
import { mealsMock } from "../../../../../__tests__/__mocks__/meal";

describe("HOME | components/TodayMeals", () => {
  it("should render empty state correctly", () => {
    render(<TodayMeals />);

    expect(
      screen.getByText(
        "Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar."
      )
    ).toBeTruthy();
  });

  it("should render meals correctly", () => {
    const formattedMeals = mealsMock.map((meal) => ({
      ...meal,
      formattedTime: "às 10:00",
    }));

    render(<TodayMeals meals={formattedMeals} />);

    expect(screen.getByText("Refeições de hoje")).toBeTruthy();
    expect(screen.getByText("Arroz")).toBeTruthy();
    expect(screen.getByText("às 10:00")).toBeTruthy();
    expect(screen.getByText("100g")).toBeTruthy();
    expect(screen.getByText("proteína")).toBeTruthy();
  });
});
