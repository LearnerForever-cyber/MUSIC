import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PlusCircle, Map, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch quick stats
    const { count: toursCount } = await supabase
        .from("tours")
        .select("*", { count: "exact", head: true })

    const { count: activeToursCount } = await supabase
        .from("tours")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Button asChild>
                    <Link href="/admin/tours/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Tour
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
                        <Map className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{toursCount || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            All tours in the database
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
                        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeToursCount || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Tours currently visible to users
                        </p>
                    </CardContent>
                </Card>
                {/* Add more stats cards here later (e.g., Enquiries) */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Overview of recent actions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            No recent activity to display.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
