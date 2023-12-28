export async function getStorageLocal<T = any>(key: string): Promise<T> {
  return new Promise<T>((resolve) => {
    chrome.storage.local.get(key, (result) => {
      return resolve(result[key])
    })
  })
}

export async function getStorageLocalBoolean(key: string): Promise<boolean> {
  return getStorageLocal<boolean>(key)
}

export function storageLocalBoolean({ key, value }: { key: string; value: boolean }) {
  return chrome.storage.local.set({ [key]: value })
}
