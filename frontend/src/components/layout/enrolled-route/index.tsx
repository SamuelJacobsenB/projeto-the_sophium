import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../../contexts";
import { useVerifyUser, useVerifyUserEnrollment } from "../../../hooks";
import { LoadPage } from "../";

interface PrivateRouteProps {
  children: React.ReactNode;
  courseId: string;
}

export function EnrolledRoute({ children, courseId }: PrivateRouteProps) {
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const { isVerified, isLoading, error } = useVerifyUser();
  const { isEnrolled } = useVerifyUserEnrollment(courseId);

  useEffect(() => {
    if (!isLoading && (!isVerified || error)) {
      showMessage("Usuário deve estar logado", "error");
      navigate("/login");
    } else if (!isLoading && isVerified && isEnrolled === null) {
      showMessage("Usuário deve estar matriculado no curso", "error");
      navigate(`/courses`);
    }
  }, [isLoading, isVerified, isEnrolled, error, showMessage, navigate]);

  if (isLoading) return <LoadPage />;

  if (isVerified && isEnrolled) return <>{children}</>;

  return null;
}
