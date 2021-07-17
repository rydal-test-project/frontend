import React, {useState} from "react";
import {Card} from "../components/ui/Card";
import programing from "../assets/img/programing.png";
import $ from "jquery";
import {gql, useQuery} from "@apollo/client";
import User from "../models/user";


const GE_LIST_USERS = gql`
    {
        users{
            data{
                id,
                email
            }
        }
    }
`;

type interest = {
  id: number,
  title: string,
  text: string,
  image_path: string,
  list: string[]
}
export default function Interests () {
  const { loading, error, data } = useQuery<User[]>(GE_LIST_USERS);
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
  const cards = Array(interests.length);
  const clickHandler = (event: React.MouseEvent<HTMLLIElement>, card: HTMLDivElement) => {
    event.preventDefault();
    window.scrollTo({ top: $(card).position()?.top as number - 10, behavior: 'smooth'})
  };

  if (loading) {
    return (
      <>
        {error}
      </>
    )
  }

  console.log(error)

  return (
    <div className="container">
      <div className="interests">
        <section className="section">
          <nav className="interests__nav">
            <ul className="interests__nav-list">
              {interests.map((interest, idx) => (
                <li className="interests__nav-list-item" key={idx} onClick={event => clickHandler(event, cards[idx])}>
                  <a className="interests__nav-link" href={`#${interest.id}`}>{interest.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="section">
          <div className="interests__cards-container">
            {interests.map((interest, idx) => (
              <Card classes={['interests__card']} key={idx} cardRef={el => cards[idx] = el}
                    imageWithContent
                    imageWithContentUseChildren
                    xl
                    imagePath={interest.image_path}
                    title={interest.title} text={interest.text}
                    imageAdditionalContentSlot={() => (
                      <div className="interests__card-list-container">
                        <ul className="interests__card-list">
                          {interest.list.map((item, idx) => (
                            <li key={idx} className="interests__card-list-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
};
