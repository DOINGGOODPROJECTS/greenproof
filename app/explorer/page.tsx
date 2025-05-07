"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Leaf, MapPin, Search, TreePine } from "lucide-react"

// Types pour les données simulées
interface Project {
  id: string
  name: string
  type: string
  location: string
  area: number
  credits: number
  description: string
  imageUrl: string
}

export default function Explorer() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

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
          credits: 450,
          description:
            "Projet de reforestation dans la forêt amazonienne visant à restaurer les zones déboisées et à préserver la biodiversité locale.",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "2",
          name: "Protection mangrove",
          type: "Conservation",
          location: "Sénégal",
          area: 75,
          credits: 210,
          description:
            "Conservation des écosystèmes de mangrove côtiers qui jouent un rôle crucial dans la séquestration du carbone et la protection contre l'érosion.",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "3",
          name: "Agroforesterie locale",
          type: "Agroforesterie",
          location: "France",
          area: 45,
          credits: 180,
          description:
            "Mise en place de systèmes agroforestiers combinant arbres et cultures agricoles pour améliorer la biodiversité et la séquestration de carbone.",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "4",
          name: "Restauration de tourbières",
          type: "Restauration",
          location: "Irlande",
          area: 60,
          credits: 320,
          description:
            "Restauration de tourbières dégradées pour rétablir leur capacité naturelle à stocker le carbone et préserver ces écosystèmes uniques.",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
        {
          id: "5",
          name: "Énergie solaire communautaire",
          type: "Énergie renouvelable",
          location: "Kenya",
          area: 15,
          credits: 280,
          description:
            "Installation de panneaux solaires dans des communautés rurales pour remplacer l'utilisation de générateurs diesel et réduire les émissions.",
          imageUrl: "/placeholder.svg?height=300&width=400",
        },
      ]

      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "reforestation":
        return <TreePine className="h-5 w-5" />
      case "conservation":
        return <Leaf className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Explorer les projets</h1>
            <p className="text-gray-600 mt-2">
              Découvrez les projets climatiques certifiés et leur impact sur l'environnement
            </p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grille</TabsTrigger>
              <TabsTrigger value="map">Carte</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? "s" : ""} trouvé
              {filteredProjects.length !== 1 ? "s" : ""}
            </div>
          </div>

          <TabsContent value="grid" className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <p>Chargement des projets...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-forest-700">{project.credits} crédits</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <div className="bg-forest-100 p-1.5 rounded-full">{getTypeIcon(project.type)}</div>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                        {project.location} • {project.area} ha
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/explorer/projects/${project.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Voir les détails
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">Aucun projet ne correspond à votre recherche.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6 h-96 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Carte interactive</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Visualisez la répartition géographique des projets certifiés sur la carte. Cette fonctionnalité sera
                  bientôt disponible.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Impact environnemental</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-forest-100 p-2 rounded-full mr-3">
                  <Leaf className="h-5 w-5 text-forest-700" />
                </div>
                <h3 className="font-medium">Crédits carbone générés</h3>
              </div>
              <p className="text-2xl font-bold text-forest-700">
                {projects.reduce((sum, project) => sum + project.credits, 0)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Tonnes de CO₂ compensées</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-forest-100 p-2 rounded-full mr-3">
                  <TreePine className="h-5 w-5 text-forest-700" />
                </div>
                <h3 className="font-medium">Surface totale</h3>
              </div>
              <p className="text-2xl font-bold text-forest-700">
                {projects.reduce((sum, project) => sum + project.area, 0)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Hectares protégés ou restaurés</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-forest-100 p-2 rounded-full mr-3">
                  <Globe className="h-5 w-5 text-forest-700" />
                </div>
                <h3 className="font-medium">Projets certifiés</h3>
              </div>
              <p className="text-2xl font-bold text-forest-700">{projects.length}</p>
              <p className="text-sm text-gray-500 mt-1">Initiatives vérifiées</p>
            </div>
          </div>
        </section>
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
