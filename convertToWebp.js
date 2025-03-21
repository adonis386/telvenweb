import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = './src/assets'; // Ajusta esta ruta según tu estructura
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

async function convertToWebp() {
    try {
        // Asegurarse de que el directorio existe
        await fs.ensureDir(ASSETS_DIR);

        // Leer todos los archivos del directorio
        const files = await fs.readdir(ASSETS_DIR);

        for (const file of files) {
            const filePath = path.join(ASSETS_DIR, file);
            const ext = path.extname(file).toLowerCase();
            
            // Verificar si es una imagen soportada
            if (SUPPORTED_FORMATS.includes(ext)) {
                const fileName = path.basename(file, ext);
                const outputPath = path.join(ASSETS_DIR, `${fileName}.webp`);

                console.log(`Convirtiendo: ${file}`);

                await sharp(filePath)
                    .webp({ quality: 80 }) // Ajusta la calidad según necesites (0-100)
                    .toFile(outputPath);

                console.log(`Convertido: ${fileName}.webp`);
            }
        }

        console.log('¡Conversión completada!');
    } catch (error) {
        console.error('Error durante la conversión:', error);
    }
}

convertToWebp(); 