"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validatedFields = LoginSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid inputs. Failed to login.",
        }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    })

    // console.log("Login error:", error) 

    if (error) {
        return { message: "Could not authenticate user. Check your credentials." }
    }

    revalidatePath("/admin")
    redirect("/admin")
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath("/")
    redirect("/auth/login")
}
