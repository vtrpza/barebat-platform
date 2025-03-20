'use client';

import { Builder } from '@builder.io/react';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  eventDate: string;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({
  eventDate,
  title = 'Countdown to the Big Day',
  backgroundColor = '#1a1a1a',
  textColor = '#ffffff',
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div
      className="py-12 px-4"
      style={{ backgroundColor, color: textColor }}
    >
      <h3 className="text-2xl md:text-3xl text-center mb-8">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
        <div className="p-4 rounded-lg bg-opacity-20 bg-white">
          <div className="text-4xl md:text-6xl font-bold">{timeLeft.days}</div>
          <div className="text-sm md:text-base mt-2">Days</div>
        </div>
        <div className="p-4 rounded-lg bg-opacity-20 bg-white">
          <div className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm md:text-base mt-2">Hours</div>
        </div>
        <div className="p-4 rounded-lg bg-opacity-20 bg-white">
          <div className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm md:text-base mt-2">Minutes</div>
        </div>
        <div className="p-4 rounded-lg bg-opacity-20 bg-white">
          <div className="text-4xl md:text-6xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm md:text-base mt-2">Seconds</div>
        </div>
      </div>
    </div>
  );
};

// Register the component with Builder.io
Builder.registerComponent(CountdownTimer, {
  name: 'Countdown Timer',
  inputs: [
    {
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Countdown to the Big Day',
    },
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#1a1a1a',
    },
    {
      name: 'textColor',
      type: 'color',
      defaultValue: '#ffffff',
    },
  ],
}); 