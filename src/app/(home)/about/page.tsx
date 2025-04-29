"use client"
import {Card } from "@/components/ui/card"

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b  from-[#a95007] to-[#d19b5d]">
            <div className="flex flex-col items-center justify-center w-full h-full max-w-7xl px-4 mx-auto">
                <Card className="w-full max-w-2xl p-8 bg-transparent shadow-xl">
                    <h1 className="text-2xl font-bold text-center text-gray-800">About ConSche</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        ConSche is a web application designed to help competitive programmers never miss a coding contest again. 
                        With ConSche, you can easily schedule contests and add them to your Google Calendar with just a few clicks.
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Our mission is to provide a seamless experience for competitive programmers, allowing them to focus on what they do best: coding!
                    </p>
                </Card>
            </div>
        </div>
    )
}