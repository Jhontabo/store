
import React from 'react';

// Sample data for perfumes
const perfumes = [
  {
    id: 1,
    name: 'Chanel No. 5',
    description: 'A timeless, iconic floral-aldehyde fragrance.',
    price: 145.00,
    quantity: 25,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Chanel+No.+5'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    description: 'A fresh and noble composition with a raw, woody trail.',
    price: 104.00,
    quantity: 40,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Dior+Sauvage'
  },
  {
    id: 3,
    name: 'Creed Aventus',
    description: 'A sophisticated fruity and rich scent for the modern gentleman.',
    price: 435.00,
    quantity: 15,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Creed+Aventus'
  },
  {
    id: 4,
    name: 'Jo Malone London',
    description: 'Elegant and simple, with a surprising twist. Peony & Blush Suede.',
    price: 155.00,
    quantity: 30,
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Jo+Malone'
  }
];

export default function ProductsIndex() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Perfume Store</h1>
          <p className="text-gray-600">Find your signature scent</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src={perfume.imageUrl} alt={perfume.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{perfume.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{perfume.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">${perfume.price.toFixed(2)}</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${perfume.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {perfume.quantity > 0 ? `${perfume.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
          <p>&copy; 2025 Perfume Store. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
