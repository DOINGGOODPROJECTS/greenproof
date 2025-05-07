"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, FileText, Leaf, MapPin, ShieldCheck, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Types pour les données simulées
interface Proof {
  id: string
  projectId: string
  projectName: string
  title: string
  description: string
  date: string
  imageUrl: string
}

interface Project {
  id: string
  name: string
  type: string
  location: string
  area: number
  proofCount: number
  pendingProofs: number
  createdAt: string
}

export default function AdminVerification() {
  const [pendingProofs, setPendingProofs] = useState<Proof[]>([])
  const [pendingProjects, setPendingProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockProofs: Proof[] = [
        {
          id: "p1",
          projectId: "1",
          projectName: "Reforestation Amazonie",
          title: "Analyse biodiversité",
          description: "Étude de la biodiversité locale et des espèces revenues sur le site de reforestation.",
          date: "2024-03-10",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "p2",
          projectId: "2",
          projectName: "Protection mangrove",
          title: "Mesures de croissance",
          description: "Mesures de la croissance des palétuviers et évaluation de la santé de l'écosystème.",
          date: "2024-03-15",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "p3",
          projectId: "3",
          projectName: "Agroforesterie locale",
          title: "Plantation initiale",
          description: "Première phase de plantation avec mise en place du système agroforestier.",
          date: "2024-03-05",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
      ]

      const mockProjects: Project[] = [
        {
          id: "3",
          name: "Agroforesterie locale",
          type: "Agroforesterie",
          location: "France",
          area: 45,
          proofCount: 3,
          pendingProofs: 1,
          createdAt: "2024-01-05",
        },
        {
          id: "4",
          name: "Restauration de tourbières",
          type: "Restauration",
          location: "Irlande",
          area: 60,
          proofCount: 5,
          pendingProofs: 2,
          createdAt: "2023-12-10",
        },
      ]

      setPendingProofs(mockProofs)
      setPendingProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const handleVerifyProof = (proofId: string) => {
    setPendingProofs((prev) => prev.filter((proof) => proof.id !== proofId))
  }

  const handleRejectProof = (proofId: string) => {
    setPendingProofs((prev) => prev.filter((proof) => proof.id !== proofId))
  }

  const handleCertifyProject = (projectId: string) => {
    setPendingProjects((prev) => prev.filter((project) => project.id !== projectId))
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <ShieldCheck className="h-6 w-6 text-forest-700 mr-2" />
          <h1 className="text-2xl font-bold">Vérification et certification</h1>
        </div>

        <Tabs defaultValue="proofs" className="mb-8">
          <TabsList>
            <TabsTrigger value="proofs">Preuves à vérifier</TabsTrigger>
            <TabsTrigger value="projects">Projets à certifier</TabsTrigger>
          </TabsList>
          <TabsContent value="proofs" className="mt-4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Preuves en attente de vérification</h2>
                <p className="text-sm text-gray-500">Vérifiez les preuves soumises par les porteurs de projets</p>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <p>Chargement des preuves...</p>
                </div>
              ) : pendingProofs.length > 0 ? (
                <div className="divide-y">
                  {pendingProofs.map((proof) => (
                    <div key={proof.id} className="p-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                          <img
                            src={proof.imageUrl || "/placeholder.svg"}
                            alt={proof.title}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg">{proof.title}</h3>
                              <p className="text-sm text-gray-500">Projet: {proof.projectName}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <Badge className="bg-yellow-600">En attente</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{proof.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            <span>Soumis le {proof.date}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              className="bg-forest-700 hover:bg-forest-800 text-white"
                              onClick={() => handleVerifyProof(proof.id)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" /> Valider
                            </Button>
                            <Button
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleRejectProof(proof.id)}
                            >
                              <X className="mr-2 h-4 w-4" /> Rejeter
                            </Button>
                            <Button variant="outline">Demander plus d'informations</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Aucune preuve en attente de vérification.</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="projects" className="mt-4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Projets prêts pour certification</h2>
                <p className="text-sm text-gray-500">
                  Projets ayant suffisamment de preuves validées pour être certifiés
                </p>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <p>Chargement des projets...</p>
                </div>
              ) : pendingProjects.length > 0 ? (
                <div className="divide-y">
                  {pendingProjects.map((project) => (
                    <div key={project.id} className="p-4">
                      <Card>
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <CardTitle>{project.name}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {project.location} • {project.area} ha
                              </CardDescription>
                            </div>
                            <Badge className="mt-2 md:mt-0 bg-yellow-600 self-start md:self-auto">
                              En attente de certification
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm text-gray-500">Type de projet</p>
                              <p className="font-medium">{project.type}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm text-gray-500">Preuves validées</p>
                              <p className="font-medium">
                                {project.proofCount - project.pendingProofs} / {project.proofCount}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm text-gray-500">Date de création</p>
                              <p className="font-medium">{project.createdAt}</p>
                            </div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-md border border-green-100">
                            <div className="flex items-center">
                              <Leaf className="h-5 w-5 text-green-600 mr-2" />
                              <p className="font-medium">Estimation des crédits carbone</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Ce projet pourrait générer environ{" "}
                              <span className="font-bold text-green-600">180-220</span> crédits carbone basés sur sa
                              superficie et son type.
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-2">
                          <Button
                            className="bg-forest-700 hover:bg-forest-800 text-white w-full sm:w-auto"
                            onClick={() => handleCertifyProject(project.id)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Certifier le projet
                          </Button>
                          <Button variant="outline" className="w-full sm:w-auto">
                            Voir les détails
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Aucun projet en attente de certification.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Statistiques de vérification</CardTitle>
            <CardDescription>Aperçu de l'activité de vérification et certification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-forest-100 p-2 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-forest-700" />
                  </div>
                  <h3 className="font-medium">Preuves vérifiées</h3>
                </div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-gray-500 mt-1">Ce mois-ci</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-forest-100 p-2 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-forest-700" />
                  </div>
                  <h3 className="font-medium">Projets certifiés</h3>
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500 mt-1">Ce mois-ci</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-forest-100 p-2 rounded-full mr-3">
                    <Leaf className="h-5 w-5 text-forest-700" />
                  </div>
                  <h3 className="font-medium">Crédits générés</h3>
                </div>
                <p className="text-2xl font-bold">1,240</p>
                <p className="text-sm text-gray-500 mt-1">Ce mois-ci</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
