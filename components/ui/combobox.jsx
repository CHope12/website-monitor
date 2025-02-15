"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { IoTrashBinOutline } from "react-icons/io5";

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

export default function Combobox({ websites, onChange, onRemove }) {  

  const [open, setOpen] = React.useState(false)
  const [currWebsite, setCurrWebsite] = React.useState("")
  
  const [searchWebsite, setSearchWebsite] = React.useState("")

  const validateValue = () => {
    let value = searchWebsite

    console.log("validating");

    if (value === null || value === undefined) return alert("Please enter a website URL.");
    if (value === "") return alert("Please enter a website URL.");  

    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "(www\\.)?" + // www
      "([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}" + // domain name
      "(:[0-9]{1,5})?" + // port
      "(\\/[\\w\\-\\./?%&=]*)?$" // path
    );
    if (!urlRegex.test(value)) return alert("Invalid URL.");   
    
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      value = 'https://' + value;      
    }

    if (!websites.includes(value)) {
      websites.push(value)
    }
    setCurrWebsite(value)
    onChange(value)
    setOpen(false)
  }

  const removeWebsite = (website) => {    

    console.log("website: ");
    console.log(website);
    const req = JSON.stringify({ website: website });
    console.log("req: ");
    console.log(req);

    fetch("/api/websites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: req,
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
        if (data.error === "Website list empty") {
          onRemove(website);
          setCurrWebsite("");
        }
        if (data.error === "Invalid website") {
          alert("Invalid website.");
        }
        if (data.error === "Internal Server Error") {
          alert("Internal Server Error.");
        }
        if (data.error === "Unauthorized") {
          alert("Unauthorized.");
        }
        if (data.error === "Website not found") {
          onRemove(website);
          setCurrWebsite("");
        }
      }
      onRemove(website);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {currWebsite
            ? currWebsite
            : "Select website..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <div className="flex gap-2 border-b border-gray-200 items-center justify-between pr-2">
            <CommandInput onValueChange={(value) => setSearchWebsite(value)} placeholder="Search or add website..." />          
            <Button 
              className="bg-gray-600 text-white h-8 w-8"
              onClick={validateValue}
            >
                +
            </Button>
          </div>
          <CommandList>
            <CommandEmpty>No websites found.</CommandEmpty>
            <CommandGroup>
              {websites.map((website) => (
                <CommandItem
                  key={website}
                  website={website}
                  onSelect={(currentwebsite) => {
                    setCurrWebsite(currentwebsite === currWebsite ? "" : currentwebsite)
                    onChange(website)
                    setOpen(false)
                  }}
                >
                  {/* Remove https:// or http://*/}
                  {website && website.replace(/^(https?:\/\/)?(www\.)?/, '')}
                  <Check
                    className={cn(
                      "ml-auto",
                      currWebsite === website ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div 
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWebsite(website);
                    }}
                  >
                    <IoTrashBinOutline />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
