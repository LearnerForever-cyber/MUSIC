"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Helper: only accept URLs that start with http(s):// or /
function isValidImageUrl(url: unknown): url is string {
    if (typeof url !== 'string' || url.trim() === '') return false
    const trimmed = url.trim()
    return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')
}

// Updated Schema - images is now handled separately or as optional string array for validation
// We'll trust the server logic to build the array
const TourSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    short_description: z.string().optional(),
    destination: z.string().optional(),
    category: z.string().optional(),
    price: z.coerce.number().optional().nullable(),
    original_price: z.coerce.number().optional().nullable(),
    duration_days: z.coerce.number().optional(),
    duration_nights: z.coerce.number().optional(),
    max_group_size: z.coerce.number().optional(),
    highlights: z.string().optional().transform((val) => val ? val.split("\n").filter((s) => s.trim() !== "") : []),
    includes: z.string().optional().transform((val) => val ? val.split("\n").filter((s) => s.trim() !== "") : []),
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

    const { duration_days, duration_nights, max_group_size, includes, slug, ...rawRest } = validatedFields.data

    // Only store validated image URLs — filter out any invalid/placeholder values
    const sanitizedImages = uploadedImageUrls.filter(isValidImageUrl)
    const coverImage = sanitizedImages[0] ?? null

    const finalSlug = slug || (rawRest.title ? rawRest.title.toLowerCase().replace(/[^a-z0-9\s]+/g, '').replace(/\s+/g, '-') + '-' + Date.now() : 'tour-' + Date.now())



    const { error } = await supabase.from("tours").insert({
        title: rawRest.title || "",
        description: rawRest.description || "",
        short_description: rawRest.short_description || "",
        destination: rawRest.destination || "",
        category: rawRest.category || "",
        price: rawRest.price || 0,
        original_price: rawRest.original_price,
        highlights: rawRest.highlights,
        is_featured: rawRest.is_featured,
        is_active: rawRest.is_active,
        slug: finalSlug,
        images: sanitizedImages,
        cover_image: coverImage,
        duration: (duration_days || duration_nights) ? `${duration_days || 0} Days / ${duration_nights || 0} Nights` : "",
        group_size: max_group_size ? `${max_group_size} People` : "",
        inclusions: includes,
        itinerary: [],
    })

    if (error) {
        return { message: `Database Error: ${error.message}` }
    }

    revalidatePath("/", "layout")
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
    // 1. Get existing images (which were hidden inputs) — validate each one
    const existingImages = (formData.getAll("existing_images") as string[]).filter(isValidImageUrl)

    // 2. Upload new images
    const newFiles = formData.getAll("images") as File[]
    const newImageUrls = (await uploadImages(newFiles)).filter(isValidImageUrl)

    // 3. Combine, keeping only valid URLs
    const finalImages = [...existingImages, ...newImageUrls]
    const finalCoverImage = finalImages[0] ?? null

    const { duration_days, duration_nights, max_group_size, includes, slug, ...rawRest } = validatedFields.data



    const finalSlug = slug || (rawRest.title ? rawRest.title.toLowerCase().replace(/[^a-z0-9\s]+/g, '').replace(/\s+/g, '-') + '-' + Date.now() : 'tour-' + Date.now())

    const { error } = await supabase
        .from("tours")
        .update({
            title: rawRest.title || "",
            description: rawRest.description || "",
            short_description: rawRest.short_description || "",
            destination: rawRest.destination || "",
            category: rawRest.category || "",
            price: rawRest.price || 0,
            original_price: rawRest.original_price,
            highlights: rawRest.highlights,
            is_featured: rawRest.is_featured,
            is_active: rawRest.is_active,
            slug: finalSlug,
            images: finalImages,
            cover_image: finalCoverImage,
            duration: (duration_days || duration_nights) ? `${duration_days || 0} Days / ${duration_nights || 0} Nights` : "",
            group_size: max_group_size ? `${max_group_size} People` : "",
            inclusions: includes,
        })
        .eq("id", id)

    if (error) {
        return { message: `Database Error: ${error.message}` }
    }

    revalidatePath("/", "layout")
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

    revalidatePath("/", "layout")
}
