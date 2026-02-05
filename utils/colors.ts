export function hexToHsl(hex: string): string {
  // Remove hash if it exists
  let H = hex.replace(/^#/, '');

  // Convert 3-digit hex to 6-digit
  if (H.length === 3) {
    H = H.split('').map(char => char + char).join('');
  }

  if (H.length !== 6) {
    // Return a fallback for invalid hex
    return '0 0% 0%';
  }

  const r = parseInt(H.substring(0, 2), 16) / 255;
  const g = parseInt(H.substring(2, 4), 16) / 255;
  const b = parseInt(H.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  const hVal = Math.round(h * 360);
  const sVal = Math.round(s * 100);
  const lVal = Math.round(l * 100);

  return `${hVal} ${sVal}% ${lVal}%`;
}
