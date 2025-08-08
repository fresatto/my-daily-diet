import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Home from "../page";
import { api } from "@/services/api";
import { render } from "@/__tests__/customRender";
import {
  dailyGoalMock,
  dailyGoalSummaryMock,
} from "@/__tests__/__mocks__/daily-goal";

describe("Home", () => {
  it("should render consumed protein dashboard correctly", async () => {
    vi.spyOn(api, "get").mockImplementation((url) => {
      switch (url) {
        case "/daily-goal":
          return Promise.resolve({ data: dailyGoalMock });
        case "/daily-goal/summary":
          return Promise.resolve({
            data: dailyGoalSummaryMock,
          });
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
});
