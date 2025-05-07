"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Leaf, LogOut, Menu, Plus, Globe, FileText, ShieldCheck, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const isAdmin = user?.role === "admin"

  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { name: "Mes projets", href: "/dashboard/projects", icon: FileText },
    { name: "Créer un projet", href: "/dashboard/projects/new", icon: Plus },
    { name: "Explorer", href: "/explorer", icon: Globe },
  ]

  const adminNavigation = [{ name: "Vérification", href: "/admin/verification", icon: ShieldCheck }]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar pour desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-forest-700" />
              <span className="text-xl font-bold">GreenProof</span>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-forest-100 text-forest-800"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      pathname === item.href ? "text-forest-700" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className="pt-4 pb-2">
                    <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Administration
                    </div>
                  </div>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href
                          ? "bg-green-100 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          pathname === item.href ? "text-green-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-forest-700 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name || user?.email}</p>
                <Button
                  variant="ghost"
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center mt-1 p-0 h-auto"
                  onClick={handleLogout}
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold">GreenProof</span>
                </Link>
              </div>
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        pathname === item.href ? "text-green-600" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}

                {isAdmin && (
                  <>
                    <div className="pt-4 pb-2">
                      <div className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Administration
                      </div>
                    </div>
                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          pathname === item.href
                            ? "bg-green-100 text-green-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            pathname === item.href ? "text-green-600" : "text-gray-400 group-hover:text-gray-500"
                          }`}
                        />
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user?.name || user?.email}</p>
                    <Button
                      variant="ghost"
                      className="text-xs text-gray-500 hover:text-gray-700 flex items-center mt-1 p-0 h-auto"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-3 w-3 mr-1" />
                      Déconnexion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10 md:hidden">
          <div className="px-4 sm:px-6 py-4 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">GreenProof</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
