"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function Combobox({ websites, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [website, setWebsite] = React.useState("")  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {website
            ? website
            : "Select website..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search website..." />
          <CommandList>
            <CommandEmpty>No website found.</CommandEmpty>
            <CommandGroup>
              {websites.map((website) => (
                <CommandItem
                  key={website.website}
                  website={website.website}
                  onSelect={(currentwebsite) => {
                    setWebsite(currentwebsite === website ? "" : currentwebsite)
                    onChange(website)
                    setOpen(false)
                  }}
                >
                  {website.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      website === website.website ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
