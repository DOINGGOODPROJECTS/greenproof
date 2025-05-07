"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { MapPin, Upload } from "lucide-react"

export default function NewProject() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    area: "",
    location: "",
    latitude: "",
    longitude: "",
    images: [] as File[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }))
    }
  }

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulation de création de projet
    setTimeout(() => {
      // Dans un vrai cas, on enverrait les données au serveur
      console.log("Projet créé:", formData)
      router.push("/dashboard/projects")
      setLoading(false)
    }, 1500)
  }

  const nextTab = () => {
    if (activeTab === "details") setActiveTab("location")
    else if (activeTab === "location") setActiveTab("images")
  }

  const prevTab = () => {
    if (activeTab === "images") setActiveTab("location")
    else if (activeTab === "location") setActiveTab("details")
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Créer un nouveau projet</h1>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Informations du projet</CardTitle>
            <CardDescription>
              Renseignez les détails de votre projet climatique pour commencer le processus de certification.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="location">Localisation</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ex: Reforestation Amazonie"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description du projet *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Décrivez votre projet, ses objectifs et son impact climatique..."
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type de projet *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reforestation">Reforestation</SelectItem>
                          <SelectItem value="conservation">Conservation</SelectItem>
                          <SelectItem value="agroforesterie">Agroforesterie</SelectItem>
                          <SelectItem value="mangrove">Protection de mangrove</SelectItem>
                          <SelectItem value="renewable">Énergie renouvelable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Superficie (hectares) *</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        placeholder="Ex: 120"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation (pays, région) *</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Ex: Brésil, Amazonie"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        name="latitude"
                        placeholder="Ex: 3.4653"
                        value={formData.latitude}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        name="longitude"
                        placeholder="Ex: -62.2159"
                        value={formData.longitude}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mt-4 flex items-center justify-center h-64">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Carte interactive à venir</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Vous pourrez sélectionner la position exacte de votre projet
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Images initiales du projet *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Glissez-déposez des images ou</p>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Label
                        htmlFor="images"
                        className="bg-forest-700 hover:bg-forest-800 text-white py-2 px-4 rounded-md cursor-pointer"
                      >
                        Parcourir
                      </Label>
                      <p className="text-xs text-gray-400 mt-2">PNG, JPG ou JPEG (max. 5MB)</p>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Images sélectionnées ({formData.images.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                            <p className="text-xs truncate mt-1">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              {activeTab !== "details" ? (
                <Button type="button" variant="outline" onClick={prevTab}>
                  Précédent
                </Button>
              ) : (
                <div></div>
              )}

              {activeTab !== "images" ? (
                <Button type="button" onClick={nextTab}>
                  Suivant
                </Button>
              ) : (
                <Button type="submit" className="bg-forest-700 hover:bg-forest-800 text-white" disabled={loading}>
                  {loading ? "Création en cours..." : "Créer le projet"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
