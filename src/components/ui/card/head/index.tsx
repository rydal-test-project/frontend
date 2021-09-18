import React, {forwardRef, ReactNode} from "react";
import cn from "classnames";

import css from "./head.module.scss"
import {IComponentProps} from "@specs";
import {SkeletonText} from "@ui";


interface IProps extends IComponentProps{
  text?: ReactNode,
  isSkeleton?: boolean
}
const CardHead: React.ForwardRefExoticComponent<IProps> = forwardRef((props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const { text, children, className, isSkeleton } = props

  return (
      <div className={cn([className, css.head])} ref={ref}>
        { isSkeleton && <SkeletonText/> }
        {
          !isSkeleton && (!children || (!children && text)) ? (
              <h3 className={css.head__title}>{text}</h3>
          ) : children
        }
      </div>
  )
});

export {
  CardHead
}