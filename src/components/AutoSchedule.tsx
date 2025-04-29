// components/AutoSchedule.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const divisionOptions = [
  { label: "Any", value: "all" },
  { label: "Div. 1", value: "Div. 1" },
  { label: "Div. 2", value: "Div. 2" },
  { label: "Div. 3", value: "Div. 3" },
  { label: "Div. 4", value: "Div. 4" },
];

export default function AutoSchedule() {
  const [division, setDivision] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSchedule = async () => {
    setLoading(true);
    setMessage("");

    try {
      const updateRes = await fetch("/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoSchedule: true, contestType: division }),
      });
      const user = await updateRes.json();

      if (!updateRes.ok || !user) {
        setMessage("❌ Failed to update user settings.");
        return;
      }

      const res = await fetch("/api/auto-schedule", {
        method: "POST",
        body: JSON.stringify({ preferredDiv: division }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        if (data.calendarEventIds?.length === 0) {
          setMessage("ℹ️ No matching contests found.");
        } else {
          setMessage(`✅ Scheduled ${data.calendarEventIds.length} contest(s).`);
        }
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
    <Card className="w-full max-w-md mx-auto mt-10 p-6 bg-transparent">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4 text-center">Auto Schedule Codeforces Contests</h2>

        <div className="mb-4">
          <Select value={division} onValueChange={setDivision}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Division" />
            </SelectTrigger>
            <SelectContent>
              {divisionOptions.map((div) => (
                <SelectItem key={div.value} value={div.value}>{div.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleSchedule} disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...</> : "Schedule Contests"}
        </Button>

        {message && <p className={`mt-4 text-sm text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      </CardContent>
    </Card>
  );
}
