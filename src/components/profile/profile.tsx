"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Instagram, Linkedin, Pencil, Twitter } from "lucide-react"

export default function Profile() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">Musharof Chowdhury</h2>
              <p className="text-muted-foreground">Team Manager</p>
              <p className="text-sm text-muted-foreground">Arizona, United States</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="outline" className="ml-auto">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">First Name</p>
              <p className="mt-1">Musharof</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Name</p>
              <p className="mt-1">Chowdhury</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email address</p>
              <p className="mt-1">randomuser@pimjo.com</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="mt-1">+09 363 398 46</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bio</p>
              <p className="mt-1">Team Manager</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Address</CardTitle>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Country</p>
              <p className="mt-1">United States</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">City/State</p>
              <p className="mt-1">Phoenix, Arizona, United States</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
