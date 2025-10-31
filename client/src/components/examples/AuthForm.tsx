import { useState } from 'react';
import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <AuthForm
      mode={mode}
      onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
      onSubmit={(data) => console.log('Auth submitted:', data)}
    />
  );
}
