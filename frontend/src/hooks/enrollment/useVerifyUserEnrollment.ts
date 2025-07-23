import { useState, useEffect, useCallback } from "react";
import { useUser } from "../../contexts";

export function useVerifyUserEnrollment(courseId: string) {
  const { user } = useUser();

  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  const checkEnrollment = useCallback(() => {
    if (!user?.enrollments || !courseId) return;

    const found = user?.enrollments.some(
      (enrollment) => enrollment.course_id === courseId
    );

    setIsEnrolled(found);
  }, [user?.enrollments, courseId]);

  useEffect(() => {
    checkEnrollment();
  }, [checkEnrollment]);

  return { isEnrolled, checkEnrollment };
}
