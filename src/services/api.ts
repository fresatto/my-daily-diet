import axios from "axios";

import { getTimeZone } from "@/lib/date";

const timezone = getTimeZone();

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "X-Timezone": timezone,
  },
});
