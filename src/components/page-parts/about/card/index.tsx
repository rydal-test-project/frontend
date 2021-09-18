import React, {forwardRef, ReactNode} from "react";
import cn from "classnames";

import css from "./about-card.module.scss"
import {Card, CardHead, SkeletonText} from "@ui";
import {IComponentProps} from "@specs";


interface IProps extends IComponentProps{
    text?: ReactNode;
    title?: ReactNode;
    isSkeleton?: boolean
}
const AboutCard: React.FC<IProps> = forwardRef((props: IProps) => {
    const { text, title, className, isSkeleton } = props

    return (
        <Card className={cn([css.card, className])}>
            <CardHead className={css.card__head} text={title} isSkeleton={isSkeleton}/>
            <div className={css.card__body}>
                {
                    isSkeleton ? (
                       <>
                           <SkeletonText/>
                           <SkeletonText/>
                           <SkeletonText/>
                           <SkeletonText/>
                       </>
                    ) : (
                        <p className={css.card__text}>{text}</p>
                    )
                }
            </div>
        </Card>
    );
});

export {
    AboutCard
}