import { config } from 'process';

export function convertDataURLToBuffer(url: string): Buffer {
  if (!url) {
    return null;
  }

  var data = url.split(',')[1];

  return Buffer.from(data, 'base64');
}

export function convertBufferToDataURL(
  buffer: Buffer,
  contentType: string
): string {
  if (!buffer) {
    return null;
  }

  let url = buffer.toString('base64');
  if (!url.startsWith(`data:${contentType}`)) {
    url = `data:${contentType};base64,${url}`;
  }

  return url;
}
