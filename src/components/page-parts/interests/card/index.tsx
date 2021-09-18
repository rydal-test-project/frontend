import React, {forwardRef, ReactNode, useRef} from "react";
import cn from "classnames"

import {IComponentProps} from "@specs";
import css from "./interest.module.scss";
import {Card, CardHead} from "@ui";


interface IProps extends IComponentProps {
    text?: string,
    title?: string
    imagePath?: string,
    isSkeleton?: boolean,
    list: string[]
}
const InterestCard: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement> & IProps> = forwardRef<HTMLDivElement, IProps>((props: IProps, ref) => {
    const { text, title, imagePath, className, isSkeleton: isSkeleton, list } = props
    const card = useRef<HTMLDivElement>(null)
    const renderBody: () => React.ReactElement = () => {
        return (
            <div className={css.card__body}>
                <div className={css.card__imageContainer}>
                    <img className={css.card__image} src={imagePath} alt={title}/>
                    <div className={cn([css.card__imageAdditionalContent, css.additionalContent])}>
                        <ul className={css.additionalContent__list}>
                                {list.map((item, idx) => (
                                    <li key={idx} className={css.additionalContent__listItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                    </div>
                </div>
                <p className={css.card__text}>{props.text}</p>
            </div>
        )
    };

    return (
        <Card className={cn([css.card, className])} ref={card}>
            <CardHead className={css.card__head} text={title} isSkeleton={isSkeleton} />
            {renderBody()}
        </Card>
    );
});

export default InterestCard