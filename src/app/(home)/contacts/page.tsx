"use client"
import {motion} from "framer-motion"
import Link from "next/link"
import {Card} from "@/components/ui/card"

export default function Contacts() {
    return (
        <div className="flex min-h-screen mx-auto py-6 bg-gradient-to-b from-[#a95007] to-[#d19b5d]">
            <Card className="p-6 max-w-3xl mx-auto bg-gradient-to-b from-[#d19b5d] to-[#d19b5d]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <p className="text-muted-foreground mt-2">We love to hear from you!</p>
                </div>
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <p className="mb-2">For any inquiries or feedback, please reach out to us at:</p>
                    <p className="mb-2">Email: abhigns369@gmail.com </p>
                    <p className="mb-2">Twitter: <Link href="https://twitter.com/asdts007" className="text-blue-500 hover:underline">asdts007</Link></p>
                    <p className="mb-2">GitHub: <Link href="https://github.com/asdts/consche" className="text-blue-500 hover:underline">ConSche</Link></p>
                    <p className="mb-2">We appreciate your feedback and suggestions!</p>
                    <p className="mb-2">Follow us on Twitter for updates and announcements.</p>
                    <p className="mb-2">Join our community and help us improve ConSche!</p>
                    <p className="mb-2">Thank you for using ConSche!</p>
                    <Link href="/" className="text-blue-500 hover:underline mt-4">Back to Home</Link>
                </motion.div>
            </Card>
        </div>
    )
}