import React, {useEffect, useState} from "react";
import Card from "../components/ui/Card";
import {useQuery} from "@apollo/client";
import {GET_ABOUTS} from "../gq/about";
import Grid from "../components/layouts/Grid";
import {gqResponseWithPaginate} from "@specs";


type aboutInfo = {
  title: string,
  text: string
}
export default function About () {
  const [ cards, setCards ] = useState<aboutInfo[]>([]);
  const [ page, setPage ] = useState<number>(1);
  const { data, fetchMore } = useQuery<{ abouts: gqResponseWithPaginate<aboutInfo> }>(GET_ABOUTS, {
    variables: { page }
  });
  const loadNext = () => {
    setPage(prevState => prevState + 1)
  };

  useEffect(() => {
    if (fetchMore) {
      fetchMore({ variables: page })
    }
  }, [page]);

  useEffect(() => {
    if (data?.abouts.data) {
      setCards([ ...cards, ...data?.abouts.data])
    }

  }, [data]);

  return (
      <div className="container">
        <div className="about">
          <Grid items={cards.map((cardInfo, idx) => (<Card classes={['about__card']} key={idx} text={cardInfo.text} title={cardInfo.title}/>))}
                next={loadNext} hasMore={data?.abouts.paginatorInfo.hasMorePages}
          />
        </div>
      </div>
  )
};