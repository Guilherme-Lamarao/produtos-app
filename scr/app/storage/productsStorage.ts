import AsyncStorage from "@react-native-async-storage/async-storage";

import { Product } from "../types/Product";

const PRODUCTS_STORAGE_KEY = "@produtos-app:products";

export async function getProducts(): Promise<Product[]> {
  try {
    const storage = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);

    if (!storage) {
      return [];
    }

    const parsed: unknown = JSON.parse(storage);

    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch (error) {
    throw new Error("GET_PRODUCTS: " + error);
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    throw new Error("SAVE_PRODUCTS: " + error);
  }
}
