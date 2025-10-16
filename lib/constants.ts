export const PRODUCT_FEATURES = {
    warranty: {
        label: "5 year warranty",
        description: "All products come with a 5 year warranty",
    },
    madeInIndia: {
        label: "Made in India",
        description: "Proudly manufactured in India",
    },
    lowMaintenance: {
        label: "Low Maintenance",
        description: "Requires minimal maintenance",
    },
    weatherResistance: {
        label: "Weather Resistance",
        description: "Resistant to various weather conditions",
    },
}

// Product dimensions
export const PRODUCT_DIMENSIONS = {
    dining: {
        table: "120 cm x 60 cm x 76 cm",
        bench: "120 cm x 60 cm x 76 cm",
    },
    kiosk: {
        dimensions: "254 cm x 254 cm x 254 cm x 254 cm",
    },
    "bus-shelter": {
        dimensions: "450 cm x 127 cm x 246 cm",
    },
    dustbin: {
        dimensions: "45 cm x 45 cm x 90 cm",
    },
    benches: {
        dimensions: "195 cm x 45 cm x 45 cm",
    },
    tables: {
        dimensions: "120 cm x 80 cm x 75 cm",
    },
    chairs: {
        dimensions: "40 cm x 45 cm x 45 cm",
    },
}

// Product descriptions
export const PRODUCT_DESCRIPTIONS = {
    dining:
        "A sleek yet sturdy seating solution, this dining set's geometric frame provides a contemporary touch while ensuring comfort and stability for communal dining.",
    kiosk:
        "A versatile and durable kiosk solution, designed with functionality in mind. Perfect for information centers, ticket booths, and retail applications in public spaces.",
    "bus-shelter":
        "A robust and weather-resistant shelter designed to provide comfort and protection for commuters. Built to withstand harsh conditions while maintaining its aesthetic appeal.",
    dustbin:
        "An eco-friendly waste management solution that combines durability with design. Perfect for public spaces, parks, and commercial areas.",
    benches:
        "A comfortable and stylish seating option for parks, gardens, and public spaces. Designed for durability and minimal maintenance.",
    tables: "A sturdy and practical table solution for outdoor spaces. Perfect for picnics, parks, and communal areas.",
    chairs:
        "Ergonomically designed chairs that provide comfort and support. Ideal for outdoor dining and relaxation areas.",
}

// Plastic waste recycled
export const PLASTIC_WASTE_RECYCLED = {
    dining: "1000 Kg",
    kiosk: "550 Kg",
    "bus-shelter": "245 Kg",
    dustbin: "56 Kg",
    benches: "85 Kg",
    tables: "95 Kg",
    chairs: "42 Kg",
}

// Category page mapping
export const CATEGORY_URLS = {
    benches: "/carbon-design/categories/public-benches",
    kiosk: "/carbon-design/categories/kiosk-bus-shelter-dustbin",
    "bus-shelter": "/carbon-design/categories/kiosk-bus-shelter-dustbin",
    dustbin: "/carbon-design/categories/kiosk-bus-shelter-dustbin",
    dining: "/carbon-design/categories/dining-collections",
    tables: "/carbon-design/categories/dining-collections",
    chairs: "/carbon-design/categories/dining-collections",
    default: "/carbon-design",
}

// WhatsApp contact number
export const WHATSAPP_NUMBER = "+919389269631"

// Image carousel interval in milliseconds
export const CAROUSEL_INTERVAL = 5000

export const dining_products = [
    {
        id: 1,
        name: "Terris Dining set",
        price: "Rs: 32,600",
        image: "/placeholder.svg?height=300&width=300",
        type: "dining",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/client-fav-1.png",
            orange: "/images/terris-orange.png",
            yellow: "/images/terris-parrot-green.png",
            blue: "/images/terris-blue.png",
            black: "/images/terris-black.png",
        },
    },
    {
        id: 2,
        name: "Aero Dining set",
        price: "Rs: 27,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "dining",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/area-dinning-green.png",
            orange: "/images/area-dinning-orange.png",
            yellow: "/images/area-dinning-parrot-green.png",
            blue: "/images/area-dinning-blue.png",
            black: "/images/area-dinning-black.png",
        },
    },
    {
        id: 3,
        name: "Picnic Dining set",
        price: "Pricing on enquiry",
        image: "/placeholder.svg?height=300&width=300",
        type: "dining",
        colors: ["green", "orange", "black", "white"],
        colorImages: {
            green: "/images/picnic-green.png",
            orange: "/images/picnic-orange.png",
            black: "/images/picnic-black.png",
            white: "/images/picnic-white.png",
        },
    },
    {
        id: 4,
        name: "Glade Dining set",
        price: "Pricing on enquiry",
        image: "/placeholder.svg?height=300&width=300",
        type: "dining",
        colors: ["green", "orange", "black", "white"],
        colorImages: {
            green: "/images/glading-green.png",
            orange: "/images/glading-orange.png",
            black: "/images/glading-black.png",
            white: "/images/glading-white.png",
        },
    },
    {
        id: 5,
        name: "Terris Dining set 2",
        price: "Rs: 32,600",
        image: "/placeholder.svg?height=300&width=300",
        type: "dining",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/two-seater-green.png",
            orange: "/images/two-seater-orange.png",
            yellow: "/images/two-seater-parrot-green.png",
            blue: "/images/two-seater-blue.png",
            black: "/images/two-seater-black.png",
        },
    },
    {
        id: 6,
        name: "Three Seater",
        price: "Rs: 32,600",
        image: "/placeholder.svg?height=300&width=300",
        type: "benches",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/3-seater-green.png",
            orange: "/images/3-seater-orange.png",
            yellow: "/images/3-seater-parrot-green.png",
            blue: "/images/3-seater-blue.png",
            black: "/images/3-seater-black.png",
        },
    },
    {
        id: 7,
        name: "Picnic Table",
        price: "Rs: 12,000",
        image: "/placeholder.svg?height=300&width=300",
        type: "tables",
        colors: ["green", "orange", "black"],
        colorImages: {
            green: "/images/client-fav-2.png",
            orange: "/images/picnik-table-orange.png",
            black: "/images/picnik-table-black.png",
        },
    },
    {
        id: 8,
        name: "Aera Table",
        price: "Rs: 5,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "tables",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/area-table-green.png",
            orange: "/images/area-table-orange.png",
            yellow: "/images/area-table-parrot-green.png",
            blue: "/images/area-table-blue.png",
            black: "/images/area-table-black.png",
        },
    },
    {
        id: 9,
        name: "Beach Bench",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "benches",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/client-fav-4.png",
            orange: "/images/beach-bench-orange.png",
            yellow: "/images/beach-bench-parrot-green.png",
            blue: "/images/beach-bench-blue.png",
            black: "/images/beach-bench-black.png",
        },
    },
    {
        id: 10,
        name: "Beach Table",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "tables",
        colors: ["green", "orange", "black", "white"],
        colorImages: {
            green: "/images/bench-table-green.png",
            orange: "/images/bench-table-orange.png",
            black: "/images/bench-table-black.png",
            white: "/images/bench-table-white.png",
        },
    },
    {
        id: 11,
        name: "Chair",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "chairs",
        colors: ["green", "orange"],
        colorImages: {
            green: "/images/chair-green.png",
            orange: "/images/chair-orange.png",
        },
    },
    {
        id: 12,
        name: "Private Bench",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "benches",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/private-bench-green.png",
            orange: "/images/private-bench-orange.png",
            yellow: "/images/private-bench-parrot-green.png",
            blue: "/images/private-bench-blue.png",
            black: "/images/private-bench-black.png",
        },
    },
    {
        id: 13,
        name: "Two Seater Bench",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "benches",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/2-seater-bench-green.png",
            orange: "/images/2-seater-bench-orange.png",
            yellow: "/images/2-seater-bench-parrot-green.png",
            blue: "/images/2-seater-bench-blue.png",
            black: "/images/2-seater-bench-black.png",
        },
    },
    {
        id: 14,
        name: "Public Table",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "tables",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/public-bench-green.png",
            orange: "/images/public-bench-orange.png",
            yellow: "/images/public-bench-parrot-green.png",
            blue: "/images/public-bench-blue.png",
            black: "/images/public-bench-black.png",
        },
    },
    {
        id: 15,
        name: "Public table 2",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        type: "tables",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/public-table-green.png",
            orange: "/images/public-table-orange.png",
            yellow: "/images/public-table-parrot-green.png",
            blue: "/images/public-table-blue.png",
            black: "/images/public-table-black.png",
        },
    },
];

export const kiosk_bus_dustin = [
    {
        id: 16,
        name: "Kiosk 1.0",
        price: "Rs: 68,300",
        image: "/placeholder.svg?height=300&width=300",
        type: "kiosk",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/kiosk-one-green.png",
            orange: "/images/kiosk-one-orange.png",
            yellow: "/images/kiosk-one-parrot-green.png",
            blue: "/images/kiosk-one-blue.png",
            black: "/images/kiosk-one-black.png",
        },
    },
    {
        id: 17,
        name: "Kiosk 2.0",
        price: "Rs: 89,400",
        image: "/placeholder.svg?height=300&width=300",
        type: "kiosk",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/kiosk-two-green.png",
            orange: "/images/kiosk-two-orange.png",
            yellow: "/images/kiosk-two-parrot-green.png",
            blue: "/images/kiosk-two-blue.png",
            black: "/images/kiosk-two-black.png",
        },
    },
    {
        id: 18,
        name: "Kiosk 3.0",
        price: "Rs: 86,400",
        image: "/placeholder.svg?height=300&width=300",
        type: "kiosk",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/kiosk-three-green.png",
            orange: "/images/kiosk-three-orange.png",
            yellow: "/images/kiosk-three-parrot-green.png",
            blue: "/images/kiosk-three-blue.png",
            black: "/images/kiosk-three-black.png",
        },
    },
    {
        id: 19,
        name: "Dustbin",
        price: "Rs: 7,000",
        image: "/placeholder.svg?height=300&width=300",
        type: "dustbin",
        colors: ["orange", "black"],
        colorImages: {
            orange: "/images/bustbin-orange.png",
            black: "/images/bustbin-black.png",
        },
    },
    {
        id: 20,
        name: "Bus Shelter",
        price: "Rs: 1,21,000",
        image: "/placeholder.svg?height=300&width=300",
        type: "bus-shelter",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/bus-shelter-green.png",
            orange: "/images/bus-shelter-orange.png",
            yellow: "/images/bus-shelter-parrot-green.png",
            blue: "/images/bus-shelter-blue.png",
            black: "/images/bus-shelter-black.png",
        },
    },
]
export const public_benches = [
    {
        id: 21,
        name: "Beach Bench",
        price: "Rs: 10,800",
        image: "/placeholder.svg?height=300&width=300",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/client-fav-4.png",
            orange: "/images/beach-bench-orange.png",
            yellow: "/images/beach-bench-parrot-green.png",
            blue: "/images/beach-bench-blue.png",
            black: "/images/beach-bench-black.png",
        },
    },
    {
        id: 22,
        name: "Park Bench",
        price: "Rs: 6,800",
        image: "/placeholder.svg?height=300&width=300",
        colors: ["green", "orange", "yellow", "blue", "black"],
        colorImages: {
            green: "/images/park-bench-green.png",
            orange: "/images/park-bench-orange.png",
            yellow: "/images/park-bench-parrot-green.png",
            blue: "/images/park-bench-blue.png",
            black: "/images/park-bench-black.png",
        },
    },
]