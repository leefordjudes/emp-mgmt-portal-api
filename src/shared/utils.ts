import * as util from 'util';
import * as fs from 'fs';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';

const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const removeFileAsync = util.promisify(fs.unlink);

export const readFile = async (filename: string) => {
  const file = process.cwd() + '\\photos\\' + filename;
  if (!await existsAsync(file)) {
    throw new NotFoundException({ message: 'Resource missing..' });
  }
  return await readFileAsync(file);
};

export const writeFile = async (filename: string, data: Buffer) => {
  const file = process.cwd() + '\\photos\\' + filename;
  console.log(file);
  if (await existsAsync(file)) {
    // throw new NotFoundException({ message: 'Resource exists..' });
    await removeFile(filename);
  }
  await writeFileAsync(file, data);
  return await existsAsync(file);
}

export const removeFile = async (filename: string) => {
  const file = process.cwd() + '\\photos\\' + filename;
  // console.log(!await existsAsync(file));
  if (!await existsAsync(file)) {
    return true;
  }
  await removeFileAsync(file);
  return !await existsAsync(file);
}
