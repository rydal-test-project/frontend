import React from "react";
import {observer} from "mobx-react-lite";
import Login from "../components/sections/Login";
import TextLoader from "../components/widgets/TextLoader";
import {useInstance} from "react-ioc";
import ModelsData from "../models";
import Stores from "../stores";
import {pending} from "../constants";


const Index: React.FC = () => {
  const { user } = useInstance(ModelsData);
  const { app } = useInstance(Stores);
  const showLoad = app.isPending(pending.INIT_USER) && !user.isInit
  const renderUserInfo = () => {

    return (
      <section className="user-info">
        <div className="user-info__container container">
          <h1 className="user-info__fio">{ showLoad ? (<TextLoader label="Обработка"/>) : user.fio && user.fio.shortFio() }</h1>
          <h2 className="user-info__department">{ showLoad ? (<TextLoader label="Обработка"/>) : user.department && user.department.name }</h2>
          <h2 className="user-info__group">{ showLoad ? (<TextLoader label="Обработка"/>) : user.group && user.group.name }</h2>
        </div>
      </section>
    )
  };

  return (
    <div className="container container_full-height">
      {
        app.isPending(pending.INIT_USER) || user.isInit ? renderUserInfo() : (<Login/>)
      }
    </div>
  )
};

export default observer(Index);
