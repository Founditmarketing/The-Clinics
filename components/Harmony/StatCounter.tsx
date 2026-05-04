import React, { useEffect, useState } from 'react';

const useCountUp = (target: number, duration = 1800, trigger = true) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return val;
};

interface StatCounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
  trigger?: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({ target, decimals = 0, suffix = '', trigger = true }) => {
  const v = useCountUp(target, 1800, trigger);
  const formatted = decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString();
  return (
    <>
      {formatted}
      {suffix}
    </>
  );
};

export default StatCounter;
