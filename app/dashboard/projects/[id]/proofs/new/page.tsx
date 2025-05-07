"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function NewProof() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as File[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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

    // Simulation d'envoi de preuve
    setTimeout(() => {
      // Dans un vrai cas, on enverrait les données au serveur
      console.log("Preuve soumise:", formData)
      router.push(`/dashboard/projects/${params.id}`)
      setLoading(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dashboard/projects/${params.id}`)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Ajouter une preuve</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Nouvelle preuve</CardTitle>
            <CardDescription>
              Soumettez des preuves pour démontrer l'avancement et l'impact de votre projet.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la preuve *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Plantation de 100 arbres"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez cette étape du projet, les actions réalisées et leur impact..."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images ou documents *</Label>
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push(`/dashboard/projects/${params.id}`)}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-forest-700 hover:bg-forest-800 text-white"
                disabled={loading || formData.images.length === 0}
              >
                {loading ? "Soumission en cours..." : "Soumettre la preuve"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
