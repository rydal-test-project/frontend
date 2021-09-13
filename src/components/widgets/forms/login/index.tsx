import React, {useState} from "react";
import {useInstance} from "react-ioc";
import {AuthService} from "@services";
import {emailValidator, requiredValidator, useValidation} from "@validation";
import {Button, FormField, Input} from "@ui";


const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = useInstance(AuthService);
  const { error, allowValidate, totalIsValid, isValid } = useValidation({
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

    authService.login({ email, password })

/*    authService.login({ email, password }).then(() => {
      authService.init();
    }).catch(() => {
      setPassword('');
    });*/
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
        <FormField isValid={isValid('email')} errorMessage={error('email')}>
          <Input placeholder="Email" onChange={setEmail} />
        </FormField>
        <FormField isValid={isValid('password')} errorMessage={error('password')}>
          <Input placeholder="Пароль" onChange={setPassword} type="password" />
        </FormField>
      </form>
      <div className="login__buttons">
        <Button disabled={disable()} onClick={event => submitHandler(event)}>Попытаться войти</Button>
      </div>
    </section>
  )
}

export {
  LoginForm
}
