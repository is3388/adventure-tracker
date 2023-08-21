import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "../components/Nav";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  
  const [email, setEmail] = useState("robert@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate()
  const {login, isAuthenticated, error, clearLoginError} = useAuth()

  useEffect(() => {
    clearLoginError()
    if (isAuthenticated) {
      navigate('/app', {replace: true}) // remove login page in the history stack for Back buttun
    }
  }, [isAuthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    if (email && password)
      login(email, password)
    
  }

    return (
    <main className={styles.login}>
      <Nav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
      {error && <span className={styles.error}>{error}</span>}
    </main>
  );
}
