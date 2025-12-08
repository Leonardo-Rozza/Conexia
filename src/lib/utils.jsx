import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Eliminamos ": ClassValue[]" y "type ClassValue"
/**
 * Combina condicionalmente clases de Tailwind CSS y las fusiona de forma inteligente.
 * @param {any[]} inputs - Clases de Tailwind
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}