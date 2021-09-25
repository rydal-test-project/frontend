import React, {forwardRef, ReactNode} from "react";
import cn from "classnames"

import {IComponentProps} from "@specs";
import css from "./interest.module.scss";
import {Card, CardHead, SkeletonImage, SkeletonText} from "@ui";


interface IProps extends IComponentProps {
    text?: string,
    title?: string
    imagePath?: string,
    isSkeleton?: boolean,
    list: string[]
}
const InterestCard: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement> & IProps> = forwardRef<HTMLDivElement, IProps>((props: IProps, ref) => {
    const { text, title, imagePath, className, isSkeleton, list } = props

    const renderListItem = (item: ReactNode, idx: number) => (
        <li key={idx} className={css.additionalContent__listItem}>
            {
                isSkeleton ? <SkeletonText className={css.additionalContent__listItemSkeleton} /> : item
            }
        </li>
    )

    const renderImage = () => {
      return !isSkeleton ? (
          <img className={css.card__image} src={imagePath} alt={title}/>
      ) : (
          <SkeletonImage className={css.card__imageSkeleton} />
      )
    }

    const renderBody: () => React.ReactElement = () => {
        return (
            <div className={css.card__body}>
                <div className={css.card__imageContainer}>
                    {renderImage()}
                    <div className={cn([css.card__imageAdditionalContent, css.additionalContent])}>
                        <ul className={css.additionalContent__list}>
                            {
                                isSkeleton ?
                                    Array(3).fill(1).map((_, idx) => renderListItem(<SkeletonText/>, idx))
                                    :
                                    list.map(renderListItem)
                            }
                        </ul>
                    </div>
                </div>
                {
                    isSkeleton ? (
                        <>
                            <SkeletonText/>
                            <SkeletonText/>
                        </>
                    ) : <p className={css.card__text}>{text}</p>
                }
            </div>
        )
    };

    return (
        <Card className={cn([css.card, className])} ref={ref}>
            <CardHead className={css.card__head} text={title} isSkeleton={isSkeleton} />
            {renderBody()}
        </Card>
    );
});

export default InterestCard