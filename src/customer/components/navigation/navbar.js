export const navigation = {
    categories: [
      {
        id: 'women',
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: '/women/clothing/women_lehenga',
            imageSrc: 'https://www.ethnicplus.in/media/catalog/product/cache/1d5df636cf8c8988ea2d2c570bb7c21d/s/a/sabyasachi_red_bridal_lehenga_choli_3_.jpg',
            imageAlt: '',
          },
          {
            name: 'Trending',
            href: '/women/clothing/women_saree',
            imageSrc: 'https://www.ethnicplus.in/media/catalog/product/cache/c8dd8ab41cc505e943026004bfd0a7b6/8/0/800003-1_53982638799_o_-_copy.jpg',
            imageAlt: '',
          },
        ],
        sections: [
          {
            id: 'clothing',
            name: 'Clothing',
            items: [
              { name: 'Top & T-Shirts', id:"women_top" },
              { name: 'Dresses', id:"women_dress"},
              { name: 'Women Jeans', id: 'women_jeans' },
              { name: 'Lengha Choli', id: 'women_lehenga' },
              { name: 'Sweatshirts & Jackets', id: 'women_sweaters' },
              { name: 'Gowns', id: 'women_gouns' },
              { name: 'Sarees', id: 'women_saree' },
              { name: 'Kurtas', id: 'women_kurtas' },
            ],
          },
          {
            id: 'accessories',
            name: 'Accessories',
            items: [
              { name: 'Watches', id: 'women_watches' },
              { name: 'Bags, Belts & Wallets', id: 'women_bags' },
              { name: 'Sunglasses & Hats', id: 'women_sunglasses' },
            ],
          },
          {
            id: 'footwear',
            name: 'Footwear',
            items: [
              { name: 'Casual Shoes', id: 'women_shoes' },
              { name: 'Heels', id: 'women_heels' },
              { name: 'Flats', id: 'women_flats' },
            ],
          },
        ],
      },
      
    ],
    pages: [
      { name: 'Company',  href: '/about' },
      { name: 'Stores',  href: '/store' },
    ],
  }