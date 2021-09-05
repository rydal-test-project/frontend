import React, {useState} from "react";
import FormGroup from "../../ui/FormGroup";
import {useInstance} from "react-ioc";
import AuthService from "../../../services/auth";
import {Input} from "../../ui";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = useInstance(AuthService);
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    authService.login({ email, password }).then(() => {
      authService.init();
    }).catch(() => {
      setPassword('');
    });
  };

  return (
    <section className="login">
      <h1 className="login__title">Кто вы?</h1>
      <form className="login__form form">
        <FormGroup >
          <Input placeholder="Email" onChange={setEmail} />
        </FormGroup>
        <FormGroup  >
          <Input placeholder="Пароль" onChange={setPassword} />
        </FormGroup>
        <div className="login__buttons">
          <button className="button button_primary" onClick={event => submitHandler(event)}>Попытаться войти</button>
        </div>
      </form>
    </section>
  )
}
