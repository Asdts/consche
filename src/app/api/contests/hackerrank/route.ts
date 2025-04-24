import { NextRequest, NextResponse } from "next/server";

type Contest = {
    type: string;
    id: string;
    attributes: {
        name: string;
        description: string;
        start_time: string;
        end_time: string;
        registration_end_time: string;
        registration_count: number;
        participation_type: string;
        header_image_url: string;
        company_name: string;
        logo_url: string;
        microsite_url: string;
        status: string;
        registration_open: boolean;
    }
}

export async function POST(req: NextRequest){
    const reqBody = await req.json()
    const { type } = reqBody
    const now = new Date()
    const response = await fetch("https://www.hackerrank.com/community/engage/events")
    const body = await response.json()
    if(type === "future"){
        const filteredContests = body.data.events.ongoing_events.filter((contest: Contest) => {
            const startTime = new Date(contest.attributes.start_time)
            return startTime > now && contest.attributes.registration_open
        })
        return NextResponse.json({ contests: filteredContests })
    }else if(type === "past"){
        const filteredContests = body.data.events.ongoing_events.filter((contest: Contest) => {
            const endTime = new Date(contest.attributes.end_time)
            return endTime < now && contest.attributes.registration_open
        })
        return NextResponse.json({ contests: filteredContests })
    }else{
        const filteredContests = {
            ongoing: body.data.events.ongoing_events.filter((contest: Contest) => contest.attributes.registration_open),
            past: body.data.events.past_events.filter((contest: Contest) => contest.attributes.registration_open)
        }
        return NextResponse.json({ contests: filteredContests })
    }
}