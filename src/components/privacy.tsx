// src/app/privacy-policy/page.tsx
import {Card} from "@/components/ui/card"
import Link from "next/link";

export default function Privacy() {
    return (

    <div className="flex min-h-screen mx-auto py-6 bg-gradient-to-b from-[#a95007] to-[#d19b5d]">
      
      <Card className="p-6 max-w-3xl mx-auto bg-gradient-to-b from-[#d19b5d] to-[#d19b5d]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Your privacy is important to us</p>
      </div>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-2">We do not store your personal data.</p>
        <p className="mb-2">We only use your Google Calendar access to schedule contests you opt into.</p>
        <p className="mb-2">No data is shared with third parties.</p>
        <p>Contact us at abhigns369@gmail.com for any concerns.</p>
        <Link href='/' className="text-blue-500 hover:underline mt-4">Back to Home</Link>
      </Card>
      </div>
    );
  }
  