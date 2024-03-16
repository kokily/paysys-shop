export function dataURItoBlob(uri: string) {
  // Base64 Decode
  const blob = window.atob(uri.split(',')[1]);

  let array: Array<number> = [];

  for (let i = 0; i < blob.length; i++) {
    array.push(blob.charCodeAt(i));
  }

  const file = new Blob([new Uint8Array(array)], { type: 'image/png' });

  return file;
}
