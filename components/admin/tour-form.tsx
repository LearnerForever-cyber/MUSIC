"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tour } from "@/lib/types"

interface TourFormProps {
    initialData?: Partial<Tour>
    action: (prevState: any, formData: FormData) => Promise<{ message?: string; errors?: any }>
    submitLabel?: string
}

const initialState = {
    message: "",
    errors: undefined,
}

export function TourForm({ initialData, action, submitLabel = "Save Tour" }: TourFormProps) {
    const [state, formAction] = useActionState(action, initialState)

    return (
        <form action={formAction} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Tour Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={initialData?.title}
                                placeholder="e.g. Magical Bali Retreat"
                            />
                            {state.errors?.title && <p className="text-destructive text-sm">{state.errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL friendly)</Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue={initialData?.slug}
                                placeholder="e.g. magical-bali-retreat"
                            />
                            {state.errors?.slug && <p className="text-destructive text-sm">{state.errors.slug}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="short_description">Short Description (Card View)</Label>
                        <Textarea
                            id="short_description"
                            name="short_description"
                            defaultValue={initialData?.short_description}
                            placeholder="Brief summary for listing cards..."
                        />
                        {state.errors?.short_description && <p className="text-destructive text-sm">{state.errors.short_description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Full Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={initialData?.description}
                            placeholder="Detailed tour description..."
                            className="min-h-[150px]"
                        />
                        {state.errors?.description && <p className="text-destructive text-sm">{state.errors.description}</p>}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Details & Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="destination">Destination</Label>
                            <Input
                                id="destination"
                                name="destination"
                                defaultValue={initialData?.destination}
                                placeholder="e.g. Bali, Indonesia"
                            />
                            {state.errors?.destination && <p className="text-destructive text-sm">{state.errors.destination}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" defaultValue={initialData?.category}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beach">Beach</SelectItem>
                                    <SelectItem value="Adventure">Adventure</SelectItem>
                                    <SelectItem value="Culture">Culture</SelectItem>
                                    <SelectItem value="Luxury">Luxury</SelectItem>
                                    <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.category && <p className="text-destructive text-sm">{state.errors.category}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="max_group_size">Max Group Size</Label>
                            <Input
                                id="max_group_size"
                                name="max_group_size"
                                type="number"
                                min="1"
                                defaultValue={
                                    initialData?.group_size && initialData.group_size.includes(' ')
                                        ? parseInt(initialData.group_size.split(' ')[0])
                                        : undefined
                                }
                                placeholder="e.g. 15"
                            />
                            {state.errors?.max_group_size && <p className="text-destructive text-sm">{state.errors.max_group_size}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={initialData?.price ?? ""}
                                placeholder="e.g. 1299"
                            />
                            {state.errors?.price && <p className="text-destructive text-sm">{state.errors.price}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original_price">Original Price (₹) (Optional)</Label>
                            <Input
                                id="original_price"
                                name="original_price"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={initialData?.original_price ?? ""}
                                placeholder="e.g. 1599"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="duration_days">Days</Label>
                            <Input
                                id="duration_days"
                                name="duration_days"
                                type="number"
                                min="1"
                                defaultValue={
                                    initialData?.duration && initialData.duration.startsWith(' ') === false
                                        ? parseInt(initialData.duration.split(' ')[0])
                                        : undefined
                                }
                            />
                            {state.errors?.duration_days && <p className="text-destructive text-sm">{state.errors.duration_days}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration_nights">Nights</Label>
                            <Input
                                id="duration_nights"
                                name="duration_nights"
                                type="number"
                                min="0"
                                defaultValue={
                                    initialData?.duration && initialData.duration.includes('/')
                                        ? parseInt(initialData.duration.split('/')[1]?.trim().split(' ')[0] || "0")
                                        : undefined
                                }
                            />
                            {state.errors?.duration_nights && <p className="text-destructive text-sm">{state.errors.duration_nights}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="highlights">Highlights (One per line)</Label>
                        <Textarea
                            id="highlights"
                            name="highlights"
                            defaultValue={initialData?.highlights?.join("\n")}
                            placeholder="Sunset at Uluwatu&#10;Snorkeling in Gili T"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="includes">What's Included (One per line)</Label>
                        <Textarea
                            id="includes"
                            name="includes"
                            defaultValue={initialData?.inclusions?.join("\n")}
                            placeholder="Accommodation&#10;Breakfast&#10;Transfers"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="images">Tour Images</Label>

                        {/* File Input for New Images */}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                            />
                            <p className="text-xs text-muted-foreground">Upload one or more images (JPG, PNG, WebP).</p>
                        </div>

                        {/* Display & Persist Existing Images */}
                        {initialData?.images && initialData.images.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">Current Images:</Label>
                                <div className="flex flex-wrap gap-4">
                                    {initialData.images.map((img, index) => (
                                        <div key={index} className="relative group w-24 h-24 rounded-md overflow-hidden border">
                                            <img
                                                src={img}
                                                alt={`Tour image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Hidden input to keep this image on update */}
                                            <input type="hidden" name="existing_images" value={img} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">New uploads will be added to these images.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="is_active" name="is_active" defaultChecked={initialData?.is_active} />
                        <Label htmlFor="is_active">Active (Visible to users)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="is_featured" name="is_featured" defaultChecked={initialData?.is_featured} />
                        <Label htmlFor="is_featured">Featured (Show on homepage)</Label>
                    </div>
                </CardContent>
            </Card>

            {state.message && (
                <p className="text-destructive font-medium" aria-live="polite">{state.message}</p>
            )}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    )
}
