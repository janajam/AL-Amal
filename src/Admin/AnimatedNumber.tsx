import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
  end: number;
  duration?: number;
}

export default function AnimatedNumber({
  end,
  duration = 2,
}: AnimatedNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;

    const counter = new CountUp(spanRef.current, end, {
      duration,
    });

    if (!counter.error) {
      counter.start();
    } else {
      console.error(counter.error);
    }
  }, [end, duration]);

  return <span ref={spanRef} />;
}