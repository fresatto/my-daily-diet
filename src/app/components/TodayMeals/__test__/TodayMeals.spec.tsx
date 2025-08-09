import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen } from "@testing-library/react";

import { mealsMock } from "@/__tests__/__mocks__/meal";
import { render } from "@/__tests__/customRender";
import { TodayMeals } from "../index";

describe("HOME | components/TodayMeals", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render empty state correctly", () => {
    render(<TodayMeals />);

    expect(
      screen.getByText(
        "Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar."
      )
    ).toBeTruthy();
  });

  it("should render meals correctly", () => {
    const formattedMeals = mealsMock.meals.map((meal) => ({
      ...meal,
      formattedTime: "às 10:00",
    }));

    render(<TodayMeals meals={formattedMeals} />);

    expect(screen.getByText("Refeições de hoje")).toBeTruthy();
    expect(screen.getByText("Arroz")).toBeTruthy();
    expect(screen.getAllByText("às 10:00")).toBeTruthy();
    expect(screen.getAllByText("100g")).toBeTruthy();
    expect(screen.getAllByText("proteína")).toBeTruthy();
  });
});
