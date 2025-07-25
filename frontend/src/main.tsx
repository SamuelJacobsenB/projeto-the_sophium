import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "./contexts";
import { Message } from "./components";

import {
  App,
  CourseInfo,
  Courses,
  Enrollment,
  Login,
  Profile,
  Register,
  VerifyUser,
} from "./pages";

import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/variables.css";

import "react-quill/dist/quill.snow.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/:id/verify",
    element: <VerifyUser />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:slug/info",
    element: <CourseInfo />,
  },
  {
    path: "/courses/:slug/enrolled",
    element: <Enrollment />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Message />
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
