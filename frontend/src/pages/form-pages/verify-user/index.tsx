import { useState } from "react";
import { useParams } from "react-router-dom";

import { useVerifyUser } from "../../../hooks";
import { Form, FormPage, Input } from "../../../components/";

import styles from "./styles.module.css";

export function VerifyUser() {
  const { id } = useParams();

  const { mutateAsync: verifyUser } = useVerifyUser();

  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleVerifyUser() {
    setErrors([]);

    const tokenErrors: string[] = [];
    if (!token) tokenErrors.push("Token de verificação é obrigatório");
    if (token.length !== 6) tokenErrors.push("Token de verificação inválido");
    const idErrors: string[] = [];
    if (!id) idErrors.push("ID de usuário é obrigatório");

    const validationErrors = [...tokenErrors, ...idErrors];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;
    if (!id || !token) return;

    await verifyUser({ id, token });
  }

  return (
    <FormPage>
      <h1 className={styles.verifyUserTitle}>Verificação</h1>
      <p className={styles.verifyUserDescription}>
        Um token de verificação foi enviado para o seu email, digite-o abaixo:
      </p>
      <Form onSubmit={handleVerifyUser} submitText="Verificar" errors={errors}>
        <Input
          label="Token"
          type="text"
          placeholder="Digite seu token de verificação"
          name="token"
          minLength={6}
          maxLength={6}
          required
          value={token}
          onChange={(evt) => setToken(evt.target.value)}
        />
      </Form>
    </FormPage>
  );
}
