import type { CodeforcesContest } from "@/types/codeforce";

export async function fetchUpcomingContests(): Promise<CodeforcesContest[]> {
    const res = await fetch('https://codeforces.com/api/contest.list?gym=false');
    const data = await res.json();
  
    if (data.status !== 'OK') {
      throw new Error("Failed to fetch contests");
    }
  
    const contests: CodeforcesContest[] = data.result;
  
    // Filter only upcoming ones
    return contests.filter((c) => c.phase === 'BEFORE');
  }