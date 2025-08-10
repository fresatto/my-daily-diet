import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor, cleanup, fireEvent } from "@testing-library/react";

import Home from "../page";
import { api } from "@/services/api";
import { render } from "@/__tests__/customRender";
import { server } from "@/__tests__/__mocks__/node";
import { newMealMock } from "@/__tests__/__mocks__/meals";
import {
  dailyGoalMock,
  dailyGoalSummaryMock,
} from "@/__tests__/__mocks__/daily-goal";
import { foodsMock } from "@/__tests__/__mocks__/foods";

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render consumed protein dashboard correctly", async () => {
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
    const rendered = render(<Home />);

    await waitFor(() => {
      expect(rendered.getAllByTestId("meal-card")).toBeTruthy();
      expect(rendered.getAllByTestId("meal-name")).toBeTruthy();
      expect(rendered.getAllByTestId("meal-time")).toBeTruthy();
    });
  });

  it("should be able to render empty meals", async () => {
    server.use(
      http.get(`${api.defaults.baseURL}/meals`, () => {
        return HttpResponse.json([]);
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Nenhuma refeição cadastrada. Clique no botão abaixo para cadastrar."
        )
      ).toBeTruthy();
    });
  });

  it("should be able to display new meal dialog errors correctly", async () => {
    render(<Home />);

    const newMealButton = screen.getByTestId("new-meal-button");

    fireEvent.click(newMealButton);

    const submitButton = screen.getByTestId("new-meal-dialog-submit-button");

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Alimento é obrigatório")).toBeTruthy();
      expect(screen.getByText("Campo obrigatório")).toBeTruthy();
    });
  });

  it("should be able to register a new meal", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("meal-card")).toBeTruthy();
      expect(screen.getAllByTestId("meal-name")).toBeTruthy();
      expect(screen.getAllByTestId("meal-time")).toBeTruthy();
    });

    const newMealButton = screen.getByTestId("new-meal-button");

    fireEvent.click(newMealButton);

    const selectFoodInput = document.querySelector('select[name="food_id"]');
    const firstFoodOption = screen.findByText("Frango (g)");
    const amountInput = screen.getByTestId("new-meal-dialog-amount-input");
    const submitButton = screen.getByTestId("new-meal-dialog-submit-button");

    expect(amountInput).toBeTruthy();
    expect(selectFoodInput).toBeTruthy();
    expect(firstFoodOption).toBeTruthy();
    expect(selectFoodInput).toBeTruthy();

    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.change(selectFoodInput!, {
      target: { value: foodsMock.foods[0].id },
    });

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(newMealMock.food.name)).toBeTruthy();
    });
  });
});
