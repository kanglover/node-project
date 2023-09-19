import { createHash } from 'crypto';

export class CryptoUtil {
  encrypt(text: string): string {
    return createHash('sha256').update(text).digest('hex');
  }
}
