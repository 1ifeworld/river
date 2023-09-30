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

// Get the directory name of the current module
const dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the directory of the Estuary package's src/components directory
const estuaryComponentsDir = path.join(dirname, '..', 'components');

// Function to replace values in a file
function replaceInFile(filePath: string) {
    fs.readFile(filePath, 'utf8', (err: ErrnoException | null, data: string) => {
      if (err) {
        console.error(`Could not read the file ${filePath}.`, err);
        return;
      }
  
      let result = data;
      let changes: string[] = [];
  
      // Replace values based on the mappings
      for (const key of objectKeys(estuaryMapping)) {
        const oldValue = key;
        const newValue = estuaryMapping[key];
        if (result.includes(oldValue)) {
          result = result.replace(new RegExp(`\\b${oldValue}\\b`, 'g'), newValue);
        }
      }
  
      // Write the new content back to the file
      fs.writeFile(filePath, result, 'utf8', (err: ErrnoException | null) => {
        if (err) {
          console.error(`Could not write to the file ${filePath}.`, err);
        } else if (changes.length > 0) {
          console.log(`Modified ${filePath}:\n${changes.join('\n')}`);
        }
      });
    });
  }
  
  // Function to process a directory
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
            // Recursively process the subdirectory
            processDir(filePath);
          } else if (stat.isFile() && path.extname(filePath) === '.tsx') {
            // Replace values in the .tsx file
            replaceInFile(filePath);
          }
        });
      });
    });
  }
  
  // Start processing the src/components directory
  processDir(estuaryComponentsDir);