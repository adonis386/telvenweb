from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Configurar CORS para permitir todas las rutas
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    migrate.init_app(app, db)

    # Ruta para servir archivos estáticos
    @app.route('/static/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(os.path.join(app.root_path, 'static', 'uploads'), filename)

    # Registrar blueprints
    from app.routes.phones import bp as phones_bp
    from app.routes.internet_devices import bp as internet_devices_bp
    from app.routes.cubitt_products import bp as cubitt_products_bp
    from app.routes.admin import bp as admin_bp

    app.register_blueprint(phones_bp)
    app.register_blueprint(internet_devices_bp)
    app.register_blueprint(cubitt_products_bp)
    app.register_blueprint(admin_bp)

    return app 