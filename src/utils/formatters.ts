// Sanitize input to help prevent XSS attacks
// (probably could be improved with a library)
export function sanitize(input: string | null) {
  if (!input) {
    return '';
  }
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;

  return input.replace(reg, (match) => map[match]);
}

// Format percentage values
export const formatPercentage = (value: string | null) => {
  if (value === null) return;
  return `${Number(value).toFixed(2)}%`;
};

// Format a number that is hundreds to millions (Fund Size)
export const formatHundredToMillion = (value: string | null) => {
  if (value === null) return;
  return `$${(Number(value) * 1000 * 1000).toLocaleString()}`;
};
