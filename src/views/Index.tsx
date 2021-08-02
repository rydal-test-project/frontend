import React from "react";
import {observer} from "mobx-react-lite";
import Login from "../components/sections/Login";
import TextLoader from "../components/widgets/TextLoader";
import UserInfo from "../components/parts/index/UserInfo";


const Index: React.FC = () => {

  return (
    <div className="container container_full-height">
      {
        false ?
          (<TextLoader label="Обработка"/>)
          : false ?
            (<UserInfo/>)
            :
            (<Login/>)
      }
    </div>
  )
}

export default observer(Index);
