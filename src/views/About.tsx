import React, {useState} from "react";
import {Card} from "../components/ui/Card";


type aboutInfo = {
  title: string,
  text: string
}
export default function About () {
  const [cards] = useState<aboutInfo[]>([
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, eaque unde? Culpa cumque ex expedita illum iusto laboriosam minus modi molestiae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniam voluptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, eaque unde? Culpa cumque ex expedita illum iusto laboriosam minus modi molestiae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniam voluptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consecae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniaptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, eaque unde? Culpa cumque ex expedita illum iusto laboriosam minus modi molestiae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniam voluptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum doloi molestiae, necessitaveniam voluptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, eaque unde? Culpa cumque ex expedita illum iusto laboriosam minus modi molestiae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniam voluptas.',
      title: 'text',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consecae, necessitatibus nulla officia repudiandae, soluta temporibus unde veniaptas.',
      title: 'text',
    }
  ]);

  return (
      <div className="container">
        <div className="about">
          <div className="about__cards-container">
            {cards.map((cardInfo, idx) => (<Card classes={['about__card']} key={idx} text={cardInfo.text} title={cardInfo.title}/>))}
          </div>
        </div>
      </div>
  )
};