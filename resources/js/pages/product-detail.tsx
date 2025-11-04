import React from 'react';
import { router } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  brand?: string;
  size?: string;
  notes?: string[];
  duration?: string;
  intensity?: string;
  details?: string;
}

export default function ProductDetail({ product, whatsappNumber = '573148395957' }: { product: Product; whatsappNumber?: string }) {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hola! Estoy interesado en el producto:\n\n*${product.name}*\nPrecio: $${product.price.toFixed(2)}\n\nMe gustaría obtener más información sobre la entrega contraentrega.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBack = () => {
    router.visit('/');
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Header */}
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h1 className="text-2xl font-bold">LuxeStore</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <span className="bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-full uppercase shadow-lg">
                  {product.category === 'perfume' ? 'Perfume' : product.category === 'barbershop' ? 'Servicio' : 'Producto'}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                {product.brand && (
                  <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
                    {product.brand}
                  </p>
                )}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-3 text-lg text-gray-600">USD</span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.details && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Descripción Detallada</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.details}
                    </p>
                  </div>
                )}

                {/* Product Specifications */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.size && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tamaño</p>
                      <p className="font-semibold text-gray-900">{product.size}</p>
                    </div>
                  )}
                  {product.intensity && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Intensidad</p>
                      <p className="font-semibold text-gray-900">{product.intensity}</p>
                    </div>
                  )}
                  {product.duration && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Duración</p>
                      <p className="font-semibold text-gray-900">{product.duration}</p>
                    </div>
                  )}
                </div>

                {/* Fragrance Notes */}
                {product.notes && product.notes.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Notas Aromáticas</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg font-semibold"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Contactar por WhatsApp</span>
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">Pago Contraentrega</p>
                      <p className="text-sm text-blue-800">
                        Pagas cuando recibes tu producto. Envíos seguros y confiables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Producto Original</h3>
            <p className="text-gray-600 text-sm">100% auténtico y garantizado</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Envío Seguro</h3>
            <p className="text-gray-600 text-sm">Empaque premium y discreto</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Atención 24/7</h3>
            <p className="text-gray-600 text-sm">Soporte por WhatsApp siempre disponible</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-12 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} LuxeStore. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
