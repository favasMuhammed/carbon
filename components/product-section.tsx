import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

export function ProductSection() {
  return (
    <section id="blog" className="md:py-20 py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What we create from Plastic waste?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Carbon Ads</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  At Carbon and Whale, we&apos;re committed to transforming our environment.
                </p>
                <Button variant="outline" className="w-full">
                  Know more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

