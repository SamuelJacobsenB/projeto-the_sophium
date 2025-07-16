import { useState } from "react";

import { useLogin } from "../../../hooks";
import { Form, FormPage, Input } from "../../../components/";
import { validateEmail, validatePassword } from "../../../validators";

import styles from "./styles.module.css";

export function Login() {
  const { mutateAsync: login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleLogin() {
    setErrors([]);

    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password);
    setErrors([...emailErrors, ...passwordErrors]);

    if (errors.length > 0) return;

    await login({ email, password });
  }

  return (
    <FormPage>
      <h1 className={styles.loginTitle}>Login</h1>
      <hr />
      <Form
        onSubmit={handleLogin}
        submitText="Entrar"
        errors={errors}
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
