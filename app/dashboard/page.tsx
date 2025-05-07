"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, Leaf, Plus, TreePine } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Types pour les données simulées
interface Project {
  id: string
  name: string
  type: string
  location: string
  area: number
  status: "pending" | "verified" | "collecting"
  credits: number
  proofCount: number
  createdAt: string
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCredits: 0,
    pendingProofs: 0,
    verifiedProjects: 0,
  })

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: "1",
          name: "Reforestation Amazonie",
          type: "Reforestation",
          location: "Brésil",
          area: 120,
          status: "verified",
          credits: 450,
          proofCount: 8,
          createdAt: "2023-10-15",
        },
        {
          id: "2",
          name: "Protection mangrove",
          type: "Conservation",
          location: "Sénégal",
          area: 75,
          status: "collecting",
          credits: 210,
          proofCount: 5,
          createdAt: "2023-11-22",
        },
        {
          id: "3",
          name: "Agroforesterie locale",
          type: "Agroforesterie",
          location: "France",
          area: 45,
          status: "pending",
          credits: 0,
          proofCount: 3,
          createdAt: "2024-01-05",
        },
      ]

      setProjects(mockProjects)
      setStats({
        totalProjects: mockProjects.length,
        totalCredits: mockProjects.reduce((sum, project) => sum + project.credits, 0),
        pendingProofs: 4,
        verifiedProjects: mockProjects.filter((p) => p.status === "verified").length,
      })
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <Link href="/dashboard/projects/new">
            <Button className="mt-4 md:mt-0 bg-forest-700 hover:bg-forest-800 text-white">
              <Plus className="mr-2 h-4 w-4" /> Nouveau projet
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Projets totaux</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalProjects}</h3>
                </div>
                <div className="bg-forest-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-forest-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Crédits carbone</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalCredits}</h3>
                </div>
                <div className="bg-forest-100 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-forest-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Preuves en attente</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.pendingProofs}</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Projets certifiés</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.verifiedProjects}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TreePine className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Tous les projets</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="verified">Certifiés</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <p>Chargement des projets...</p>
                </div>
              ) : projects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Projet
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Crédits
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{project.name}</div>
                                <div className="text-sm text-gray-500">{project.location}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{project.type}</div>
                            <div className="text-sm text-gray-500">{project.area} ha</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                project.status === "verified"
                                  ? "bg-forest-100 text-forest-800"
                                  : project.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {project.status === "verified"
                                ? "Certifié"
                                : project.status === "pending"
                                  ? "En attente"
                                  : "Collecte de données"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.credits}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/dashboard/projects/${project.id}`}
                              className="text-forest-700 hover:text-forest-900 mr-4"
                            >
                              Détails
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/proofs/new`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Ajouter preuve
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Vous n'avez pas encore de projets.</p>
                  <Link href="/dashboard/projects/new">
                    <Button className="mt-4 bg-forest-700 hover:bg-forest-800 text-white">
                      <Plus className="mr-2 h-4 w-4" /> Créer un projet
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-center text-gray-500">
                {projects.filter((p) => p.status === "pending").length === 0
                  ? "Aucun projet en attente de vérification."
                  : "Liste des projets en attente de vérification."}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="verified" className="mt-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-center text-gray-500">
                {projects.filter((p) => p.status === "verified").length === 0
                  ? "Aucun projet certifié pour le moment."
                  : "Liste des projets certifiés."}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Activité récente</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-forest-100 rounded-full p-2">
                    <Leaf className="h-5 w-5 text-forest-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Certification obtenue pour "Reforestation Amazonie"</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 2 jours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Nouvelle preuve ajoutée pour "Protection mangrove"</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 5 jours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-orange-100 rounded-full p-2">
                    <Plus className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Nouveau projet créé : "Agroforesterie locale"</p>
                    <p className="text-xs text-gray-500 mt-1">Il y a 1 semaine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
