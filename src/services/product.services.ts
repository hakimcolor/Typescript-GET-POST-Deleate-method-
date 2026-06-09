import { log } from 'console';
import path from 'path';
import fs from 'fs';
const filepath = path.join(process.cwd(), 'src/data/db.json');

export const readproduct = () => {
  // console.log(process.cwd());
  // console.log(filepath)
  const products = fs.readFileSync(filepath, 'utf-8');
  // console.log(products);
  return JSON.parse(products);
};

export const insertproduct = (payload: any) => {
  fs.writeFileSync(filepath,JSON.stringify(payload))
}