import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { deleteTour } from "@/lib/actions/tours"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default async function AdminToursPage() {
    const supabase = await createClient()

    const { data: tours, error } = await supabase
        .from("tours")
        .select("id, title, category, price, duration, is_active, created_at")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching tours:", error)
        return <div>Error loading tours</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tours</h1>
                    <p className="text-muted-foreground">
                        Manage your tour packages here.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/tours/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Tour
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tours?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">
                                    No tours found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tours?.map((tour) => (
                                <TableRow key={tour.id}>
                                    <TableCell className="font-medium">{tour.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{tour.category}</Badge>
                                    </TableCell>
                                    <TableCell>₹{tour.price?.toLocaleString() ?? "0"}</TableCell>
                                    <TableCell>{tour.duration}</TableCell>
                                    <TableCell>
                                        {tour.is_active ? (
                                            <Badge className="bg-green-500 hover:bg-green-600">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">Draft</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(tour.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/tours/${tour.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={deleteTour.bind(null, tour.id)}>
                                                <Button variant="ghost" size="icon" className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
