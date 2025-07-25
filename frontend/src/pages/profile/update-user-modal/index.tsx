import { useEffect, useState } from "react";

import { useUpdateUser } from "../../../hooks";
import { Form, Input, Modal, Textarea } from "../../../components";
import { validateSlug, validateName, validateBio } from "../../../validators";

import styles from "./styles.module.css";
import { useUser } from "../../../contexts";
import type { UpdateUserDTO } from "../../../types";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateUserModal({ isOpen, onClose }: UpdateUserModalProps) {
  const { user } = useUser();

  const { updateUser } = useUpdateUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit() {
    if (!user) return;

    setErrors([]);

    const nameErrors = validateName(name);
    let phoneErrors: string[] = [];
    if (phone) phoneErrors = validateSlug(phone);
    let bioErrors: string[] = [];
    if (bio) bioErrors = validateBio(bio);

    const validationErrors = [...nameErrors, ...phoneErrors, ...bioErrors];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    const dto: UpdateUserDTO = {
      name,
      phone,
      bio,
    };

    try {
      await updateUser({ dto, id: user.id });

      onClose();
    } catch (error) {
      console.log("Error to update course:", error);
    }
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      setBio(user.bio || "");
    }
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className={styles.modalTitle}>Editar Usuário</h1>
      <hr />
      <Form
        onSubmit={async () => await handleSubmit()}
        errors={errors}
        submitText="Salvar alterações"
      >
        <Input
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Telefone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Textarea
          label="Biografia"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Form>
    </Modal>
  );
}
