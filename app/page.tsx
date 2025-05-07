import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Shield, Globe, BarChart3, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-forest-700 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            <h1 className="text-2xl font-bold">GreenProof</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-white border-white bg-forest-600 hover:bg-forest-600">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-forest-700 hover:bg-gray-100">Inscription</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-forest-700 to-forest-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Certifiez vos actions climatiques</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Enregistrez vos projets, soumettez des preuves et générez des crédits carbone en toute transparence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-forest-700 hover:bg-gray-100">
                  Démarrer un projet
                </Button>
              </Link>
              <Link href="/explorer">
                <Button size="lg" variant="outline" className="text-white border-white bg-forest-600 hover:bg-forest-600">
                  Explorer les projets
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-forest-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-forest-700" />
                  </div>
                  <CardTitle>1. Enregistrez votre projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Créez votre projet climatique en spécifiant sa localisation, son type et sa superficie.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="bg-forest-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-forest-700" />
                  </div>
                  <CardTitle>2. Soumettez des preuves</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Téléversez des images, documents et vidéos pour prouver l'avancement de votre projet.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="bg-forest-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-forest-700" />
                  </div>
                  <CardTitle>3. Obtenez des crédits carbone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Après vérification, générez automatiquement des crédits carbone via la blockchain.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Avantages de GreenProof</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-forest-700" />
                    <CardTitle>Transparence totale</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Toutes les preuves et certifications sont publiquement vérifiables, garantissant une transparence
                    complète du processus.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-forest-700" />
                    <CardTitle>Certification sécurisée</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Utilisation de la blockchain pour garantir l'intégrité et l'immuabilité des données et
                    certifications.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-forest-700" />
                    <CardTitle>Communauté locale</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Conçu pour les communautés locales et les porteurs de projets de toutes tailles, pas seulement les
                    grandes entreprises.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-forest-700" />
                    <CardTitle>Valorisation des actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Transformez vos actions climatiques en crédits carbone valorisables et contribuez à la lutte contre
                    le changement climatique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-forest-600 text-white py-6">
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
                {/* <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    À propos
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-300">
                info@greenproof.com
                <br />
                +225 07 79 73 34 65
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4 text-center text-white-300">
            <p>&copy; {new Date().getFullYear()} GreenProof. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
