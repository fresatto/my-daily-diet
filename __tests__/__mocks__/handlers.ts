import { http, HttpResponse } from "msw";

import { api } from "@/services/api";
import { foodsMock } from "./foods";
import { mealsMock, newMealMock } from "./meals";
import { dailyGoalMock, dailyGoalSummaryMock } from "./daily-goal";

const baseURL = api.defaults.baseURL;

export const handlers = [
  // Foods
  http.get(`${baseURL}/food`, () => {
    return HttpResponse.json(foodsMock);
  }),

  // Meals
  http.get(`${baseURL}/meals`, () => {
    return HttpResponse.json(mealsMock);
  }),
  http.post(`${baseURL}/meals`, () => {
    mealsMock.meals.push(newMealMock);

    return HttpResponse.json(mealsMock);
  }),

  // Daily Goal
  http.get(`${baseURL}/daily-goal`, () => {
    return HttpResponse.json(dailyGoalMock);
  }),
  http.get(`${baseURL}/daily-goal/summary`, () => {
    return HttpResponse.json(dailyGoalSummaryMock);
  }),
];
