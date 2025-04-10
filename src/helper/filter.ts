import type { CodeforcesContest } from '@/type/codeforce';

export function filterContestsByDivision(
    contests: CodeforcesContest[],
    division: 'Div. 2' | 'Div. 3' | 'Div. 4' | 'any'
  ): CodeforcesContest[] {
    if (division === 'any') return contests;
  
    return contests.filter((contest) => contest.name.includes(division));
  }
  