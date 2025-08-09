import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  RenderOptions,
} from "@testing-library/react";

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
        staleTime: 0,
      },
    },
  });
};

export const render = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const queryClient = getQueryClient();

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  });
};

export const renderHook = (callback: () => void) => {
  const queryClient = getQueryClient();

  return rtlRenderHook(callback, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};
