import React, {createRef, useRef, useState} from "react";
import $ from "jquery";

import programing from "../assets/img/programing.png";
import InterestCard from "../components/page-parts/interests/card";


type interest = {
  id: number,
  title: string,
  text: string,
  image_path: string,
  list: string[]
}
export default function Interests () {
  const [interests] = useState<interest[]>([
    {
      id: 1,
      image_path: programing,
      text: 'Microchips and microprocessors have considerably reduced the cost of the electronic components required in a computer. Computers come in many sizes and shapes such as special-purpose, laptop, desktop, minicomputers, supercomputers.',
      title: 'Хобби',
      list: ['Microchips and microprocessors have considerably', 'Components required', 'Microchips', 'Have considerably']
    },
    {
      id: 2,
      image_path: programing,
      text: 'Microchips and microprocessors have considerably reduced the cost of the electronic components required in a computer. Computers come in many sizes and shapes such as special-purpose, laptop, desktop, minicomputers, supercomputers.',
      title: 'Учеба',
      list: ['Microchips and microprocessors have considerably', 'Components required', 'Microchips', 'Have considerably']
    },
    {
      id: 3,
      image_path: programing,
      text: 'Microchips and microprocessors have considerably reduced the cost of the electronic components required in a computer. Computers come in many sizes and shapes such as special-purpose, laptop, desktop, minicomputers, supercomputers.',
      title: 'Учеба2',
      list: ['Microchips and microprocessors have considerably', 'Components required', 'Microchips', 'Have considerably']
    }
  ]);
  const cards = useRef(interests.map(() => createRef<HTMLDivElement>()));
  const clickHandler = (event: React.MouseEvent<HTMLLIElement>, card: HTMLDivElement | null) => {
    event.preventDefault();

    if (card) {
      window.scrollTo({ top: $(card).position()?.top as number - 10, behavior: 'smooth'})
    }
  };

  return (
    <div className="container">
      <div className="interests">
        <section className="section">
          <nav className="interests__nav">
            <ul className="interests__nav-list">
              {
                interests.map((interest, idx) => (
                    <li className="interests__nav-list-item" key={idx} onClick={event => clickHandler(event, cards.current[idx].current)}>
                      <a className="interests__nav-link" href={`#${interest.id}`}>{interest.title}</a>
                    </li>
                ))
              }
            </ul>
          </nav>
        </section>
        <section className="section">
          <div className="interests__cards-container">
            {
              interests.map((interest, idx) => (
                  <InterestCard key={idx} ref={cards.current[idx]}
                                imagePath={interest.image_path}
                                isSkeleton={false}
                                title={interest.title} text={interest.text}
                                list={interest.list}
                  />
              ))
            }
          </div>
        </section>
      </div>
    </div>
  )
};
