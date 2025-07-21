import { useState } from "react";

import { useUser, useMessage } from "../../../contexts";
import { useLogin } from "../../../hooks";
import { Form, FormPage, Input } from "../../../components/";
import { validateEmail, validatePassword } from "../../../validators";

import styles from "./styles.module.css";

export function Login() {
  const { findUser } = useUser();
  const { login } = useLogin();
  const { showMessage } = useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleLogin() {
    setErrors([]);

    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password);

    const validationErrors = [...emailErrors, ...passwordErrors];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    await login({ email, password });

    try {
      await findUser();
    } catch {
      showMessage("Usuário não encontrado", "error");
    }
  }

  return (
    <FormPage>
      <h1 className={styles.loginTitle}>Login</h1>
      <hr />
      <Form
        onSubmit={handleLogin}
        submitText="Entrar"
        errors={errors}
        linkText="Não possui uma conta? Registrar"
        linkHref="/register"
        className={styles.loginForm}
      >
        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          name="email"
          required
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          name="password"
          required
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </Form>
    </FormPage>
  );
}
