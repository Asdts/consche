import { Card } from "@/components/ui/card";

export default function Roadmap() {
    return (
        <div className="container mx-auto flex h-screen items-center justify-center">
        <Card className="w-full max-w-2xl p-6">
            <h1 className="text-2xl font-bold">Roadmap</h1>
            <p className="mt-4 text-gray-600">
            This is a roadmap for the xConSche project. It outlines the features and improvements that are planned for future releases.
            </p>
        </Card>
        </div>
    );
    }