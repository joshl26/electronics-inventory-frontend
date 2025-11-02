// src/features/charts/utils.js

/**
 * Recursively replace numeric values with a randomized integer:
 * Math.floor(original * Math.random() * 2)
 *
 * - Arrays are mapped recursively
 * - Plain objects are traversed via Object.entries (preserves keys)
 * - Other values are returned unchanged
 */
export default function changeNumberOfData(data) {
  if (Array.isArray(data)) {
    return data.map(changeNumberOfData);
  }

  if (data && typeof data === 'object' && data.constructor === Object) {
    return Object.fromEntries(
      Object.entries(data).map(([key, val]) => {
        if (typeof val === 'number') {
          return [key, Math.floor(val * Math.random() * 2)];
        }
        return [key, changeNumberOfData(val)];
      })
    );
  }

  return data;
}
