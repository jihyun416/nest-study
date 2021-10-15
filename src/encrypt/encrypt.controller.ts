import { Controller, Get, Request } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Public } from '../auth/public.decorator';
import * as bcrypt from 'bcrypt';

@Controller('encrypt')
export class EncryptController {
  @Public()
  @Get()
  async encrypt(): Promise<Buffer> {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';
    console.log(iv);
    console.log(password);
    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    console.log(key);
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    console.log(cipher);
    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    console.log(encryptedText);
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decryptedText;
  }

  @Public()
  @Get('/bcrypt')
  async bcrypt(): Promise<any> {
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(password, saltOrRounds);
    const salt = await bcrypt.genSalt();
    const isMatch = await bcrypt.compare(password, hash);
    console.log(hash);
    console.log(salt);
    console.log(isMatch);
    return hash;
  }
}
