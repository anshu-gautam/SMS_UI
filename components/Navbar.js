"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  UserPlus,
  LogIn,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { authHelpers, convertToInitials } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    authHelpers.signOut();
    router.push("/signIn");
  };

  if (!authHelpers.isUserLoggedIn()) {
    router.push("/signIn");
  }

  useEffect(() => {
    setUserName(authHelpers.getUser() || "");
  }, []);

  return (
    <nav className="min-h-screen bg-background border-r w-[8%] bg-gray-900">
      <div className="flex flex-col items-center justify-between py-10 h-full">
        <div className="flex flex-col items-center space-y-8 w-full">
          <Link
            href="/"
            className="w-3/4 h-10 bg-white flex flex-col text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 text-xl font-light mb-20 border border-black relative"
          >
            <div className="absolute bg-gray-700 h-10 w-full left-0 skew-x-6 transform translate-x-2"></div>
            <div className="absolute text-white z-50 top-4 left-5">SMOS</div>
          </Link>
          <Link
            href="/"
            className={`p-4 bg-gray-800 text-white hover:bg-gray-300 hover:text-blue-700 hover:scale-105 duration-300 transition ${
              pathname === "/" ? "active" : ""
            }`}
          >
            <LayoutDashboard
              strokeWidth="1.5"
              className="inline-block w-6 h-6"
            />
          </Link>
          <Link
            href="/students"
            className={`p-4 bg-gray-800 text-white hover:bg-gray-300 hover:text-blue-700 hover:scale-105 duration-300 transition ${
              pathname === "/students" ? "active" : ""
            }`}
          >
            <Users strokeWidth="1.5" className="inline-block w-6 h-6" />
          </Link>
          <Link
            href="/students/create"
            className={`p-4 bg-gray-800 text-white hover:bg-gray-300 hover:text-blue-700 hover:scale-105 duration-300 transition ${
              pathname === "/students/create" ? "active" : ""
            }`}
          >
            <UserPlus strokeWidth="1.5" className="inline-block w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-col justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative rounded-full w-10 h-10 text-gray-600 hover:scale-110 duration-300 transition"
              >
                <Avatar>
                  <AvatarFallback>{convertToInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-auto z-50 bg-red-100"
              align="end"
              side="right"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={handleLogOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
