import React, {useRef, useState} from "react";
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
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email': { setEmail(event.target.value); break }
      case 'password': { setPassword(event.target.value); break }
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Кто вы?</h1>
      <form className="login__form form">
        <FormGroup  labelFor="email">
          <Input placeholder={'email'} />
        </FormGroup>
        <FormGroup label="Пароль" labelFor="password">
          <input className="form__control" value={password} type="password" name="password" id="password" onChange={event => inputHandler(event)} autoComplete="off"/>
        </FormGroup>
        <div className="login__buttons">
          <button className="button button_primary" onClick={event => submitHandler(event)}>Попытаться войти</button>
        </div>
      </form>
    </section>
  )
}
