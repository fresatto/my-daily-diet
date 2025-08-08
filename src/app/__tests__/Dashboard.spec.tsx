import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import Home from "../page";
import { api } from "@/services/api";
import { render } from "@/__tests__/customRender";
import { dailyGoalMock } from "@/__tests__/__mocks__/daily-goal";

describe("Home", () => {
  it("should render the home page", async () => {
    vi.spyOn(api, "get").mockImplementation((url) => {
      switch (url) {
        case "/daily-goal":
          return Promise.resolve({ data: dailyGoalMock });
        case "/daily-goal/summary":
          return Promise.resolve({
            data: {
              proteinConsumed: 100,
              achieved: true,
            },
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

      expect(dailyProteinConsumed).toBe("100g");
    });
  });
});
