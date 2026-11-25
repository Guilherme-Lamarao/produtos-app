export const CATEGORIES = [
  "Alimentos",
  "Bebidas",
  "Eletrônicos",
  "Higiene",
  "Limpeza",
  "Papelaria",
  "Outros",
  "Roupas",
] as const;

export type Category = (typeof CATEGORIES)[number];
