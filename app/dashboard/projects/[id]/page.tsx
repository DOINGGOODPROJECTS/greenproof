"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, FileText, Leaf, MapPin, Plus, TreePine, Upload, CheckCircle2, Clock } from "lucide-react"
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
  description: string
  createdAt: string
  proofs: Proof[]
  images: string[]
}

interface Proof {
  id: string
  title: string
  description: string
  date: string
  status: "pending" | "verified" | "rejected"
  imageUrl: string
}

export default function ProjectDetails() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données du projet
    setTimeout(() => {
      const mockProject: Project = {
        id: params.id as string,
        name: "Reforestation Amazonie",
        type: "Reforestation",
        location: "Brésil",
        area: 120,
        status: "verified",
        credits: 450,
        description:
          "Projet de reforestation dans la forêt amazonienne visant à restaurer les zones déboisées et à préserver la biodiversité locale. Ce projet implique la plantation d'espèces d'arbres indigènes et la mise en place de pratiques de gestion durable des forêts.",
        createdAt: "2023-10-15",
        proofs: [
          {
            id: "p1",
            title: "Plantation initiale",
            description: "Première phase de plantation avec 500 arbres indigènes",
            date: "2023-10-20",
            status: "verified",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "p2",
            title: "Suivi de croissance",
            description: "Mesure de la croissance des arbres après 3 mois",
            date: "2024-01-15",
            status: "verified",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "p3",
            title: "Analyse biodiversité",
            description: "Étude de la biodiversité locale et des espèces revenues",
            date: "2024-03-10",
            status: "pending",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
        ],
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
      }

      setProject(mockProject)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p>Chargement du projet...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p>Projet non trouvé.</p>
            <Link href="/dashboard/projects">
              <Button className="mt-4">Retour aux projets</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-forest-700">Certifié</Badge>
      case "pending":
        return <Badge className="bg-yellow-600">En attente</Badge>
      case "collecting":
        return <Badge className="bg-blue-600">Collecte de données</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getProofStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5 text-forest-700" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <FileText className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/projects")} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <div className="ml-3">{getStatusBadge(project.status)}</div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Link href={`/dashboard/projects/${project.id}/proofs/new`}>
              <Button className="bg-forest-700 hover:bg-forest-800 text-white">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une preuve
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Détails du projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Type de projet</p>
                    <div className="flex items-center">
                      <TreePine className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="font-medium">{project.type}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Localisation</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="font-medium">{project.location}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Superficie</p>
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="font-medium">{project.area} hectares</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Date de création</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="font-medium">{project.createdAt}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p>{project.description}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="proofs" className="mt-6">
              <TabsList>
                <TabsTrigger value="proofs">Preuves soumises</TabsTrigger>
                <TabsTrigger value="images">Images du projet</TabsTrigger>
              </TabsList>
              <TabsContent value="proofs" className="mt-4 space-y-4">
                {project.proofs.length > 0 ? (
                  project.proofs.map((proof) => (
                    <Card key={proof.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={proof.imageUrl || "/placeholder.svg"}
                            alt={proof.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{proof.title}</h3>
                            <div className="flex items-center">
                              {getProofStatusIcon(proof.status)}
                              <span className="ml-2 text-sm">
                                {proof.status === "verified"
                                  ? "Vérifié"
                                  : proof.status === "pending"
                                    ? "En attente"
                                    : "Rejeté"}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{proof.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Soumis le {proof.date}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Aucune preuve soumise pour ce projet.</p>
                    <Link href={`/dashboard/projects/${project.id}/proofs/new`}>
                      <Button className="mt-4 bg-forest-700 hover:bg-forest-800 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Ajouter une preuve
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="images" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.images.map((image, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Image ${index + 1} du projet`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Crédits carbone</CardTitle>
                <CardDescription>Crédits générés par ce projet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center p-4 bg-forest-100 rounded-full mb-4">
                    <Leaf className="h-8 w-8 text-forest-700" />
                  </div>
                  <h3 className="text-4xl font-bold text-forest-700">{project.credits}</h3>
                  <p className="text-gray-500 mt-2">Tonnes de CO₂ compensées</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">
                  Voir le certificat
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Progression</CardTitle>
                <CardDescription>Étapes de certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-forest-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-forest-700" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Enregistrement du projet</p>
                      <p className="text-sm text-gray-500">Complété le {project.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-forest-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-forest-700" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Soumission des preuves</p>
                      <p className="text-sm text-gray-500">{project.proofs.length} preuves soumises</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 ${project.status === "verified" ? "bg-forest-100" : "bg-gray-100"} rounded-full p-1.5 mt-0.5`}
                    >
                      {project.status === "verified" ? (
                        <CheckCircle2 className="h-4 w-4 text-forest-700" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Vérification</p>
                      <p className="text-sm text-gray-500">
                        {project.status === "verified" ? "Projet vérifié et certifié" : "En attente de vérification"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 ${project.status === "verified" ? "bg-forest-100" : "bg-gray-100"} rounded-full p-1.5 mt-0.5`}
                    >
                      {project.status === "verified" ? (
                        <CheckCircle2 className="h-4 w-4 text-forest-700" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Génération de crédits</p>
                      <p className="text-sm text-gray-500">
                        {project.status === "verified"
                          ? `${project.credits} crédits générés`
                          : "En attente de certification"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
