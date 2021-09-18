import React, {forwardRef, ReactNode} from "react";

import css from "./head.module.scss"
import {IComponentProps} from "@specs";
import cn from "classnames";


interface IProps extends IComponentProps{
  text?: ReactNode
}
const CardHead: React.ForwardRefExoticComponent<IProps> = forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const { text, children, className } = props

  return (
      <div className={cn([className, css.head])} ref={ref}>
        {
          !children || (!children && text) ? (
              <h3 className={css.head__title}>{text}</h3>
          ) : children
        }
      </div>
  )
});

export {
  CardHead
}