export const color = [
    "white",
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "gray",
    "brown",
    "Beige",
    "Pink",
];

export const filters = [
    {
        id: "color",
        name: "Color",
        option: [
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
            { value: "green", label: "Green" },
            { value: "yellow", label: "Yellow" },
            { value: "purple", label: "Purple" },
            // { value: "orange", label: "Orange" },
            { value: "grey", label: "Grey" },
            { value: "brown", label: "Brown" },
            { value: "beige", label: "Beige" },
            { value: "pink", label: "Pink" },
        ],
    },
    {
        id: "size",
        name: "Size",
        option: [
            { value: "XS", label: "XS" },
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
            { value: "XL", label: "XL" },
            { value: "semistitched", label: "Semi-Stitched" },
            { value: "unstitched", label: "Unstitched"},

        ],
    },
];

export const singleFilter = [
    {
        "id": "price",
        "name": "Price",
        "slider": {
            "min": 159,
            "max": 10000,
            "step": 1,
            "marks": [
                { "value": 159, "label": "₹159" },
                { "value": 399, "label": "₹399" },
                { "value": 999, "label": "₹999" },
                { "value": 1999, "label": "₹1999" },
                { "value": 4999, "label": "₹4999" },
                { "value": 8999, "label": "₹8999" },
                { "value": 10000, "label": "₹10,000+" }
            ]
        },
    },
    
    {
        id: "discount",
        name: "Discount",
        option: [
            {
                "value": "0-10",
                "label": "0% - 10%"
            },
            {
                "value": "10-20",
                "label": "10% - 20%"
            },
            {
                "value": "20-30",
                "label": "20% - 30%"
            },
            {
                "value": "30-50",
                "label": "30% - 50%"
            },
            {
                "value": "50-70",
                "label": "50% - 70%"
            },
            {
                "value": "70-100",
                "label": "70% - 100%"
            }
        ],
    },
    

]
