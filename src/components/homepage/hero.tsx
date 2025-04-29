"use client"
import { motion } from "framer-motion"
import Link from "next/link"
export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b  from-[#a95007] to-[#2a7a0a]">
            <div className="flex flex-col items-center justify-center w-full h-full max-w-7xl px-4 mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center text-white md:text-6xl lg:text-7xl"
                >
                    Welcome to <span className="text-blue-500">ConSche</span> Contest Scheduler
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 text-lg text-center text-gray-300 md:text-xl lg:text-2xl"
                >
                    Your one-stop solution for scheduling coding contests and never missing a deadline again!
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-center mt-8 space-x-4"
                >
                    <Link href="/login">
                        <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="px-6 py-3 text-lg font-semibold text-blue-500 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                            Learn More
                        </button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 text-center text-gray-400"
                >
                    <p>Join our community of coders and never miss a contest again!</p>
                    
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 text-center text-gray-400"
                >
                    <p>🔒 We only request access to your Google Calendar to schedule contests</p>
                    <p>🌐 Hosted securely on a verified domain</p>
                    <p>📅 You control what contests get added</p>
                    <p>✅ No personal data is stored</p>
                    <p><Link href="contacts" className="text-blue-500">Contacts</Link> for updates and support.</p>
                    <p>Our Privacy Policy <Link href="/privacy" className="text-blue-500 hover:text-red-500">Privacy</Link></p>
                    <p>Built with ❤️ by <strong>Abhishek Dubey</strong></p>
                </motion.div>
            </div>
        </section>
    )
}