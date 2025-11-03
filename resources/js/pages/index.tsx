
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
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h1 className="text-2xl font-bold">LuxeStore</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition">Inicio</a>
              <a href="#" className="hover:text-blue-400 transition">Productos</a>
              <a href="#" className="hover:text-blue-400 transition">Servicios</a>
              <a href="#" className="hover:text-blue-400 transition">Contacto</a>
            </div>
            <div className="flex space-x-3">
              <a href="/login" className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">Ingresar</a>
              <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">Registrarse</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-gray-400">
            Tu Estilo, Tu Esencia
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre fragancias exclusivas y servicios de barbería premium que definen tu personalidad
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar productos o servicios..."
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-2xl"
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
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory('perfume')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'perfume'
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => setSelectedCategory('barbershop')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'barbershop'
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Barbería
            </button>
            <button
              onClick={() => setSelectedCategory('grooming')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'grooming'
                  ? 'bg-gray-800 text-white shadow-lg'
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
                  <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {product.category === 'perfume' ? 'Perfume' : product.category === 'barbershop' ? 'Servicio' : 'Producto'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                  <button className="px-5 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-full hover:from-gray-700 hover:to-gray-900 transition duration-300 shadow-md hover:shadow-lg">
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
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
              <p className="text-gray-300">Productos y servicios de la más alta calidad</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-300">Envíos seguros y oportunos a tu puerta</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <li><a href="#" className="hover:text-blue-400 transition">Perfumes</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Barbería</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Cuidado Personal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Envíos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Devoluciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Suscríbete</h4>
              <p className="text-sm mb-4">Recibe las últimas noticias y ofertas exclusivas.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
                  Unirme
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="ri-facebook-fill text-2xl"></i>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="ri-twitter-fill text-2xl"></i>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="ri-instagram-fill text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} LuxeStore. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-blue-400 transition">Política de Privacidad</a>
              <a href="#" className="hover:text-blue-400 transition">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

