import { useEffect, useState } from "react";

function useCountdown(initialCount: number, interval: number) {
  const [count, setCount] = useState(initialCount);

  /**restarts the counter  */
  const restart = () => {
    setCount(initialCount);
  };

  useEffect(() => {
    if (count === 0) {
      return;
    }

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [count, interval]);

  return { count, restart };
}

export default useCountdown;
