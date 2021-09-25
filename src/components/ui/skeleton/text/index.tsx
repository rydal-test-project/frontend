import css from './skeletonText.module.scss'
import {IComponentProps} from "@specs";
import cn from "classnames";


interface IProps extends IComponentProps {

}
const SkeletonText = (props: IProps) => {
    const {className} = props

  return (
      <p className={cn(css.text, className)}/>
  )
}

export {
    SkeletonText
}