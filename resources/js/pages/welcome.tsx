
import React, { useState } from 'react';

// Sample data for products
const products = [
  {
    id: 1,
    name: 'Chanel No. 5',
    description: 'A timeless, iconic floral-aldehyde fragrance.',
    price: 145.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Chanel+No.+5'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    description: 'A fresh and noble composition with a raw, woody trail.',
    price: 104.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Dior+Sauvage'
  },
  {
    id: 3,
    name: 'Creed Aventus',
    description: 'A sophisticated fruity and rich scent for the modern gentleman.',
    price: 435.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Creed+Aventus'
  },
  {
    id: 4,
    name: 'Jo Malone London',
    description: 'Elegant and simple, with a surprising twist. Peony & Blush Suede.',
    price: 155.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Jo+Malone'
  },
  {
    id: 5,
    name: 'Classic Beard Trim',
    description: 'Professional beard trimming and shaping service.',
    price: 35.00,
    category: 'barbershop',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Beard+Trim'
  },
  {
    id: 6,
    name: 'Premium Haircut',
    description: 'Expert haircut with styling consultation.',
    price: 45.00,
    category: 'barbershop',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Haircut'
  },
  {
    id: 7,
    name: 'Beard Oil Premium',
    description: 'Nourishing beard oil with natural ingredients.',
    price: 28.00,
    category: 'grooming',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Beard+Oil'
  },
  {
    id: 8,
    name: 'Hair Styling Pomade',
    description: 'Professional-grade styling pomade for perfect hold.',
    price: 22.00,
    category: 'grooming',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Pomade'
  }
];

export default function ProductsIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h1 className="text-2xl font-bold">LuxeStore</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-purple-400 transition">Inicio</a>
              <a href="#" className="hover:text-purple-400 transition">Productos</a>
              <a href="#" className="hover:text-purple-400 transition">Servicios</a>
              <a href="#" className="hover:text-purple-400 transition">Contacto</a>
            </div>
            <div className="flex space-x-3">
              <a href="/login" className="px-4 py-2 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition duration-300">Ingresar</a>
              <a href="/register" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg">Registrarse</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Tu Estilo, Tu Esencia
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre fragancias exclusivas y servicios de barbería premium que definen tu personalidad
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar productos o servicios..."
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-6 h-6 absolute right-6 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory('perfume')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'perfume'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => setSelectedCategory('barbershop')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'barbershop'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Barbería
            </button>
            <button
              onClick={() => setSelectedCategory('grooming')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'grooming'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cuidado Personal
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4">
                  <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {product.category === 'perfume' ? 'Perfume' : product.category === 'barbershop' ? 'Servicio' : 'Producto'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                  <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-md hover:shadow-lg">
                    {product.category === 'barbershop' ? 'Reservar' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </main>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
              <p className="text-gray-300">Productos y servicios de la más alta calidad</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-300">Envíos seguros y oportunos a tu puerta</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Satisfacción Garantizada</h3>
              <p className="text-gray-300">Tu satisfacción es nuestra prioridad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">LuxeStore</h4>
              <p className="text-sm">Tu destino para fragancias exclusivas y servicios de barbería premium.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">Perfumes</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Barbería</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Cuidado Personal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Envíos</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Devoluciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-purple-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="hover:text-purple-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="hover:text-purple-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2025 LuxeStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

