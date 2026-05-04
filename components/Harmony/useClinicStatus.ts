import { useEffect, useState } from 'react';
import { CLINIC } from '../../data/clinicData';

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

const formatHourLabel = (hour: number) => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const ampm = h >= 12 ? 'p' : 'a';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${ampm}` : `${h12}:${String(m).padStart(2, '0')}${ampm}`;
};

export interface ClinicStatus {
  now: Date;
  isOpenNow: boolean;
  greeting: string;
  closeLabel: string;
  fluSeason: boolean;
}

export const useClinicStatus = (): ClinicStatus => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(tick);
  }, []);

  const dayKey = DAY_KEYS[now.getDay()];
  const todayHours = CLINIC.hours[dayKey as keyof typeof CLINIC.hours];
  const decimalHour = now.getHours() + now.getMinutes() / 60;

  const isOpenNow =
    !!todayHours && decimalHour >= todayHours.open && decimalHour < todayHours.close;

  const closeLabel = (() => {
    if (isOpenNow && todayHours) {
      const minutesLeft = Math.round((todayHours.close - decimalHour) * 60);
      const h = Math.floor(minutesLeft / 60);
      const m = minutesLeft % 60;
      if (h > 0) return `${h}h ${m}m`;
      return `${m} min`;
    }
    // Find next open day
    for (let i = 0; i < 7; i++) {
      const day = (now.getDay() + i + (i === 0 && !isOpenNow ? 0 : 1)) % 7;
      const key = DAY_KEYS[day];
      const slot = CLINIC.hours[key as keyof typeof CLINIC.hours];
      if (!slot) continue;
      const dayLabel = i === 0 || i === 1 ? 'tomorrow' : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][day];
      return `${dayLabel} at ${formatHourLabel(slot.open)}`;
    }
    return 'soon';
  })();

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Hello';
  const fluSeason = now.getMonth() >= 9 || now.getMonth() <= 2;

  return { now, isOpenNow, greeting, closeLabel, fluSeason };
};
