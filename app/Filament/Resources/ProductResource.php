<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'fas-bottle-droplet';

    protected static ?string $navigationGroup = 'Productos';

    protected static ?string $modelLabel = 'Perfume';

    protected static ?string $pluralModelLabel = 'Perfumes';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información Básica del Perfume')
                    ->description('Detalles principales del producto')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nombre del Perfume')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation === 'edit') return;
                                $set('slug', Str::slug($state));
                            })
                            ->placeholder('Ej: Chanel N°5 Eau de Parfum'),

                        Forms\Components\TextInput::make('slug')
                            ->label('URL Amigable')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->disabled(fn($operation) => $operation === 'edit'),

                        Forms\Components\Select::make('brand_id')
                            ->label('Marca')
                            ->relationship('brand', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->helperText('Selecciona o crea una nueva marca'),

                        Forms\Components\Select::make('category_id')
                            ->label('Categoría')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                            ]),

                        Forms\Components\Textarea::make('description')
                            ->label('Descripción')
                            ->required()
                            ->rows(4)
                            ->maxLength(2000)
                            ->placeholder('Describe las características, aroma y sensaciones del perfume...')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Precio e Inventario')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label('Precio de Venta')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0)
                            ->step(0.01)
                            ->placeholder('0.00'),

                        Forms\Components\TextInput::make('compare_price')
                            ->label('Precio Regular')
                            ->numeric()
                            ->prefix('$')
                            ->minValue(0)
                            ->step(0.01)
                            ->placeholder('0.00')
                            ->helperText('Precio anterior para mostrar descuento'),

                        Forms\Components\TextInput::make('stock')
                            ->label('Inventario')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->suffix('unidades'),

                        Forms\Components\TextInput::make('sku')
                            ->label('SKU (Código)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(100)
                            ->placeholder('CHANEL-EDP-100ML'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Especificaciones del Perfume')
                    ->description('Características técnicas específicas')
                    ->schema([
                        Forms\Components\Select::make('fragrance_family')
                            ->label('Familia Olfativa')
                            ->required()
                            ->options([
                                'floral' => '🌸 Floral',
                                'oriental' => '🌺 Oriental',
                                'amaderado' => '🌳 Amaderado',
                                'citrico' => '🍊 Cítrico',
                                'aquatic' => '🌊 Acuático',
                                'fougere' => '🌿 Fougère',
                                'chypre' => '🍂 Chypre',
                                'gourmand' => '🍫 Gourmand',
                                'fresh' => '🍃 Fresco',
                                'spicy' => '🌶️ Aromático/Especiado',
                            ])
                            ->searchable(),

                        Forms\Components\Select::make('concentration')
                            ->label('Concentración')
                            ->required()
                            ->options([
                                'eau_fraiche' => 'Eau Fraîche (1-3%)',
                                'eau_de_cologne' => 'Eau de Cologne (2-4%)',
                                'eau_de_toilette' => 'Eau de Toilette (5-15%)',
                                'eau_de_parfum' => 'Eau de Parfum (15-20%)',
                                'parfum' => 'Parfum/Extract (20-30%)',
                            ])
                            ->searchable()
                            ->helperText('Porcentaje de esencia aromática'),

                        Forms\Components\TextInput::make('size')
                            ->label('Tamaño/Volumen')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('100ml')
                            ->suffix('ml'),

                        Forms\Components\TagsInput::make('notes')
                            ->label('Notas Olfativas')
                            ->placeholder('Agregar nota olfativa')
                            ->helperText('Ej: Bergamota, Jazmín, Vainilla, Sándalo...')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Imágenes del Producto')
                    ->schema([
                        Forms\Components\FileUpload::make('images')
                            ->label('Galería de Imágenes')
                            ->image()
                            ->multiple()
                            ->directory('products')
                            ->reorderable()
                            ->appendFiles()
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('1:1')
                            ->imageResizeTargetWidth('600')
                            ->imageResizeTargetHeight('600')
                            ->maxFiles(5)
                            ->helperText('Máximo 5 imágenes. Tamaño recomendado: 600x600px')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Configuración')
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Producto Destacado')
                            ->default(false)
                            ->helperText('Aparecerá en secciones destacadas'),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Producto Activo')
                            ->required()
                            ->default(true)
                            ->helperText('Si está desactivado, no se mostrará en la tienda'),

                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images')
                    ->label('Imagen')
                    ->circular()
                    ->size(50)
                    ->stacked()
                    ->limit(1)
                    ->limitedRemainingText()
                    ->defaultImageUrl(url('/images/default-product.png')),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable()
                    ->weight('medium')
                    ->description(fn(Product $record): string => $record->brand->name ?? '')
                    ->wrap(),

                Tables\Columns\TextColumn::make('brand.name')
                    ->label('Marca')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Categoría')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('price')
                    ->label('Precio')
                    ->money('USD')
                    ->sortable()
                    ->color('success')
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('stock')
                    ->label('Stock')
                    ->numeric()
                    ->sortable()
                    ->color(fn(Product $record): string => $record->stock > 10 ? 'success' : ($record->stock > 0 ? 'warning' : 'danger'))
                    ->badge(),

                Tables\Columns\TextColumn::make('concentration')
                    ->label('Concentración')
                    ->badge()
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'eau_fraiche' => 'Fraîche',
                        'eau_de_cologne' => 'Cologne',
                        'eau_de_toilette' => 'Toilette',
                        'eau_de_parfum' => 'Parfum',
                        'parfum' => 'Extract',
                        default => $state,
                    })
                    ->color(fn(string $state): string => match ($state) {
                        'parfum' => 'danger',
                        'eau_de_parfum' => 'warning',
                        'eau_de_toilette' => 'success',
                        'eau_de_cologne' => 'info',
                        'eau_fraiche' => 'gray',
                        default => 'gray',
                    }),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Destacado')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Activo')
                    ->boolean()
                    ->sortable()
                    ->trueColor('success')
                    ->falseColor('danger'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('brand')
                    ->relationship('brand', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Marca'),

                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Categoría'),

                Tables\Filters\SelectFilter::make('fragrance_family')
                    ->label('Familia Olfativa')
                    ->options([
                        'floral' => 'Floral',
                        'oriental' => 'Oriental',
                        'amaderado' => 'Amaderado',
                        'citrico' => 'Cítrico',
                        'aquatic' => 'Acuático',
                        'fougere' => 'Fougère',
                        'chypre' => 'Chypre',
                        'gourmand' => 'Gourmand',
                        'fresh' => 'Fresco',
                        'spicy' => 'Especiado',
                    ]),

                Tables\Filters\SelectFilter::make('concentration')
                    ->label('Concentración')
                    ->options([
                        'eau_fraiche' => 'Eau Fraîche',
                        'eau_de_cologne' => 'Eau de Cologne',
                        'eau_de_toilette' => 'Eau de Toilette',
                        'eau_de_parfum' => 'Eau de Parfum',
                        'parfum' => 'Parfum',
                    ]),

                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Destacados'),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Solo Activos'),

                Tables\Filters\Filter::make('low_stock')
                    ->label('Stock Bajo')
                    ->query(fn(Builder $query): Builder => $query->where('stock', '<', 10)),

                Tables\Filters\Filter::make('out_of_stock')
                    ->label('Sin Stock')
                    ->query(fn(Builder $query): Builder => $query->where('stock', 0)),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->color('gray')
                    ->icon('heroicon-o-eye'),

                Tables\Actions\EditAction::make()
                    ->color('primary')
                    ->icon('heroicon-o-pencil'),

                Tables\Actions\Action::make('quick_toggle')
                    ->label('Activar/Desactivar')
                    ->icon('heroicon-o-power')
                    ->color('warning')
                    ->action(function (Product $record) {
                        $record->update(['is_active' => !$record->is_active]);
                    }),

                Tables\Actions\DeleteAction::make()
                    ->color('danger')
                    ->icon('heroicon-o-trash'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),

                    Tables\Actions\BulkAction::make('activate')
                        ->label('Activar Productos')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(function ($records) {
                            $records->each->update(['is_active' => true]);
                        }),

                    Tables\Actions\BulkAction::make('deactivate')
                        ->label('Desactivar Productos')
                        ->icon('heroicon-o-x-circle')
                        ->color('warning')
                        ->action(function ($records) {
                            $records->each->update(['is_active' => false]);
                        }),

                    Tables\Actions\BulkAction::make('mark_featured')
                        ->label('Marcar como Destacados')
                        ->icon('heroicon-o-star')
                        ->color('warning')
                        ->action(function ($records) {
                            $records->each->update(['is_featured' => true]);
                        }),
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label('Crear Primer Perfume')
                    ->icon('heroicon-o-plus'),
            ])
            ->emptyStateDescription('Comienza agregando tu primer perfume al catálogo.')
            ->emptyStateIcon('fas-bottle-droplet');
    }

    public static function getRelations(): array
    {
        return [
            // Puedes agregar relaciones aquí después
            // RelationManagers\ReviewsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'view' => Pages\ViewProduct::route('/{record}'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'primary';
    }
}
