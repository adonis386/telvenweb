from flask import Blueprint, jsonify
from app.models.internet_device import InternetDevice

bp = Blueprint('internet_devices', __name__)

@bp.route('/api/internet-devices', methods=['GET'])
def get_internet_devices():
    devices = InternetDevice.query.all()
    return jsonify([device.to_dict() for device in devices])
