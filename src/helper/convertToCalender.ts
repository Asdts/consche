import type { CalendarEvent } from '@/types/calender';
import type { CodeforcesContest } from '@/types/codeforce';

export function toCalendarEvent(contest: CodeforcesContest): CalendarEvent {
  const start = new Date(contest.startTimeSeconds * 1000);
  const end = new Date(start.getTime() + contest.durationSeconds * 1000);

  const format = (date: Date) => date.toISOString();

  return {
    summary: contest.name,
    description: `Codeforces Contest: ${contest.name}\nLink: https://codeforces.com/contest/${contest.id}`,
    start: {
      dateTime: format(start),
      timeZone: 'Asia/Kolkata', // or detect user time zone
    },
    end: {
      dateTime: format(end),
      timeZone: 'Asia/Kolkata',
    },
  };
}
