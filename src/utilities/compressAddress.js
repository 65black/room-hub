function compressAddress(address) {
  let compressedAddress = '';

  for (let i = 0; i < 5; i += 1) {
    compressedAddress += address[i];
  }

  compressedAddress += '...';

  for (let i = address.length - 1; i > address.length - 5; i -= 1) {
    compressedAddress += address[i];
  }

  return compressedAddress;
}

export default compressAddress;
