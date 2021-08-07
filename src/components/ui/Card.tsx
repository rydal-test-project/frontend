import React, {forwardRef} from "react";
import cs from "classnames"


type props = {
  classes?: string[],
  text?: string,
  title?: string
  imagePath?: string,
  imageWithContent?: boolean,
  imageWithContentUseChildren?: boolean,
  xl?: boolean,
  lg?: boolean,
  md?: boolean,
  imageAlt?: string,
  imageAdditionalContentSlot?: () => React.ReactElement,
  children?: React.ReactElement
}
const Card: React.ForwardRefExoticComponent<props> = forwardRef((props: props, ref: React.Ref<HTMLDivElement>) => {
  // @ts-ignore
  const size = ['xl', 'lg'].find(size => !!props[size]) || 'md';
  const renderHead: () => React.ReactElement = () => {
    return (
      <div className="card__head">
        <h3 className="card__title">{props.title}</h3>
      </div>
    )
  };
  const renderBody: () => React.ReactElement = () => {
    return (
      <div className="card__body">
        {props.imagePath && (
          <div className="card__image-container">
            <img className="card__image" src={props.imagePath} alt={props.imageAlt || props.title}/>
            {props.imageWithContent && (
              <div className="card__image-additional-content">
                {props.imageWithContentUseChildren && (
                  <>
                    {props.imageAdditionalContentSlot && props.imageAdditionalContentSlot()}
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {props.children ?
          (<>{props.children}</>)
          : (<p className="card__text">{props.text}</p>)
        }
      </div>
    )
  };

  return (
    <div className={cs([...(props.classes || []), 'card', `card_${size}`])} ref={ref}>
      {renderHead()}
      {renderBody()}
    </div>
  );
});

export default Card