const products = [{
        id: 123,
        title: "Iphone 13 Pro Max",
        img: "https://picsum.photos/id/5/300/200",
        price: 1500,
        model: "Apple",
        addedDate: ("2021-2-12 12:59"),
        benefits: ["8gb", "128gb", "Waterproof", "small frame"]
    },
    {
        id: 124,
        title: "Samgung Note 20 Ultra",
        img: "https://picsum.photos/id5/300/200",
        price: 1200,
        model: "Samsung",
        addedDate: new Date("2021-10-12 12:13").toISOString(),
        benefits: ["16gb", "1tb", "waterproof"]
    },
    {
        id: 125,
        title: "Redmi Note 10 Pro",
        img: "https://picsum.photos/id5/300/200",
        price: 1000,
        model: "Xiaomi",
        addedDate: new Date("2020-10-12 12:13").toISOString(),
        benefits: ["8gb", "256gb", "no waterproof"]
    },
    {
        id: 126,
        title: "Huawei P20",
        img: "https://picsum.photos/id5/300/200",
        price: 1300,
        model: "Huawei",
        addedDate: new Date("2022-10-12 12:13").toISOString(),
        benefits: ["12gb", "512gb", "no waterproof"]
    }
]

const manufacturers = [{
        id: 1,
        name: "Xiaomi"
    },
    {
        id: 2,
        name: "Apple"
    },
    {
        id: 3,
        name: "Samsung"
    }
];