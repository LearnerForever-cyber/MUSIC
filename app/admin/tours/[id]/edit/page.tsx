import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateTour } from "@/lib/actions/tours"
import { TourForm } from "@/components/admin/tour-form"
import type { Tour } from "@/lib/types"

interface Props {
    params: Promise<{ id: string }>
}

export default async function EditTourPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    const { data: tour } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .single()

    if (!tour) {
        notFound()
    }

    const updateAction = updateTour.bind(null, tour.id)

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Tour</h1>
                <p className="text-muted-foreground">
                    Edit tour details for {tour.title}.
                </p>
            </div>

            <TourForm
                initialData={tour as Tour}
                action={updateAction}
                submitLabel="Update Tour"
            />
        </div>
    )
}
