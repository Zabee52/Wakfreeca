import { DEFAULT_RETRY_LIMIT } from "./consts"

export const delay = async (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const funcWithRetry = async <T=any>(func: () => Promise<T>, retry: number = DEFAULT_RETRY_LIMIT, abortRetry: boolean = false): Promise<T | null | undefined> => {
  if (abortRetry) {
    console.log(`${func.name}: retry aborted`)
    return func()
  }
  if (!retry) {
    console.log(`${func.name}: retry limit exceeded`)
    return null
  }

  try {
    return await func()
  } catch (error: any) {
    console.log(`${func.name} failed. err: ${error?.message || error} retry, remaining: ${--retry}`)
    await delay(1000)
    return funcWithRetry(func, --retry)
  }
}