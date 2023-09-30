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
  
      let result = data;
      let changes: string[] = [];
  
      for (const key of objectKeys(estuaryMapping)) { // replace values based on the mappings in `estuaryMapping`
        const oldValue = key;
        const newValue = estuaryMapping[key];
        if (result.includes(oldValue)) {
          result = result.replace(new RegExp(`\\b${oldValue}\\b`, 'g'), newValue);
        }
      }
  
      fs.writeFile(filePath, result, 'utf8', (err: ErrnoException | null) => { // write the new content back to the file
        if (err) {
          console.error(`Could not write to the file ${filePath}.`, err);
        } else if (changes.length > 0) {
          console.log(`Modified ${filePath}:\n${changes.join('\n')}`);
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