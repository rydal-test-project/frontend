import React, {useState} from "react";
import FormGroup from "../../ui/FormGroup";
import {useInstance} from "react-ioc";
import AuthService from "../../../services/auth";
import {Input} from "../../ui";
import {emailValidator, requiredValidator, useValidation} from "@validation";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = useInstance(AuthService);
  const { error, allowValidate, totalIsValid } = useValidation({
    email: {
      validators: [
          requiredValidator,
          emailValidator,
      ],
      get: email
    },
    password: {
      validators: [
          requiredValidator,
      ],
      get: password
    }
  })
  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    allowValidate()

    if (!totalIsValid()) { return }

    authService.login({ email, password }).then(() => {
      authService.init();
    }).catch(() => {
      setPassword('');
    });
  };

  const disable = () => {
    const res = totalIsValid()

    if (res === null) { return false }

    return !res
  }

  return (
    <section className="login">
      <h1 className="login__title">Кто вы?</h1>
      <form className="login__form form">
        <FormGroup>
          <>
            { error('email') }
            <Input placeholder="Email" onChange={setEmail} />
          </>
        </FormGroup>
        <FormGroup  >
          <Input placeholder="Пароль" onChange={setPassword} />
        </FormGroup>
        <div className="login__buttons">
          <button disabled={disable()} className="button button_primary" onClick={event => submitHandler(event)}>Попытаться войти</button>
        </div>
      </form>
    </section>
  )
}
