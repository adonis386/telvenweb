from flask import Blueprint, jsonify, request
from app.models.phone import Phone
from app import db

bp = Blueprint('phones', __name__, url_prefix='/api/phones')

@bp.route('/', methods=['GET'])
def get_phones():
    phones = Phone.query.all()
    return jsonify([phone.to_dict() for phone in phones])

@bp.route('/<int:id>', methods=['GET'])
def get_phone(id):
    phone = Phone.query.get_or_404(id)
    return jsonify(phone.to_dict())

@bp.route('/', methods=['POST'])
def create_phone():
    data = request.get_json()
    
    phone = Phone(
        name=data['name'],
        price=data['price'],
        description=data.get('description'),
        image=data.get('image'),
        tag=data.get('tag'),
        specs=data.get('specs'),
        rating=data.get('rating')
    )
    
    db.session.add(phone)
    db.session.commit()
    
    return jsonify(phone.to_dict()), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_phone(id):
    phone = Phone.query.get_or_404(id)
    data = request.get_json()
    
    for key, value in data.items():
        setattr(phone, key, value)
    
    db.session.commit()
    return jsonify(phone.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
def delete_phone(id):
    phone = Phone.query.get_or_404(id)
    db.session.delete(phone)
    db.session.commit()
    return '', 204 