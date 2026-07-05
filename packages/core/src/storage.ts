export interface StorageAdapter {
  getItem(key: string): Promise<string | null> | string | null
  setItem(key: string, value: string): Promise<void> | void
}

export function createNoopStorage(): StorageAdapter {
  return {
    getItem: () => null,
    setItem: () => {},
  }
}

