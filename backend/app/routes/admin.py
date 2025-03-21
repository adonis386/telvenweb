import os
from flask import Blueprint, request, jsonify, current_app, url_for
from werkzeug.utils import secure_filename
from app import db
from app.models.phone import Phone
from app.models.internet_device import InternetDevice
from app.models.cubitt_product import CubittProduct

bp = Blueprint('admin', __name__)

# Cambia la ruta de uploads para que sea accesible desde el frontend
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/api/upload', methods=['POST'])
def upload_file():
    print("Recibiendo solicitud de carga de archivo")  # Log de debug
    if 'image' not in request.files:
        print("No se encontró archivo en la solicitud")  # Log de debug
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['image']
    if file.filename == '':
        print("Nombre de archivo vacío")  # Log de debug
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Imprimir la ruta completa donde se guardará el archivo
        upload_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'uploads')
        print(f"Carpeta de destino: {upload_folder}")  # Log de debug
        
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        print(f"Guardando archivo en: {file_path}")  # Log de debug
        
        file.save(file_path)
        
        # Verificar si el archivo se guardó correctamente
        if os.path.exists(file_path):
            print(f"Archivo guardado exitosamente en {file_path}")  # Log de debug
        else:
            print(f"Error: El archivo no se guardó en {file_path}")  # Log de debug
        
        return jsonify({
            'url': f'http://localhost:5000/static/uploads/{filename}',
            'message': 'File uploaded successfully'
        }), 200
    
    return jsonify({'error': 'File type not allowed'}), 400

@bp.route('/api/admin/phones', methods=['POST'])
def add_phone():
    data = request.json
    phone = Phone(
        name=data['name'],
        price=float(data['price']),
        image=data['image'],
        description=data['description'],
        tag=data['tag'],
        specs=data['specs'],
        rating=float(data['rating']) if data.get('rating') else None
    )
    db.session.add(phone)
    db.session.commit()
    return jsonify({'message': 'Phone added successfully'}), 201

@bp.route('/api/admin/internet-devices', methods=['POST'])
def add_internet_device():
    data = request.json
    device = InternetDevice(
        name=data['name'],
        price=float(data['price']),
        image=data['image'],
        description=data['description'],
        category=data['category'],
        tag=data['tag'],
        features=data['features']
    )
    db.session.add(device)
    db.session.commit()
    return jsonify({'message': 'Internet device added successfully'}), 201

@bp.route('/api/admin/cubitt-products', methods=['POST'])
def add_cubitt_product():
    data = request.json
    product = CubittProduct(
        name=data['name'],
        price=float(data['price']),
        image=data['image'],
        description=data['description'],
        tag=data['tag']
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Cubitt product added successfully'}), 201

@bp.route('/api/admin/<string:type>/<int:id>', methods=['DELETE'])
def delete_product(type, id):
    try:
        if type == 'phones':
            product = Phone.query.get_or_404(id)
        elif type == 'internet-devices':
            product = InternetDevice.query.get_or_404(id)
        elif type == 'cubitt-products':
            product = CubittProduct.query.get_or_404(id)
        else:
            return jsonify({'error': 'Invalid product type'}), 400

        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/api/admin/<string:type>/<int:id>', methods=['PUT'])
def update_product(type, id):
    try:
        data = request.json
        if type == 'phones':
            product = Phone.query.get_or_404(id)
        elif type == 'internet-devices':
            product = InternetDevice.query.get_or_404(id)
        elif type == 'cubitt-products':
            product = CubittProduct.query.get_or_404(id)
        else:
            return jsonify({'error': 'Invalid product type'}), 400

        for key, value in data.items():
            setattr(product, key, value)

        db.session.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500 