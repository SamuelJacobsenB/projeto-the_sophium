import type { Role, Enrollment, File } from "../";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  roles: Role[];
  avatar_id: string | null;
  avatar: File | null;
  enrollments: Enrollment[];
  created_at: Date;
  updated_at: Date;
}
