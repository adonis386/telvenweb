from app import create_app, db
from app.models.cubitt_product import CubittProduct

app = create_app()

with app.app_context():
    # Primero, verificamos si ya existe el producto
    existing_product = CubittProduct.query.filter_by(name='Smartwatch Cubitt Pro').first()
    
    if not existing_product:
        # Creamos un producto de prueba
        test_product = CubittProduct(
            name='Smartwatch Cubitt Pro',
            price=129.99,
            image='/src/assets/Home (8).webp',
            description='Monitor de actividad y notificaciones',
            tag='Nuevo'
        )
        
        # Añadimos a la base de datos
        db.session.add(test_product)
        db.session.commit()
        print("Producto de prueba insertado correctamente")
    else:
        print("El producto de prueba ya existe")
