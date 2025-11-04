<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('index', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/product/{id}', function ($id) {
    // Datos de productos (mismo array que en el frontend)
    $products = [
        [
            'id' => 1,
            'name' => 'Chanel No. 5',
            'description' => 'A timeless, iconic floral-aldehyde fragrance.',
            'price' => 145.00,
            'category' => 'perfume',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Chanel+No.+5',
            'brand' => 'Chanel',
            'size' => '100ml',
            'notes' => ['Jazmín', 'Rosa', 'Vainilla', 'Aldehído'],
            'duration' => '8-10 horas',
            'intensity' => 'Alta',
            'details' => 'Chanel No. 5 es un perfume legendario que ha cautivado a generaciones. Su composición única combina notas florales con toques aldehydicos, creando una fragancia sofisticada y atemporal que se ha convertido en un ícono de la elegancia francesa.'
        ],
        [
            'id' => 2,
            'name' => 'Dior Sauvage',
            'description' => 'A fresh and noble composition with a raw, woody trail.',
            'price' => 104.00,
            'category' => 'perfume',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Dior+Sauvage',
            'brand' => 'Dior',
            'size' => '100ml',
            'notes' => ['Bergamota', 'Pimienta', 'Ámbar', 'Cedro'],
            'duration' => '6-8 horas',
            'intensity' => 'Media-Alta',
            'details' => 'Dior Sauvage es una fragancia masculina moderna y versátil. Inspirada en los grandes espacios abiertos, combina la frescura cítrica con la profundidad amaderada, creando un aroma magnético y poderoso perfecto para el hombre contemporáneo.'
        ],
        [
            'id' => 3,
            'name' => 'Creed Aventus',
            'description' => 'A sophisticated fruity and rich scent for the modern gentleman.',
            'price' => 435.00,
            'category' => 'perfume',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Creed+Aventus',
            'brand' => 'Creed',
            'size' => '100ml',
            'notes' => ['Piña', 'Manzana', 'Pachulí', 'Vainilla', 'Almizcle'],
            'duration' => '10-12 horas',
            'intensity' => 'Muy Alta',
            'details' => 'Creed Aventus es una fragancia de lujo que celebra la fuerza, el poder y el éxito. Con su mezcla única de frutas frescas y maderas ahumadas, este perfume se ha convertido en uno de los más codiciados del mundo, perfecto para el líder moderno.'
        ],
        [
            'id' => 4,
            'name' => 'Jo Malone London',
            'description' => 'Elegant and simple, with a surprising twist. Peony & Blush Suede.',
            'price' => 155.00,
            'category' => 'perfume',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Jo+Malone',
            'brand' => 'Jo Malone',
            'size' => '100ml',
            'notes' => ['Peonía', 'Manzana Roja', 'Gamuza'],
            'duration' => '4-6 horas',
            'intensity' => 'Media',
            'details' => 'Una fragancia romántica y lujosa que captura la esencia de la peonía en plena floración. Las notas de manzana roja añaden una dulzura sutil, mientras que la gamuza proporciona una base aterciopelada y sofisticada.'
        ],
        [
            'id' => 5,
            'name' => 'Classic Beard Trim',
            'description' => 'Professional beard trimming and shaping service.',
            'price' => 35.00,
            'category' => 'barbershop',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Beard+Trim',
            'brand' => 'LuxeStore',
            'duration' => '30 minutos',
            'details' => 'Servicio profesional de arreglo y perfilado de barba. Incluye recorte, perfilado de líneas, hidratación con aceites premium y styling. Nuestros barberos expertos te ayudarán a mantener tu barba en perfecto estado.'
        ],
        [
            'id' => 6,
            'name' => 'Premium Haircut',
            'description' => 'Expert haircut with styling consultation.',
            'price' => 45.00,
            'category' => 'barbershop',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Haircut',
            'brand' => 'LuxeStore',
            'duration' => '45 minutos',
            'details' => 'Corte de cabello premium con consulta de estilo personalizada. Incluye lavado, corte, styling y recomendaciones de productos para mantener tu look. Nuestros estilistas están al día con las últimas tendencias.'
        ],
        [
            'id' => 7,
            'name' => 'Beard Oil Premium',
            'description' => 'Nourishing beard oil with natural ingredients.',
            'price' => 28.00,
            'category' => 'grooming',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Beard+Oil',
            'brand' => 'LuxeStore',
            'size' => '50ml',
            'notes' => ['Aceite de Argán', 'Jojoba', 'Vitamina E'],
            'details' => 'Aceite nutritivo para barba elaborado con ingredientes 100% naturales. Hidrata, suaviza y da brillo a tu barba mientras promueve un crecimiento saludable. Aroma masculino y discreto.'
        ],
        [
            'id' => 8,
            'name' => 'Hair Styling Pomade',
            'description' => 'Professional-grade styling pomade for perfect hold.',
            'price' => 22.00,
            'category' => 'grooming',
            'imageUrl' => 'https://via.placeholder.com/300x300.png?text=Pomade',
            'brand' => 'LuxeStore',
            'size' => '100g',
            'intensity' => 'Fijación Fuerte',
            'details' => 'Pomada de styling profesional con fijación fuerte y acabado brillante. Fácil de aplicar y lavar, permite reestilizar durante el día. Ideal para looks clásicos y modernos. Sin parabenos.'
        ]
    ];

    $product = collect($products)->firstWhere('id', (int)$id);

    if (!$product) {
        abort(404);
    }

    return Inertia::render('product-detail', [
        'product' => $product,
        'whatsappNumber' => '573148395957'
    ]);
})->name('product.detail');



