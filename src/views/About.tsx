import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ABOUTS} from "../gq/about";
import Grid from "../components/layouts/Grid";
import {gqResponseWithPaginate} from "@specs";
import {AboutCard} from "../components/page-parts/about/card";


type aboutInfo = {
  title: string,
  text: string
}
export default function About () {
  const [ cards, setCards ] = useState<aboutInfo[]>([]);
  const [ page, setPage ] = useState<number>(1);
  const { data, fetchMore, loading } = useQuery<{ abouts: gqResponseWithPaginate<aboutInfo> }>(GET_ABOUTS, {
    variables: { page }
  });
  const showSkeleton = !cards.length && loading
  const loadNext = () => {
    setPage(prevState => prevState + 1)
  };

  const renderCards = () => {
    if (showSkeleton) {
      return Array(7).fill(1).map((_m, idx) => (
          <AboutCard className="about__card" key={idx} isSkeleton />
      ))
    }

    return cards.map((cardInfo, idx) => (
            <AboutCard className="about__card" key={idx} text={cardInfo.text} title={cardInfo.title}/>
        )
    )
  }
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
          <Grid items={renderCards()} next={loadNext} hasMore={data?.abouts.paginatorInfo.hasMorePages} />
        </div>
      </div>
  )
};