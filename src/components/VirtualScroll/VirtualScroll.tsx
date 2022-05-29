import { FC, useEffect, useState } from "react";
import { User } from "store/index";
import { UserCard } from "..";

import s from "./styles.module.scss";

interface Props {
  viewSize: number;
  componentHeight: number;
  data: User[];
}

const VirtualScroll: FC<Props> = ({ viewSize, componentHeight, data }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    setStartIndex(Math.floor(scrollTop / componentHeight));
  }, [componentHeight, scrollTop]);

  return (
    <div
      className={s.virtualScroll}
      style={{ height: viewSize * componentHeight }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      {data.slice(startIndex, startIndex + viewSize).map((user, i) => (
        <div
          style={{ height: componentHeight, transform: `translateY(${scrollTop}px)` }}
          className={s.userCardContainer}
          key={i}
        >
          <UserCard user={user} isVirtualMode />
        </div>
      ))}
      <div
        className={s.userCardContainer}
        style={{ height: (data.length - viewSize) * componentHeight }}
      />
    </div>
  );
};

export default VirtualScroll;
