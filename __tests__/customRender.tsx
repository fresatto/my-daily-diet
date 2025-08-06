import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

export const render = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const queryClient = new QueryClient();

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  });
};
