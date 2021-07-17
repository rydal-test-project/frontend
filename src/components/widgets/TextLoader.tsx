import * as React from "react";
import {useEffect, useState} from "react";


interface IProps {
  label?: string
}
let intervalId: NodeJS.Timeout;

export default function TextLoader({ label }: IProps) {
  const [dotsCount, setDotsCount] = useState<number>(0);

  useEffect(() => {
    intervalId = setInterval(() => {
      setDotsCount(dotsCount > 2 ? 0 : dotsCount + 1);
    }, 500)
    return () => {
      clearInterval(intervalId)
    }
  });

  return (
    <span>{label || 'Загружается'} {Array(dotsCount + 1).join('.')}</span>
  )
}