import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingBag, User, ChevronDown } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-[#004236]">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">CrickStatLK</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/matches"
            className="text-white transition-colors hover:text-white/80"
          >
            Matches
          </Link>
          <Link
            href="/players"
            className="text-white transition-colors hover:text-white/80"
          >
            Players
          </Link>
          <Link
            href="/videos"
            className="text-white transition-colors hover:text-white/80"
          >
            Videos
          </Link>
          <Link
            href="/players"
            className="text-white transition-colors hover:text-white/80"
          >
            Players
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/rankings">Rankings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/teams">Teams</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/stats">Statistics</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden items-center space-x-2 sm:flex">
            <span className="text-sm text-white">RUN BY</span>
            <span className="text-sm font-bold text-white">HCLTech</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Link href="/tickets" className="flex items-center space-x-2">
              Tickets
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Link href="/shop">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shop</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

