"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, Filter, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleFilterProps {
  onFilterChange?: (filters: FilterState) => void
}

export interface FilterState {
  jobTypes: string[]
  locations: string[]
  salaryRange: [number, number]
}

export function CollapsibleFilter({ onFilterChange }: CollapsibleFilterProps) {
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

  const [isOpen, setIsOpen] = useState(true)

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!isOpen) {
    return (
      <div className="fixed left-0 top-20 z-30 lg:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-r-lg w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-secondary hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-xl border-r border-border/50 shadow-2xl z-30 overflow-y-auto lg:static lg:top-auto lg:bottom-auto lg:w-auto lg:bg-transparent lg:border-none lg:shadow-none lg:backdrop-blur-none">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </h3>
          <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost" className="hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Job Type Filter */}
        <Card className="border-border/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader
            className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection("jobType")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Job Type</CardTitle>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 text-primary ${
                  expandedSections.jobType ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
          </CardHeader>
          {expandedSections.jobType && (
            <CardContent className="space-y-3 animate-slide-in-down">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={type}
                    checked={filters.jobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeChange(type)}
                    className="group-hover:border-primary transition-colors"
                  />
                  <Label
                    htmlFor={type}
                    className="font-normal cursor-pointer group-hover:text-primary transition-colors"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Location Filter */}
        <Card className="border-border/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader
            className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection("location")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Location</CardTitle>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 text-secondary ${
                  expandedSections.location ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
          </CardHeader>
          {expandedSections.location && (
            <CardContent className="space-y-3 animate-slide-in-down">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2 group">
                  <Checkbox
                    id={location}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() => handleLocationChange(location)}
                    className="group-hover:border-secondary transition-colors"
                  />
                  <Label
                    htmlFor={location}
                    className="font-normal cursor-pointer group-hover:text-secondary transition-colors"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Salary Range Filter */}
        <Card className="border-border/50 hover:shadow-md transition-all duration-200 overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader
            className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection("salary")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Salary Range</CardTitle>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 text-accent ${
                  expandedSections.salary ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>
          </CardHeader>
          {expandedSections.salary && (
            <CardContent className="space-y-4 animate-slide-in-down">
              <Slider
                value={filters.salaryRange}
                onValueChange={handleSalaryChange}
                min={0}
                max={150000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-primary">${filters.salaryRange[0].toLocaleString()}</span>
                <span className="text-secondary">${filters.salaryRange[1].toLocaleString()}</span>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
