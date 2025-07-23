import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useVerifyUser } from "../../../hooks";
import { LoadPage } from "../";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const { isVerified, isLoading, error } = useVerifyUser();

  useEffect(() => {
    if (!isLoading && (!isVerified || error)) {
      navigate("/login");
    }
  }, [isLoading, isVerified, error, navigate]);

  if (isLoading) return <LoadPage />;

  if (isVerified) return <>{children}</>;

  return null;
}
