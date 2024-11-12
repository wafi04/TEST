export function FormatText(
  text: string,
  options: {
    maxLength?: number;
    ellipsis?: string;
  } = {}
): string {
  const { maxLength = 50, ellipsis = "..." } = options;

  // Jika panjang teks kurang dari atau sama dengan maxLength, kembalikan teks asli
  if (text.length <= maxLength) {
    return text;
  }

  // jika lbih maka potong teks dan tambahkan ellipsis
  return text.slice(0, maxLength).trim() + ellipsis;
}
