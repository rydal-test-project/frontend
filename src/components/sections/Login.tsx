import React, {useContext, useState} from "react";
import FormGroup from "../form/FormGroup";
import Auth from "../../services/auth";
import {storesContext} from "../../stores";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const stores = useContext(storesContext);
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stores.userStore.setInLoggingState(true);

    Auth.login({ email, password})
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        stores.userStore.setIsLogged(true);
      })
      .catch(err => {
        console.error(err);
        setPassword('');
      })
      .finally(() => stores.userStore.setInLoggingState(false))
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
        <FormGroup label="Логин" labelFor="email">
          <input className="form__control" type="email" name="email" id="email" onChange={event => inputHandler(event)}/>
        </FormGroup>
        <FormGroup label="Пароль" labelFor="password">
          <input className="form__control" type="password" name="password" id="password" onChange={event => inputHandler(event)}/>
        </FormGroup>
        <div className="login__buttons">
          <button className="button button_primary" onClick={event => submitHandler(event)}>Попытаться войти</button>
        </div>
      </form>
    </section>
  )
}