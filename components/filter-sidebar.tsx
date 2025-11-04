"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, Filter, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void
}

export interface FilterState {
  jobTypes: string[]
  locations: string[]
  salaryRange: [number, number]
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    salaryRange: [0, 150000],
  })

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    location: true,
    salary: true,
  })

  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const jobTypes = ["Full Time", "Part Time", "Contract", "Freelance"]
  const locations = ["Remote", "Dhaka", "Chittagong", "Sylhet"]

  const handleJobTypeChange = (type: string) => {
    const updated = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type]
    const newFilters = { ...filters, jobTypes: updated }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleLocationChange = (location: string) => {
    const updated = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location]
    const newFilters = { ...filters, locations: updated }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleSalaryChange = (value: [number, number]) => {
    const newFilters = { ...filters, salaryRange: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters = { jobTypes: [], locations: [], salaryRange: [0, 150000] as [number, number] }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  if (!isFilterOpen) {
    return (
      <div className="fixed bottom-6 right-6 lg:static">
        <Button
          onClick={() => setIsFilterOpen(true)}
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl bg-gradient-to-br from-primary to-secondary hover:scale-110 transition-all"
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between mb-2 lg:hidden">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </h3>
        <Button onClick={() => setIsFilterOpen(false)} size="icon" variant="ghost">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Job Type */}
      <Card className="border-border/50 shadow-sm backdrop-blur-sm bg-card/80 hover:shadow-md transition-all">
        <CardHeader onClick={() => toggleSection("jobType")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Job Type</CardTitle>
          <ChevronDown className={`transition-transform ${expandedSections.jobType ? "rotate-0" : "-rotate-90"}`} />
        </CardHeader>
        {expandedSections.jobType && (
          <CardContent className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filters.jobTypes.includes(type)} onCheckedChange={() => handleJobTypeChange(type)} />
                <span>{type}</span>
              </label>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Location */}
      <Card className="border-border/50 shadow-sm backdrop-blur-sm bg-card/80 hover:shadow-md transition-all">
        <CardHeader onClick={() => toggleSection("location")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Location</CardTitle>
          <ChevronDown className={`transition-transform ${expandedSections.location ? "rotate-0" : "-rotate-90"}`} />
        </CardHeader>
        {expandedSections.location && (
          <CardContent className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filters.locations.includes(location)} onCheckedChange={() => handleLocationChange(location)} />
                <span>{location}</span>
              </label>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Salary */}
      <Card className="border-border/50 shadow-sm backdrop-blur-sm bg-card/80 hover:shadow-md transition-all">
        <CardHeader onClick={() => toggleSection("salary")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Salary Range</CardTitle>
          <ChevronDown className={`transition-transform ${expandedSections.salary ? "rotate-0" : "-rotate-90"}`} />
        </CardHeader>
        {expandedSections.salary && (
          <CardContent className="space-y-4">
            <Slider value={filters.salaryRange} onValueChange={handleSalaryChange} min={0} max={150000} step={5000} />
            <div className="flex justify-between text-sm">
              <span>${filters.salaryRange[0].toLocaleString()}</span>
              <span>${filters.salaryRange[1].toLocaleString()}</span>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
        <Button className="bg-gradient-to-r from-primary to-secondary text-white shadow">Apply</Button>
      </div>
    </div>
  )
}
