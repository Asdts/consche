import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p>{user.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
