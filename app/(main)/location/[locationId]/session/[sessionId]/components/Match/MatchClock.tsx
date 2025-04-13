"use client";

import React from "react";

export default function MatchClock({ start, end }: { start: Date; end: Date | null }) {
  const [time, setTime] = React.useState(new Date());

  const isEndNull = end == null;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isEndNull]);

  const diffInMilliseconds = Math.abs(start.getTime() - (end ?? time).getTime());

  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  return (
    <div>
      <h1 className={end == null ? "" : "text-gray-400"}>
        {minutes}:{seconds}
      </h1>
    </div>
  );
}
