import multer, { DiskStorageOptions } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

export const extractRootDirPath = (path: string) => {
    const pathArray = path.split('\\');
    const pathOfRootDir = pathArray.slice(0, pathArray.indexOf("src"));
    return pathOfRootDir.join("\\")
}

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadDir = path.join(extractRootDirPath(__dirname), 'assets', 'uploads', req.baseUrl.split('/').pop() || 'default');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
} as DiskStorageOptions);

export const upload = multer({ storage });
