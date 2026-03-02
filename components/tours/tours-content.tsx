"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TourCard } from "@/components/tour-card"
import type { Tour } from "@/lib/types"

interface ToursContentProps {
  tours: Tour[]
  categories: string[]
  destinations: string[]
  initialSearch?: string
  initialCategory?: string
  initialDestination?: string
}

export function ToursContent({
  tours,
  categories,
  destinations,
  initialSearch,
  initialCategory,
  initialDestination,
}: ToursContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialSearch || "")

  function updateFilter(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/tours?${params.toString()}`)
  }

  function clearFilters() {
    setSearch("")
    router.push("/tours")
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateFilter("search", search || undefined)
  }

  const hasFilters = initialSearch || initialCategory || initialDestination

  return (
    <section className="py-12 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Filter Tours
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tours, destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" size="default">
                Search
              </Button>
            </form>
            <Select
              value={initialCategory || "all"}
              onValueChange={(val) =>
                updateFilter("category", val === "all" ? undefined : val)
              }
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={initialDestination || "all"}
              onValueChange={(val) =>
                updateFilter("destination", val === "all" ? undefined : val)
              }
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {initialSearch && (
                <Badge variant="secondary" className="gap-1">
                  Search: {initialSearch}
                  <button onClick={() => updateFilter("search", undefined)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {initialCategory && (
                <Badge variant="secondary" className="gap-1">
                  {initialCategory}
                  <button onClick={() => updateFilter("category", undefined)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {initialDestination && (
                <Badge variant="secondary" className="gap-1">
                  {initialDestination}
                  <button onClick={() => updateFilter("destination", undefined)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-primary hover:text-primary h-auto p-0"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{tours.length}</span>{" "}
            {tours.length === 1 ? "tour" : "tours"}
          </p>
        </div>

        {tours.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Pagination UI */}
            <div className="mt-12 flex justify-center gap-4">
              <Button
                variant="outline"
                disabled={Number(searchParams.get('page') || 1) <= 1}
                onClick={() => updateFilter('page', (Number(searchParams.get('page') || 1) - 1).toString())}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={tours.length < 9}
                onClick={() => updateFilter('page', (Number(searchParams.get('page') || 1) + 1).toString())}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              No tours found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
