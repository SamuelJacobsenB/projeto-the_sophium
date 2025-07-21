import { useState } from "react";

import { useRegister } from "../../../hooks";
import { Form, FormPage, Input, Textarea } from "../../../components/";
import {
  validateBio,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../validators";

import styles from "./styles.module.css";

export function Register() {
  const { register } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleRegister() {
    setErrors([]);

    const nameErrors = validateName(name);
    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password);
    let bioErrors: string[] = [];
    if (bio) bioErrors = validateBio(bio);
    let phoneErrors: string[] = [];
    if (phone) phoneErrors = validatePhone(phone);

    const validationErrors = [
      ...nameErrors,
      ...emailErrors,
      ...passwordErrors,
      ...phoneErrors,
      ...bioErrors,
    ];

    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    await register({ name, email, password, bio, phone });
  }

  return (
    <FormPage>
      <h1 className={styles.registerTitle}>Cadastro</h1>
      <hr />
      <Form
        onSubmit={handleRegister}
        submitText="Cadastrar"
        errors={errors}
        linkText="Ja possui uma conta? Entrar"
        linkHref="/login"
      >
        <Input
          label="Nome"
          type="text"
          placeholder="Digite seu nome"
          name="name"
          required
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
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
          minLength={8}
          maxLength={15}
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Textarea
          label="Biografia"
          name="bio"
          value={bio}
          onChange={(evt) => setBio(evt.target.value)}
        />
        <Input
          label="Telefone"
          type="tel"
          placeholder="(xx) xxxxx-xxxx"
          name="phone"
          value={phone}
          onChange={(evt) => setPhone(evt.target.value)}
        />
      </Form>
    </FormPage>
  );
}
