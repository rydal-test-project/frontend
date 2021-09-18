import React, {useState} from "react";
import {useInstance} from "react-ioc";
import {AuthService} from "@services";
import {emailValidator, requiredValidator, useValidation} from "@validation";
import {Button, FormField, Input, TextLoader} from "@ui";
import {AuthStore} from "@stores";


const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = useInstance(AuthService);
  const auth = useInstance(AuthStore);
  const { error, allowValidate, totalIsValid, isValid, reset } = useValidation({
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
      setPassword('')
      reset()
      authService.getUser()
    })
  };

  const disable = () => {
    const res = totalIsValid()

    if (res === null) { return false }

    return !res
  }

  if (auth.serverActions.login.isPending) {
    return (
        <TextLoader/>
    )
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
