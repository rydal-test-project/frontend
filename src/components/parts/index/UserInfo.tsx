import React, {useContext} from "react";
import {storesContext} from "../../../stores";


export default function UserInfo() {
  const stores = useContext(storesContext);

  return (
    <section className="user-info">
      <div className="user-info__container container">
        <h1 className="user-info__fio">{ stores.userStore.user.fullFio }</h1>
        <h2 className="user-info__department">{ stores.userStore.user.department?.name }</h2>
        <h2 className="user-info__group">{ stores.userStore.user.group?.name }</h2>
      </div>
    </section>
  )
}