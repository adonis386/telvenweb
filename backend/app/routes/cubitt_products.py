from flask import Blueprint, jsonify
from app.models.cubitt_product import CubittProduct

bp = Blueprint('cubitt_products', __name__)

@bp.route('/api/cubitt-products', methods=['GET'])
def get_cubitt_products():
    products = CubittProduct.query.all()
    return jsonify([product.to_dict() for product in products])
