import { CodeForceList } from "@/components/codeforce-contest";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { JSX } from "react";

const contestMatch: Record<string , JSX.Element> = {
    codeforce: <CodeForceList />,
    // leetcode: <ContestList />,
    // atcoder: <ContestList />,
    // codechef: <ContestList />,
    // kickstart: <ContestList />,
    // hackerrank: <ContestList />,
    // codewars: <ContestList />,
    // topcoder: <ContestList />,
    // csacademy: <ContestList />,
    // hackerearth: <ContestList />,
    // cses: <ContestList />,
}
export default async function ContestSlug({params}: { params: { slug: string[] } }) {
    const { slug } = params;
    const contestPlatform = slug[0];
    if (!contestMatch[contestPlatform]) {
        return(
            <main className="container mx-auto flex h-screen items-center justify-center">
            <Card className="w-full max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Platform not available</h1>
                <p className="mt-4 text-gray-600">
                    The platform you are looking for is not available. Please check the URL or try a different platform.
                </p>
                <p className="mt-4 text-gray-600">
                    Available platforms are: {
                        Object.keys(contestMatch).map((platform, index) => (
                            <span key={platform}>
                                <Link href={`/contests/${platform}`} className="text-blue-500 hover:underline">
                                    {platform}
                                </Link>
                                {index < Object.keys(contestMatch).length - 1 ? ', ' : ''}
                            </span>
                        ))
                    }
                </p>
                <p className="mt-4 text-gray-600">
                    You can also check the <Link href="/contests" className="text-blue-500 hover:underline">contests page</Link> for a list of all available platforms.
                </p>
            </Card>
            </main>
        )
    }
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-primary">{contestPlatform}</h1>
            <div className="grid grid-cols-1 gap-4">
                {contestMatch[contestPlatform]}
            </div>
        </div>
    )

}