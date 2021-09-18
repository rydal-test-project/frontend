import React from "react";
import {observer} from "mobx-react-lite";
import {useInstance} from "react-ioc";

import {TextLoader} from "@ui";
import {LoginForm} from "@widgets";
import {AuthStore} from "@stores";


const Index: React.FC = () => {
  const { user, serverActions } = useInstance(AuthStore);
  const showLoad = serverActions.getUser.isPending

  const renderUserInfo = () => {

    return (
      <section className="user-info">
        <div className="user-info__container container">
          <h1 className="user-info__fio">{ showLoad ? (<TextLoader label="Обработка"/>) : user?.fio.lastName }</h1>
          <h2 className="user-info__department">{ showLoad ? (<TextLoader label="Обработка"/>) : '' }</h2>
          <h2 className="user-info__group">{ showLoad ? (<TextLoader label="Обработка"/>) : '' }</h2>
        </div>
      </section>
    )
  };

  return (
    <div className="container container_full-height">
      {
        (!serverActions.login.isPending && (showLoad && !user)) || user? renderUserInfo() : (<LoginForm/>)
      }
    </div>
  )
};

export default observer(Index);
