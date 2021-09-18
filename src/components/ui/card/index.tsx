import React, {forwardRef} from "react";
import cs from "classnames"

import css from "./card.module.scss"
import {CardHead} from "./head"
import {IComponentProps} from "@specs";


interface IProps extends IComponentProps {
}
const Card: React.ForwardRefExoticComponent<IProps> = forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, children } = props

  return (
    <div className={cs([css.card, className])} ref={ref}>
      {children}
    </div>
  );
});

export {
  Card,
  CardHead
}