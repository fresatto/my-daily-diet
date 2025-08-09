import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor, cleanup, fireEvent } from "@testing-library/react";

import Home from "../page";
import { api } from "@/services/api";
import { render } from "@/__tests__/customRender";
import {
  dailyGoalMock,
  dailyGoalSummaryMock,
} from "@/__tests__/__mocks__/daily-goal";
import { mealsMock } from "@/__tests__/__mocks__/meal";

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render consumed protein dashboard correctly", async () => {
    vi.spyOn(api, "get").mockImplementation((url) => {
      switch (url) {
        case "/daily-goal":
          return Promise.resolve({ data: dailyGoalMock });
        case "/daily-goal/summary":
          return Promise.resolve({
            data: dailyGoalSummaryMock,
          });
        case "/meals":
          return Promise.resolve({ status: 200, data: { meals: [] } }); // Mock vazio para este teste
        default:
          return Promise.resolve({ data: [] });
      }
    });

    render(<Home />);

    await waitFor(() => {
      const dailyProteinConsumed = screen.getByTestId(
        "daily-protein-consumed"
      ).innerHTML;

      const dailyGoalProtein =
        screen.getByTestId("daily-goal-protein").innerHTML;

      expect(dailyProteinConsumed).toBe(
        `${dailyGoalSummaryMock.proteinConsumed}g`
      );
      expect(dailyGoalProtein).toBe(
        `de ${dailyGoalMock.dailyGoal.protein}g meta diária`
      );

      expect(screen.getByText(/50%/)).toBeTruthy();
    });
  });

  it("should be able to render meals correctly", async () => {
    vi.spyOn(api, "get").mockImplementation((url) => {
      switch (url) {
        case "/daily-goal":
          return Promise.resolve({ data: dailyGoalMock });
        case "/daily-goal/summary":
          return Promise.resolve({
            data: dailyGoalSummaryMock,
          });
        case "/meals":
          return Promise.resolve({ status: 200, data: mealsMock });
        default:
          return Promise.resolve({ data: [] });
      }
    });

    const rendered = render(<Home />);

    await waitFor(() => {
      expect(rendered.getAllByTestId("meal-card")).toBeTruthy();
      expect(rendered.getAllByTestId("meal-name")).toBeTruthy();
      expect(rendered.getAllByTestId("meal-time")).toBeTruthy();
    });
  });

  it("should be able to render empty meals", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ status: 200, data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar."
        )
      ).toBeTruthy();
    });
  });

  it.only("should be able to add a new meal from dashboard", async () => {
    render(<Home />);

    const newMealButton = screen.getByTestId("new-meal-button");

    fireEvent.click(newMealButton);

    const dialogTitle = await screen.findByTestId("new-meal-dialog-title");
    const amountInput = screen.getByTestId("new-meal-dialog-amount-input");
    const selectFoodInput = screen.getByTestId(
      "new-meal-dialog-select-food-input"
    );

    expect(dialogTitle).toBeTruthy();
    expect(amountInput).toBeTruthy();
    expect(selectFoodInput).toBeTruthy();
  });
});
