import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {estuaryMapping} from './index';
import { objectKeys } from '../utils';

interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

const dirname = path.dirname(fileURLToPath(import.meta.url)); // get the directory name of the current module

const estuaryComponentsDir = path.join(dirname, '..', 'components'); // define Estuary's `components` directory

function replaceInFile(filePath: string) {
  fs.readFile(filePath, 'utf8', (err: ErrnoException | null, data: string) => {
    if (err) {
      console.error(`Could not read the file ${filePath}.`, err);
      return;
    }

    let result = data.split('\n').map(line => {
      if (line.startsWith('import')) {
        return line; // return the line as is if it starts with 'import'
      }

      let modifiedLine = line;
      for (const key of objectKeys(estuaryMapping)) {
        const oldValue = key;
        const newValue = estuaryMapping[key];
        if (modifiedLine.includes(oldValue as string)) {
          modifiedLine = modifiedLine.replace(new RegExp(`\\b${oldValue}\\b`, 'g'), newValue);
        }
      }
      return modifiedLine;
    }).join('\n');

    fs.writeFile(filePath, result, 'utf8', (err: ErrnoException | null) => {
      if (err) {
        console.error(`Could not write to the file ${filePath}.`, err);
      }
    });
  });
}

  function processDir(dirPath: string) {
    fs.readdir(dirPath, (err: ErrnoException | null, files: string[]) => {
      if (err) {
        console.error(`Could not list the directory ${dirPath}.`, err);
        return;
      }
  
      files.forEach((file: string) => {
        const filePath = path.join(dirPath, file);
  
        fs.stat(filePath, (err: ErrnoException | null, stat: fs.Stats) => {
          if (err) {
            console.error(`Could not stat the file ${filePath}.`, err);
            return;
          }
  
          if (stat.isDirectory()) {
            processDir(filePath);
          } else if (stat.isFile() && path.extname(filePath) === '.tsx') {
            replaceInFile(filePath);
          }
        });
      });
    });
  }
  
  processDir(estuaryComponentsDir);