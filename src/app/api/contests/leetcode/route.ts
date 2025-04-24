import { NextRequest, NextResponse } from "next/server";

const graphqlQuery = {
    query:`
    query getContestList{
    allContests{
    title
    titleSlug
    startTime
    duration
}
    }`
}

const upcomingContestsQuery = {
    query:`
    query upcomingContests{
    upcomingContests{
    title
    titleSlug
    startTime
    duration
    }
    }`
}

export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    const { type } = reqBody
    let response
    if(type === "upcoming"){
        response = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(upcomingContestsQuery),
        })
        return NextResponse.json({ contests: (await response.json()).data.upcomingContests })
    }else{
        response = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphqlQuery),
        })
    }
    const body = await response.json()
    return NextResponse.json({ contests: body.data.allContests })
}