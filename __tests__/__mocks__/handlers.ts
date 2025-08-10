import { http, HttpResponse } from "msw";

import { api } from "@/services/api";
import { foodsMock } from "./foods";

const baseURL = api.defaults.baseURL;

export const handlers = [
  http.get(`${baseURL}/food`, () => {
    return HttpResponse.json(foodsMock);
  }),
];
