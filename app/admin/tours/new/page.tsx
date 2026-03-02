"use client"

import { createTour } from "@/lib/actions/tours"
import { TourForm } from "@/components/admin/tour-form"

export default function NewTourPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Tour</h1>
                <p className="text-muted-foreground">
                    Create a new tour package.
                </p>
            </div>

            <TourForm action={createTour} submitLabel="Create Tour" />
        </div>
    )
}
