// Formatador de número como preço em reais
export function formatPrice(value: number): string {
  const [integer, decimal] = value.toFixed(2).split(".");
  const withThousands = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${withThousands},${decimal}`;
}


export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
