"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Updated Schema - images is now handled separately or as optional string array for validation
// We'll trust the server logic to build the array
const TourSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    short_description: z.string().min(1, "Short description is required"),
    destination: z.string().min(1, "Destination is required"),
    category: z.string().min(1, "Category is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    original_price: z.coerce.number().optional().nullable(),
    duration_days: z.coerce.number().min(1, "Duration (days) must be at least 1"),
    duration_nights: z.coerce.number().min(0, "Duration (nights) must be at least 0"),
    max_group_size: z.coerce.number().min(1, "Group size must be at least 1"),
    highlights: z.string().transform((val) => val.split("\n").filter((s) => s.trim() !== "")),
    includes: z.string().transform((val) => val.split("\n").filter((s) => s.trim() !== "")),
    // images: z.array(z.string()).optional(), // Handled manually
    is_featured: z.coerce.boolean(),
    is_active: z.coerce.boolean(),
})

async function uploadImages(files: File[]) {
    const supabase = await createClient()
    const uploadedUrls: string[] = []

    for (const file of files) {
        if (file.size === 0) {
            continue;
        }

        // Sanitize filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('tours')
            .upload(filePath, file)

        if (uploadError) {
            console.error("Upload Error:", uploadError)
            continue
        }

        const { data: { publicUrl } } = supabase.storage
            .from('tours')
            .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
    }

    return uploadedUrls
}

export async function createTour(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { message: "Unauthorized" }
    }

    // Helper to get array from formData if needed, but we'll use string conversion above for textareas
    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        short_description: formData.get("short_description"),
        destination: formData.get("destination"),
        category: formData.get("category"),
        price: formData.get("price"),
        original_price: formData.get("original_price") || null,
        duration_days: formData.get("duration_days"),
        duration_nights: formData.get("duration_nights"),
        max_group_size: formData.get("max_group_size"),
        highlights: formData.get("highlights"),
        includes: formData.get("includes"),
        // Images handled below
        is_featured: formData.get("is_featured") === "on",
        is_active: formData.get("is_active") === "on",
    }

    const validatedFields = TourSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Tour.",
        }
    }

    // Handle Image Uploads
    const imageFiles = formData.getAll("images") as File[]
    const uploadedImageUrls = await uploadImages(imageFiles)

    // Construct the duration string e.g. "5 Days / 4 Nights"
    const durationString = `${validatedFields.data.duration_days} Days / ${validatedFields.data.duration_nights} Nights`

    const { duration_days, duration_nights, max_group_size, includes, ...rest } = validatedFields.data

    const { error } = await supabase.from("tours").insert({
        ...rest,
        images: uploadedImageUrls,
        duration: durationString,
        group_size: `${max_group_size} People`,
        inclusions: includes,
        itinerary: [],
    })

    if (error) {
        return { message: `Database Error: ${error.message}` }
    }

    revalidatePath("/tours")
    revalidatePath("/admin/tours")
    redirect("/admin/tours")
}

export async function updateTour(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { message: "Unauthorized" }
    }

    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        short_description: formData.get("short_description"),
        destination: formData.get("destination"),
        category: formData.get("category"),
        price: formData.get("price"),
        original_price: formData.get("original_price") || null,
        duration_days: formData.get("duration_days"),
        duration_nights: formData.get("duration_nights"),
        max_group_size: formData.get("max_group_size"),
        highlights: formData.get("highlights"),
        includes: formData.get("includes"),
        is_featured: formData.get("is_featured") === "on",
        is_active: formData.get("is_active") === "on"
    }

    const validatedFields = TourSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Tour.",
        }
    }

    // Handle Images
    // 1. Get existing images (which were hidden inputs)
    const existingImages = formData.getAll("existing_images") as string[]

    // 2. Upload new images
    const newFiles = formData.getAll("images") as File[]
    const newImageUrls = await uploadImages(newFiles)

    // 3. Combine
    const finalImages = [...existingImages, ...newImageUrls]

    const durationString = `${validatedFields.data.duration_days} Days / ${validatedFields.data.duration_nights} Nights`

    const { duration_days, duration_nights, max_group_size, includes, ...rest } = validatedFields.data

    const { error } = await supabase
        .from("tours")
        .update({
            ...rest,
            images: finalImages,
            duration: durationString,
            group_size: `${max_group_size} People`,
            inclusions: includes,
        })
        .eq("id", id)

    if (error) {
        return { message: `Database Error: ${error.message}` }
    }

    revalidatePath("/tours")
    revalidatePath("/admin/tours")
    revalidatePath(`/tours/${validatedFields.data.slug}`)
    revalidatePath(`/admin/tours/${id}/edit`)
    redirect("/admin/tours")
}

export async function deleteTour(id: string) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const { error } = await supabase
        .from("tours")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error("Failed to delete tour")
    }

    revalidatePath("/tours")
    revalidatePath("/admin/tours")
}
