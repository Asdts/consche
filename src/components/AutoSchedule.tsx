// components/AutoSchedule.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AutoSchedule() {
  const [division, setDivision] = useState("Any");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSchedule = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auto-schedule", {
        method: "POST",
        body: JSON.stringify({ preferredDiv: division }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Scheduled ${data.calendarEventIds.length} contest(s).`);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4 text-center">Auto Schedule Codeforces Contests</h2>

        <div className="mb-4">
          <Select value={division} onValueChange={setDivision}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent>
              {["Any", "Div. 1", "Div. 2", "Div. 3", "Div. 4"].map((div) => (
                <SelectItem key={div} value={div}>{div}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleSchedule} disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...</> : "Schedule Contests"}
        </Button>

        {message && <p className="mt-4 text-sm text-center text-muted-foreground">{message}</p>}
      </CardContent>
    </Card>
  );
}
