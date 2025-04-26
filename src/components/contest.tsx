'use client';
import {Card , CardContent , CardHeader , CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Contests = [
    {
        title : "Codeforces",
        image : "/codeforce.svg",
        link : "/codeforce",
        describe: "Codeforce contest schedule",
    },
    {
        title : "Leetcode",
        image : "/leetcode.svg",
        link : "/leetcode",
        describe: "Leetcode contest schedule",
    },
    {
        title : "Hackerrank",
        image : "/hackerrank.svg",
        link : "/hackerrank",
        describe: "Hackerrank contest schedule",
    },
    {
        title : "Codechef",
        image : "/codechef.svg",
        link : "/codechef",
        describe: "Codechef contest schedule",
    },
    {
        title : "gfg",
        image : "/gfg.svg",
        link : "/gfg",
        describe: "gfg contest schedule",
    },
    {
        title: "Upcoming",
        image: "/logo.svg",
        link: "/upcoming",
        describe: "Upcoming Feature",
    }
]

export default function ContestBox() {
    const router = useRouter();
    return (
        <div className="container mx-auto flex h-screen items-center justify-center">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Contests.map((contest) => (
                    <Card key={contest.title} className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>{contest.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image src={contest.image} alt={contest.title} width={200} height={200} />
                            <p>{contest.describe}</p>
                        </CardContent>
                        <Button onClick={() => router.push(`contests/${contest.link}`)}>Go to {contest.title}</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}