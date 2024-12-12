"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { setToken, unsetToken } from "@/lib/auth";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const updateLoginState = () => {
      const jwt = localStorage.getItem("jwt");
      setIsLogin(!!jwt);
      if (jwt) console.log("JWT Token in Header:", jwt);
      else console.log("No jwt token");
    };

    updateLoginState();

    // Listen for storage changes in other tabs
    window.addEventListener("storage", updateLoginState);

    return () => {
      window.removeEventListener("storage", updateLoginState);
    };
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("jwt");
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between py-6 px-4"
      >
        <div className="flex lg:flex-1">
          <Link href="#">
            <Image
              src="/assets/logo.jpg"
              width={100}
              height={50}
              alt="Logo of CPS Academy"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
              My Courses{" "}
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          {/* Other links */}
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Features
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Contests
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Company
          </Link>
        </PopoverGroup>
        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {/* Search Icon */}
          <Link href="#" className="text-sm font-semibold text-gray-900">
            <MagnifyingGlassIcon
              width={28}
              className="cursor-pointer hover:scale-110 hover:transition-transform"
            />
          </Link>

          {/* Login/Logout Button */}
          {isLogin ? (
            // Dropdown Menu for Logged In User
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserCircleIcon
                  width={28}
                  className="cursor-pointer hover:scale-110 hover:transition-transform"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Progress Report</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <div>
                <Button className="bg-gray-500 hover:bg-gray-800 shadow-lg px-3 py-1 text-sm">
                  Login
                </Button>
              </div>
            </Link>
          )}

          {/* Additional Icons */}
          <Link href="/courses" className="text-sm font-semibold text-gray-900">
            <BookOpenIcon
              width={28}
              className="cursor-pointer hover:scale-110 hover:transition-transform"
            />
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Courses
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6 flex gap-5">
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  <MagnifyingGlassIcon
                    width={22}
                    className="cursor-pointer hover:scale-110 hover:transition-transform"
                  />
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  <UserCircleIcon
                    width={22}
                    className="cursor-pointer hover:scale-110 hover:transition-transform"
                  />
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  <BookOpenIcon
                    width={22}
                    className="cursor-pointer hover:scale-110 hover:transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
