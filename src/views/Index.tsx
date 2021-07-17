import React from "react";
import {inject, observer} from "mobx-react";
import {User} from "../stores/user";
import Login from "../components/sections/Login";
import TextLoader from "../components/widgets/TextLoader";
import UserInfo from "../components/parts/index/UserInfo";


interface IProps {
  userStore: User
}

@inject('userStore')
@observer
export default class Index extends React.Component<IProps, {}> {
  render(): React.ReactElement<React.JSXElementConstructor<any>> {

    return (
      <div className="container container_full-height">
        {
          this.props.userStore.inLoggingState ?
            (<TextLoader label="Обработка"/>)
            : this.props.userStore.isLogged ?
            (<UserInfo/>)
            :
            (<Login/>)
        }
      </div>
    )
  }
}