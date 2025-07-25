import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts";
import {
  useCoursesByEnrollment,
  useDeleteAvatar,
  useUpdateAvatar,
} from "../../hooks";
import {
  Button,
  CourseCard,
  DualPage,
  I,
  ImageButton,
  Loader,
  LoadPage,
  PrivateRoute,
  Title,
} from "../../components";
import { UpdateUserModal } from "./update-user-modal";

import styles from "./styles.module.css";

export function Profile() {
  const navigate = useNavigate();

  const { user } = useUser();

  const { courses, isLoading, error } = useCoursesByEnrollment();

  const { updateAvatar } = useUpdateAvatar();
  const { deleteAvatar } = useDeleteAvatar();

  const [isEditUserOpen, setEditUserOpen] = useState(false);

  if (!user) return <LoadPage />;

  return (
    <PrivateRoute>
      <UpdateUserModal
        isOpen={isEditUserOpen}
        onClose={() => setEditUserOpen(false)}
      />
      <DualPage
        sideBar={
          <>
            <div className={styles.userAvatar}>
              {user.avatarID ? (
                <img
                  src={user.avatar?.path}
                  alt="Avatar"
                  className={styles.avatar}
                />
              ) : (
                <I.user_profile className={styles.userProfileIcon} />
              )}
              <div className={styles.userAvatarButtons}>
                <ImageButton
                  onChange={(file) => {
                    if (!file) return;

                    updateAvatar(file);
                  }}
                >
                  Alterar foto
                </ImageButton>
                {user.avatarID && (
                  <Button
                    onClick={async () => {
                      await deleteAvatar();
                    }}
                    className="btn btn-danger"
                  >
                    Remover foto
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{user.name}</h2>
              <small className={styles.userEmail}>{user.email}</small>
              {user.phone && (
                <small className={styles.userPhone}>
                  Telefone: {user.phone}
                </small>
              )}
            </div>
            <Button
              className="btn btn-info"
              onClick={() => setEditUserOpen(true)}
            >
              Editar perfil
            </Button>
          </>
        }
        content={
          <>
            <Title title="Biografia" size="2rem" />
            <p className={styles.userBio}>{user.bio || "Sem biografia."}</p>
            <Title title="Cursos matriculados" size="2rem" />
            {isLoading && <Loader />}
            {error && <p>Houve um erro ao carregar os cursos matriculados.</p>}
            {!isLoading && !error && (
              <ul className={styles.userCourses}>
                {courses && courses.length ? (
                  courses.map((course) => (
                    <li key={course.id}>
                      <CourseCard.Root>
                        <CourseCard.Image
                          src={course.file?.path}
                          alt={course.title}
                        />
                        <CourseCard.Info
                          title={course.title}
                          description={course.description}
                        />
                        <CourseCard.Actions
                          onClick={() => navigate(`/courses/${course.id}/info`)}
                        />
                      </CourseCard.Root>
                    </li>
                  ))
                ) : (
                  <p>Você não está matriculado em nenhum curso.</p>
                )}
              </ul>
            )}
          </>
        }
        sideBarClassName={styles.sideBar}
      />
    </PrivateRoute>
  );
}
