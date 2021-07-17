import React from "react";
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
  cardRef?: (el: HTMLDivElement) => void,
}
export class Card extends React.Component<props, any>{

  renderHead(): React.ReactElement {
    return (
      <div className="card__head">
        <h3 className="card__title">{this.props.title}</h3>
      </div>
    )
  }

  renderBody(): React.ReactElement {
    return (
      <div className="card__body">
        {this.props.imagePath && (
          <div className="card__image-container">
            <img className="card__image" src={this.props.imagePath} alt={this.props.imageAlt || this.props.title}/>
            {this.props.imageWithContent && (
              <div className="card__image-additional-content">
                {this.props.imageWithContentUseChildren && (
                  <>
                    {this.props.imageAdditionalContentSlot && this.props.imageAdditionalContentSlot()}
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {this.props.children ?
          (<>{this.props.children}</>)
          : (<p className="card__text">{this.props.text}</p>)
        }
      </div>
    )
  }

  render(): React.ReactElement {
    // @ts-ignore
    const size = ['xl', 'lg'].find(size => !!this.props[size]) || 'md';


    return (
      <div className={cs([...(this.props.classes || []), 'card', `card_${size}`])} ref={this.props.cardRef}>
        {this.renderHead()}
        {this.renderBody()}
      </div>
    );
  }
}