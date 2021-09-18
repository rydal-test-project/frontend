import React, {useEffect, useRef, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'


type props = {
  items: JSX.Element[];
  hasMore?: boolean,
  next?: () => void
};


const Grid: React.FC<props> = ({ items, hasMore, next }: props) => {
  const itemsRefs = useRef<HTMLDivElement[]>([]);
  const columnHeight = 10;
  const [ columnsHeights, setColumnsHeights ] = useState<number[]>(Array(items.length).fill(1));
  const calculateSize = () => {
    itemsRefs.current.forEach((itemRef, idx) => {
      const itemHeight = Math.floor(itemsRefs.current[idx]?.clientHeight / 10) * 10;

      columnsHeights[idx] = Math.floor((itemHeight / columnHeight))
    });

    setColumnsHeights([...columnsHeights])
  };
  const renderItems = () => (
    <>
      {items.map((item, idx) => {
        let style = { gridRowEnd: `span ${columnsHeights[idx]}` };

        return (
          <div className="grid__item" key={idx} style={style}>
            <div ref={(element: HTMLDivElement) => itemsRefs.current[idx] = element}>
              {item}
            </div>
          </div>
        )
      })}
    </>
  );

  useEffect(() => {
    setColumnsHeights(Array(items.length).fill(1));
    calculateSize()
  }, [items]);


  return (
    <>
      {next ? (
        <InfiniteScroll className="grid" dataLength={items.length} hasMore={Boolean(hasMore)} loader={null} next={next}>
          {renderItems()}
        </InfiniteScroll>
      ) : (
        <div className="grid">
          {renderItems()}
        </div>
      )}
    </>

  )
};

Grid.defaultProps = {
  hasMore: false
};

export default Grid