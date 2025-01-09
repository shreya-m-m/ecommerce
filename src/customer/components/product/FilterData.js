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
    // {
    //     id: "size",
    //     name: "Size",
    //     option: [
    //         { value: "xs", label: "XS" },
    //         { value: "s", label: "S" },
    //         { value: "m", label: "M" },
    //         { value: "l", label: "L" },
    //         { value: "xL", label: "XL" },
    //         { value: "semistitched", label: "Semi-Stitched" },
    //         { value: "unstitched", label: "Unstitched"},

    //     ],
    // },
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
    
    // {
    //     id: "minDiscount",
    //     name: "Discount",
    //     option: [
    //         { value: "0-10", label: "0% - 10%" },
    //         { value: "11-20", label: "11% - 20%" },
    //         { value: "21-30", label: "21% - 30%" },
    //         { value: "31-50", label: "31% - 50%" },
    //         { value: "51-70", label: "51% - 70%" },
    //         { value: "71-100", label: "71% - 100%" },
    //     ],
    // }
    
    

]
