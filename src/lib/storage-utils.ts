export async function getStorageLocal<T = any>(key: string, def?: T): Promise<T> {
  return new Promise<T>((resolve) => {
    chrome.storage.local.get(key, (result) => {
      return resolve(result[key] ?? def)
    })
  })
}

export async function getStorageLocalBoolean(key: string, def: boolean = false): Promise<boolean> {
  return getStorageLocal<boolean>(key, def)
}

export function storageLocalBoolean({ key, value }: { key: string; value: boolean }) {
  return chrome.storage.local.set({ [key]: value })
}

