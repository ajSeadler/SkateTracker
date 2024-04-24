const initialData = {
  
  products: [
    {
      name: 'Gibson Les Paul Standard 60s',
      brand: 'Gibson',
      description: 'An iconic electric guitar known for its warm tone and sustain.',
      price: 2299.99,
      stock_quantity: 5,
      image_url: 'https://images.ctfassets.net/m8onsx4mm13s/5TnbfQFGO7YuWFnFyvuMFd/2cf389894ef5f3ddf41bd084d8ba981d/__static.gibson.com_product-images_USA_USA1R6524_Bourbon_Burst_LPS619B8NH1_1.jpg?w=1200&h=1200'
    },
    {
      name: 'Fender Stratocaster',
      brand: 'Fender',
      description: 'One of the most popular electric guitars in the world, known for its versatility.',
      price: 1499.99,
      stock_quantity: 7,
      image_url: 'https://www.fmicassets.com/Damroot/GuitarVertDesktopJpg/10003/0110250840_fen_ins_frt_1_rr.jpg'
    },
    {
      name: 'PRS SE Custom 24',
      brand: 'PRS',
      description: 'A high-quality electric guitar with a wide range of tones.',
      price: 1099.99,
      stock_quantity: 3,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L80932000004000-00-600x600.jpg'
    },
    {
      name: 'Martin D-28',
      brand: 'Martin',
      description: 'A legendary acoustic guitar known for its rich tone and projection.',
      price: 2699.99,
      stock_quantity: 6,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/K40776000001000-00-600x600.jpg'
    },
    {
      name: 'Taylor 814ce',
      brand: 'Taylor',
      description: 'A premium acoustic-electric guitar with exceptional playability and sound.',
      price: 3499.99,
      stock_quantity: 4,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L78743000001000-00-600x600.jpg'
    },
    {
      name: 'Ibanez RG550',
      brand: 'Ibanez',
      description: 'A classic shredder guitar known for its fast playability and powerful tone.',
      price: 999.99,
      stock_quantity: 8,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/K59743000003000-00-600x600.jpg'
    },
    {
      name: 'Epiphone Les Paul Standard',
      brand: 'Epiphone',
      description: 'A budget-friendly version of the iconic Les Paul guitar with great tone and playability.',
      price: 599.99,
      stock_quantity: 10,
      image_url: 'https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-df96d7c7f1da6cd3__hmac-b207fad823e69c7e206a1e74f57866d5c3ad726e/images/guitars/EILS6ITNH/23111525976/23111525976-body-large.jpg.auto.webp'
    },
    {
      name: 'Gretsch G5420T Electromatic',
      brand: 'Gretsch',
      description: 'A semi-hollowbody electric guitar with classic Gretsch sound and style.',
      price: 799.99,
      stock_quantity: 9,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L88823000004000-00-600x600.jpg'
    },
    {
      name: 'ESP LTD EC-1000',
      brand: 'ESP',
      description: 'A versatile electric guitar suitable for various styles, from metal to blues.',
      price: 999.99,
      stock_quantity: 11,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/516629000011000-00-600x600.jpg'
    },
    {
      name: 'Jackson Soloist SL2',
      brand: 'Jackson',
      description: 'A high-performance electric guitar designed for shredding and lead playing.',
      price: 2399.99,
      stock_quantity: 6,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/M07589000003000-00-600x600.jpg'
    },
    {
      name: 'Gibson SG Standard - TV Yellow',
      brand: 'Gibson',
      description: 'A classic solid-body electric guitar known for its biting tone and playability.',
      price: 1999.99,
      stock_quantity: 8,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L54585000005000-00-600x600.jpg'
    },
    {
      name: 'PRS SE Custom 22 - Semi Hollow',
      brand: 'PRS',
      description: 'A versatile electric guitar with a comfortable neck and great build quality.',
      price: 879.99,
      stock_quantity: 5,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/K58572000003000-00-600x600.jpg'
    },
    {
      name: 'Schecter Hellraiser C-1',
      brand: 'Schecter',
      description: 'A metal-oriented electric guitar with active pickups and fast neck.',
      price: 899.99,
      stock_quantity: 7,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/J05082000001000-00-600x600.jpg'
    },
    {
      name: 'Taylor 214ce',
      brand: 'Taylor',
      description: 'A mid-range acoustic-electric guitar with solid construction and balanced tone.',
      price: 1099.99,
      stock_quantity: 6,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L69529000001000-00-600x600.jpg'
    },
    {
      name: 'Gibson ES-335',
      brand: 'Gibson',
      description: 'A versatile semi-hollowbody electric guitar favored by blues and jazz players.',
      price: 2799.99,
      stock_quantity: 4,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L73697000001000-00-600x600.jpg'
    },
    {
      name: 'Fender Telecaster',
      brand: 'Fender',
      description: 'A classic solid-body electric guitar known for its twangy tone and simplicity.',
      price: 1499.99,
      stock_quantity: 8,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L78119000004000-00-600x600.jpg'
    },
    {
      name: 'Martin HD-28',
      brand: 'Martin',
      description: 'A premium acoustic guitar with a full, rich sound and excellent projection.',
      price: 3399.99,
      stock_quantity: 3,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L40111000001000-00-600x600.jpg'
    },
    {
      name: 'Gibson Flying V',
      brand: 'Gibson',
      description: 'An iconic electric guitar with a unique body shape and powerful tone.',
      price: 2399.99,
      stock_quantity: 6,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/M02133000001000-00-600x600.jpg'
    },
    {
      name: ' Epiphone Casino (USA)',
      brand: 'Epiphone',
      description: 'A hollowbody electric guitar known for its warm, resonant tone and lightweight body.',
      price: 2999.99,
      stock_quantity: 1,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/L76765000001000-00-600x600.jpg'
    },
    {
      name: 'Jackson King V KVXMG',
      brand: 'Jackson',
      description: 'A metal-oriented electric guitar with aggressive styling and powerful pickups.',
      price: 999.99,
      stock_quantity: 5,
      image_url: 'https://media.guitarcenter.com/is/image/MMGS7/J16721000002000-00-600x600.jpg'
    }
  ],
  categories: [
    { name: 'Electric Guitars' },
    { name: 'Acoustic Guitars' },
    { name: 'Amplifiers' },
    { name: 'Pedals and Effects' },
  ],
  orders: [
    { user_id: 1, total_price: 999.99, status: 'shipped' },
    { user_id: 2, total_price: 799.99, status: 'pending' }
  ],
  order_items: [ // Changed from "orderItems" to "order_items"
    { order_id: 1, product_id: 1, quantity: 1, item_price: 999.99 },
    { order_id: 2, product_id: 2, quantity: 1, item_price: 799.99 }
  ],
  reviews: [
    { product_id: 1, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 2, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 3, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 4, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 5, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 6, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 7, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 8, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 9, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 10, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 11, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 12, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 13, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 14, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 15, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 16, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 17, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 18, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
    { product_id: 19, user_id: 1, rating: 5, comment: 'Great guitar! Love it.' },
    { product_id: 20, user_id: 2, rating: 4, comment: 'Nice acoustic guitar, good sound quality.' },
  ],
  wishlists: [
    { user_id: 1 },
    { user_id: 2 }
  ],
  wishlist_items: [ // Changed from "wishlistItems" to "wishlist_items"
    { wishlist_id: 1, product_id: 2 },
    { wishlist_id: 2, product_id: 1 }
  ]
};

module.exports = initialData;
