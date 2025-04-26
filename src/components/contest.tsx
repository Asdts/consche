'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Contests = [
    {
        title: "Codeforces",
        image: "/codeforce.svg",
        link: "/codeforce",
        describe: "Codeforce contest schedule",
    },
    {
        title: "Leetcode",
        image: "/leetcode.svg",
        link: "/leetcode",
        describe: "Leetcode contest schedule",
    },
    {
        title: "Hackerrank",
        image: "/hackerrank.svg",
        link: "/hackerrank",
        describe: "Hackerrank contest schedule",
    },
    {
        title: "Codechef",
        image: "/codechef.svg",
        link: "/codechef",
        describe: "Codechef contest schedule",
    },
    {
        title: "gfg",
        image: "/gfg.svg",
        link: "/gfg",
        describe: "gfg contest schedule",
    },
    {
        title: "Upcoming",
        image: "/logo.svg",
        link: "/upcoming",
        describe: "Upcoming Feature",
    }
];

export default function ContestBox() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-8 text-primary text-center">
                Welcome back, {session?.user?.name || "User"}!
            </h1>
            <p className="text-muted-foreground mb-8 text-center">
                Here are the available platforms for contest scheduling:
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Contests.map((contest) => (
                    <Card key={contest.title} className="w-full max-w-xs shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                        <CardHeader className="text-center bg-gray-100 py-4 rounded-t-lg">
                            <CardTitle className="text-xl font-semibold text-primary">{contest.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center p-4">
                            <Image src={contest.image} alt={contest.title} width={150} height={150} className="mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground mb-4">{contest.describe}</p>
                            <Button 
                                variant="outline" 
                                onClick={() => router.push(`contests/${contest.link}`)} 
                                className="w-full bg-primary text-white hover:bg-primary-dark"
                            >
                                Go to {contest.title}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
