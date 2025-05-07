"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Globe, Leaf, MapPin, Share2, TreePine } from "lucide-react"

// Types pour les données simulées
interface Project {
  id: string
  name: string
  type: string
  location: string
  area: number
  credits: number
  description: string
  createdAt: string
  proofs: Proof[]
  images: string[]
  owner: string
}

interface Proof {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
}

export default function ProjectDetails() {
  const params = useParams()
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
        credits: 450,
        description:
          "Projet de reforestation dans la forêt amazonienne visant à restaurer les zones déboisées et à préserver la biodiversité locale. Ce projet implique la plantation d'espèces d'arbres indigènes et la mise en place de pratiques de gestion durable des forêts. L'objectif est de restaurer l'écosystème forestier, d'améliorer la biodiversité et de séquestrer le carbone atmosphérique pour lutter contre le changement climatique.",
        createdAt: "2023-10-15",
        owner: "Association Forêts Vivantes",
        proofs: [
          {
            id: "p1",
            title: "Plantation initiale",
            description: "Première phase de plantation avec 500 arbres indigènes",
            date: "2023-10-20",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "p2",
            title: "Suivi de croissance",
            description: "Mesure de la croissance des arbres après 3 mois",
            date: "2024-01-15",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "p3",
            title: "Analyse biodiversité",
            description: "Étude de la biodiversité locale et des espèces revenues",
            date: "2024-03-10",
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
        ],
        images: [
          "/placeholder.svg?height=300&width=400",
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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-forest-700 text-white">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl font-bold">GreenProof</h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-forest-600">
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p>Chargement du projet...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-forest-700 text-white">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl font-bold">GreenProof</h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-forest-600">
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p>Projet non trouvé.</p>
            <Link href="/explorer">
              <Button className="mt-4">Retour à l'explorateur</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest-700 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            <h1 className="text-2xl font-bold">GreenProof</h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-forest-600">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/explorer">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <Badge className="ml-3 bg-forest-700">Certifié</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>À propos du projet</CardTitle>
                <CardDescription>Détails et impact environnemental</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <TreePine className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="text-sm font-medium">Type de projet</p>
                    </div>
                    <p>{project.type}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <MapPin className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="text-sm font-medium">Localisation</p>
                    </div>
                    <p>{project.location}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center mb-1">
                      <Leaf className="h-4 w-4 text-forest-700 mr-2" />
                      <p className="text-sm font-medium">Superficie</p>
                    </div>
                    <p>{project.area} hectares</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Projet démarré le {project.createdAt}</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="proofs" className="mb-6">
              <TabsList>
                <TabsTrigger value="proofs">Preuves de certification</TabsTrigger>
                <TabsTrigger value="images">Galerie d'images</TabsTrigger>
              </TabsList>
              <TabsContent value="proofs" className="mt-4 space-y-4">
                {project.proofs.map((proof) => (
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
                        <h3 className="font-bold text-lg mb-2">{proof.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{proof.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Soumis le {proof.date}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="images" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Impact carbone</CardTitle>
                <CardDescription>Crédits carbone générés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center p-4 bg-forest-100 rounded-full mb-4">
                    <Leaf className="h-8 w-8 text-forest-700" />
                  </div>
                  <h3 className="text-4xl font-bold text-forest-700">{project.credits}</h3>
                  <p className="text-gray-500 mt-2">Tonnes de CO₂ compensées</p>
                  <div className="mt-6 p-3 bg-gray-50 rounded-md text-sm">
                    <p className="text-gray-700">
                      Équivalent à la consommation annuelle de {Math.round(project.credits / 2.3)} voitures
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Porteur du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-forest-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-forest-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{project.owner}</h3>
                    <p className="text-sm text-gray-500">Organisation certifiée</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    Organisation spécialisée dans les projets de reforestation et de conservation de la biodiversité.
                  </p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir le profil
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Carte interactive à venir</p>
                    <p className="text-xs text-gray-400 mt-1">Localisation: {project.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Projets similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Protection mangrove"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-forest-700">210 crédits</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Protection mangrove</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  Sénégal • 75 ha
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 line-clamp-3">
                  Conservation des écosystèmes de mangrove côtiers qui jouent un rôle crucial dans la séquestration du
                  carbone.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/explorer/projects/2" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Agroforesterie locale"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-forest-700">180 crédits</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Agroforesterie locale</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  France • 45 ha
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 line-clamp-3">
                  Mise en place de systèmes agroforestiers combinant arbres et cultures agricoles pour améliorer la
                  biodiversité.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/explorer/projects/3" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Restauration de tourbières"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-forest-700">320 crédits</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Restauration de tourbières</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  Irlande • 60 ha
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 line-clamp-3">
                  Restauration de tourbières dégradées pour rétablir leur capacité naturelle à stocker le carbone.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/explorer/projects/4" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6" />
                <h3 className="text-xl font-bold">GreenProof</h3>
              </div>
              <p className="text-gray-300">Plateforme de certification carbone pour les projets climatiques locaux.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/explorer" className="text-gray-300 hover:text-white">
                    Explorer les projets
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-300 hover:text-white">
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-300">
                info@greenproof.com
                <br />
                +33 1 23 45 67 89
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} GreenProof. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
