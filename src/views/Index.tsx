import React from "react";
import {observer} from "mobx-react-lite";
import {useInstance} from "react-ioc";

import {TextLoader} from "@ui";
import {LoginForm} from "@widgets";
import {AuthStore, Stores} from "@stores";
import {pending} from "../constants";


const Index: React.FC = () => {
  const { user, pendingState } = useInstance(AuthStore);
  const { app } = useInstance(Stores);
  const showLoad = pendingState.isPending
  const renderUserInfo = () => {

    return (
      <section className="user-info">
        <div className="user-info__container container">
          <h1 className="user-info__fio">{ showLoad ? (<TextLoader label="Обработка"/>) : user }</h1>
          <h2 className="user-info__department">{ showLoad ? (<TextLoader label="Обработка"/>) : user?.department }</h2>
          <h2 className="user-info__group">{ showLoad ? (<TextLoader label="Обработка"/>) : user?.group }</h2>
        </div>
      </section>
    )
  };

  return (
    <div className="container container_full-height">
      {
        app.isPending(pending.INIT_USER) || showLoad ? renderUserInfo() : (<LoginForm/>)
      }
    </div>
  )
};

export default observer(Index);
