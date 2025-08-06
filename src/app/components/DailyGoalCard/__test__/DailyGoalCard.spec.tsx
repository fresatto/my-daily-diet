import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { DailyGoalCard } from "../index";

describe("HOME | components/DailyGoalCard", () => {
  it("should render correctly", () => {
    render(
      <DailyGoalCard
        dailyProteinConsumed={10}
        dailyGoalProtein={100}
        dailyGoalPercentage={17}
      />
    );

    expect(screen.getByText("10g")).toBeTruthy();
    expect(screen.getByText("de 100g meta diária")).toBeTruthy();
    expect(screen.getByText("17% do objetivo diário"));
  });
});
