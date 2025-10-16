import Image from "next/image"
import Link from "next/link"

export default function ProductCategories() {
  const categories = [
    {
      id: "public-benches",
      name: "Public Benches",
      image: "/images/client-fav-4.png",
      href: "/carbon-design/categories/public-benches",
    },
    {
      id: "dining-collections",
      name: "Dining Collections",
      image: "/images/category2.png",
      href: "/carbon-design/categories/dining-collections",
    },
    {
      id: "kiosk-bus-shelter-dustbin",
      name: "Kiosk, Bus shelter & Dustbin",
      image: "/images/category3.png",
      href: "/carbon-design/categories/kiosk-bus-shelter-dustbin",
    },
  ]

  return (
    <section className="max-w-8xl mx-auto py-12">
      <h2 className="md:text-4xl text-3xl mb-4">Product Categories</h2>
      <p className="mb-10 text-gray-800">
        Achieve lasting improvements in your public spaces with our robust product categories. Manufactured in India
        with ultra-durable PP lumber and guaranteed for 5 years, they offer unmatched reliability and complete peace of
        mind.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="relative group">
            <div className="relative h-80 w-full rounded-lg shadow-xl overflow-hidden">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-fill scale-125" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={category.href} className=" text-white px-4 py-2 rounded">View</Link>
              </div>
            </div>
            <h3 className="mt-5 text-md font-medium">{category.name}</h3>
            <div className="mt-5">
              <Link
                href={category.href}
                className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-8 py-2 rounded-lg transition-colors hover:opacity-90"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
