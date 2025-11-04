import React, { useState } from 'react';
import { router } from '@inertiajs/react';

// Sample data for products (manteniendo tus datos originales)
const products = [
  {
    id: 1,
    name: 'Chanel No. 5',
    description: 'A timeless, iconic floral-aldehyde fragrance.',
    price: 145.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Chanel+No.+5',
    brand: 'Chanel',
    size: '100ml',
    notes: ['Jazmín', 'Rosa', 'Vainilla', 'Aldehído'],
    duration: '8-10 horas',
    intensity: 'Alta',
    details: 'Chanel No. 5 es un perfume legendario que ha cautivado a generaciones. Su composición única combina notas florales con toques aldehydicos, creando una fragancia sofisticada y atemporal que se ha convertido en un ícono de la elegancia francesa.'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    description: 'A fresh and noble composition with a raw, woody trail.',
    price: 104.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Dior+Sauvage',
    brand: 'Dior',
    size: '100ml',
    notes: ['Bergamota', 'Pimienta', 'Ámbar', 'Cedro'],
    duration: '6-8 horas',
    intensity: 'Media-Alta',
    details: 'Dior Sauvage es una fragancia masculina moderna y versátil. Inspirada en los grandes espacios abiertos, combina la frescura cítrica con la profundidad amaderada, creando un aroma magnético y poderoso perfecto para el hombre contemporáneo.'
  },
  {
    id: 3,
    name: 'Creed Aventus',
    description: 'A sophisticated fruity and rich scent for the modern gentleman.',
    price: 435.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Creed+Aventus',
    brand: 'Creed',
    size: '100ml',
    notes: ['Piña', 'Manzana', 'Pachulí', 'Vainilla', 'Almizcle'],
    duration: '10-12 horas',
    intensity: 'Muy Alta',
    details: 'Creed Aventus es una fragancia de lujo que celebra la fuerza, el poder y el éxito. Con su mezcla única de frutas frescas y maderas ahumadas, este perfume se ha convertido en uno de los más codiciados del mundo, perfecto para el líder moderno.'
  },
  {
    id: 4,
    name: 'Jo Malone London',
    description: 'Elegant and simple, with a surprising twist. Peony & Blush Suede.',
    price: 155.00,
    category: 'perfume',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Jo+Malone',
    brand: 'Jo Malone',
    size: '100ml',
    notes: ['Peonía', 'Manzana Roja', 'Gamuza'],
    duration: '4-6 horas',
    intensity: 'Media',
    details: 'Una fragancia romántica y lujosa que captura la esencia de la peonía en plena floración. Las notas de manzana roja añaden una dulzura sutil, mientras que la gamuza proporciona una base aterciopelada y sofisticada.'
  },
  {
    id: 5,
    name: 'Classic Beard Trim',
    description: 'Professional beard trimming and shaping service.',
    price: 35.00,
    category: 'barbershop',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Beard+Trim',
    brand: 'LuxeStore',
    duration: '30 minutos',
    details: 'Servicio profesional de arreglo y perfilado de barba. Incluye recorte, perfilado de líneas, hidratación con aceites premium y styling. Nuestros barberos expertos te ayudarán a mantener tu barba en perfecto estado.'
  },
  {
    id: 6,
    name: 'Premium Haircut',
    description: 'Expert haircut with styling consultation.',
    price: 45.00,
    category: 'barbershop',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Haircut',
    brand: 'LuxeStore',
    duration: '45 minutos',
    details: 'Corte de cabello premium con consulta de estilo personalizada. Incluye lavado, corte, styling y recomendaciones de productos para mantener tu look. Nuestros estilistas están al día con las últimas tendencias.'
  },
  {
    id: 7,
    name: 'Beard Oil Premium',
    description: 'Nourishing beard oil with natural ingredients.',
    price: 28.00,
    category: 'grooming',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Beard+Oil',
    brand: 'LuxeStore',
    size: '50ml',
    notes: ['Aceite de Argán', 'Jojoba', 'Vitamina E'],
    details: 'Aceite nutritivo para barba elaborado con ingredientes 100% naturales. Hidrata, suaviza y da brillo a tu barba mientras promueve un crecimiento saludable. Aroma masculino y discreto.'
  },
  {
    id: 8,
    name: 'Hair Styling Pomade',
    description: 'Professional-grade styling pomade for perfect hold.',
    price: 22.00,
    category: 'grooming',
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Pomade',
    brand: 'LuxeStore',
    size: '100g',
    intensity: 'Fijación Fuerte',
    details: 'Pomada de styling profesional con fijación fuerte y acabado brillante. Fácil de aplicar y lavar, permite reestilizar durante el día. Ideal para looks clásicos y modernos. Sin parabenos.'
  }
];

export default function ProductsIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleProductClick = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      router.visit(`/product/${productId}`, {
        method: 'get'
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">LuxeStore</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Inicio</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Perfumes</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Barbería</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Cuidado Personal</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Contacto</a>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <a href="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Ingresar</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tu Estilo, Tu Esencia
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre fragancias exclusivas y servicios de barbería premium que definen tu personalidad
          </p>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar productos o servicios..."
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 absolute right-6 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory('perfume')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'perfume'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => setSelectedCategory('barbershop')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'barbershop'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Barbería
            </button>
            <button
              onClick={() => setSelectedCategory('grooming')}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                selectedCategory === 'grooming'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cuidado Personal
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {product.category === 'perfume' ? 'Perfume' : product.category === 'barbershop' ? 'Servicio' : 'Producto'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm hover:shadow-md"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </main>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Productos y servicios de la más alta calidad</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Envíos seguros y oportunos a tu puerta</p>
            </div>
            <div>
              <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Satisfacción Garantizada</h3>
              <p className="text-gray-600">Tu satisfacción es nuestra prioridad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
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
              <p className="text-sm mb-2">Recibe las últimas noticias y ofertas exclusivas.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
                  Unirme
                </button>
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
