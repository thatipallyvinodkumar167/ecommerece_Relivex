export const MOCK_PRODUCTS = [
    {
        id: "PROD-BELT-01",
        name: "Advanced Infrared Pain Relief Belt",
        category: "Backbone Pain",
        shortDescription: "Medical-grade infrared heat therapy for backbone support.",
        price: 2499,
        originalPrice: 4999,
        discount: "50% OFF",
        rating: 4.8,
        reviews: 1284,
        stock: 15,
        deliveryTime: "15-20 Mins",
        image: "https://img.freepik.com/free-photo/medical-belt-isolated-white-background_181624-27361.jpg",
        tag: "Bestseller"
    },
    {
        id: "PROD-NECK-02",
        name: "Cervical Neck Traction Device",
        category: "Neck Pain",
        shortDescription: "Inflatable neck support for instant tension relief.",
        price: 1899,
        originalPrice: 3500,
        discount: "45% OFF",
        rating: 4.7,
        reviews: 856,
        stock: 22,
        deliveryTime: "10-15 Mins",
        image: "https://img.freepik.com/free-photo/neck-massager-gadget_181624-44552.jpg",
        tag: "Limited Stock"
    },
    {
        id: "PROD-KNEE-03",
        name: "Compression Knee Massager",
        category: "Joint Pain",
        shortDescription: "Vibrating heat therapy for joint and knee recovery.",
        price: 3299,
        originalPrice: 5999,
        discount: "45% OFF",
        rating: 4.9,
        reviews: 2101,
        stock: 8,
        deliveryTime: "20-25 Mins",
        image: "https://img.freepik.com/free-photo/orthopedic-lumbar-corset-belt-isolated-white-background_181624-51034.jpg",
        tag: "Premium"
    },
    {
        id: "PROD-LEG-04",
        name: "Electric Calve & Foot Massager",
        category: "Leg Pain",
        shortDescription: "Deep tissue air compression for leg fatigue.",
        price: 4599,
        originalPrice: 8999,
        discount: "48% OFF",
        rating: 4.6,
        reviews: 642,
        stock: 12,
        deliveryTime: "30-40 Mins",
        image: "https://img.freepik.com/free-photo/medical-gadget-pain-relief_181624-44552.jpg",
        tag: "New Arrival"
    }
];

export const MOCK_ORDERS = [
    {
        id: "ORD-98231",
        date: "2024-03-05T10:30:00Z",
        status: "Delivered",
        items: [{ ...MOCK_PRODUCTS[0], quantity: 1 }],
        total: 2504,
        paymentMethod: "COD"
    }
];

export const NOTIFICATIONS = [
    { id: 1, title: "Order Shipped!", message: "Your order #ORD-98231 is on the way.", type: "order", time: "10 mins ago" },
    { id: 2, title: "Low Stock Alert!", message: "Only 5 units left of your favorite belt.", type: "stock", time: "1 hour ago" }
];
