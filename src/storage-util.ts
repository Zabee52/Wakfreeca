export async function getStorageLocal(key: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    chrome.storage.local.get(key, (result) => {
      if (!result[key]) {
        return resolve(false)
      }
      return resolve(result[key])
    })
  })
}

export function storageLocal({ key, value }: { key: string; value: boolean }) {
  return chrome.storage.local.set({ [key]: value })
}
