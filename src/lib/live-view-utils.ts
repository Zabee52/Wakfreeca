import { getViewerCount } from './afreeca-utils'
import { delay } from './common-utils'
import { DEFAULT_RETRY_LIMIT } from './consts'
import { AfreecaTvUserListItem } from './interfaces'

declare const window: any

let viewerListCalled = false

export const getConnectedLiveView = async (): Promise<any> => {
  if (!window.liveView) {
    throw new Error('liveView not found')
  }

  if (!window.liveView?.playerController?.getLivePlayer?.()?.chatSocket?.isConnected) {
    throw new Error('chat server connected yet.')
  }

  return window.liveView
}

/**
 *  sendChUser()를 호출한 후에 호출해야 합니다.
 * @param liveView
 * @param expectedCount : expectedCount should be less than the actual expected viewer count. recommended to use 0.5 of the actual count.
 * @param retry
 * @returns
 */
export const getViewerList = async (
  liveView: any,
  expectedCount: number,
  retry: number = DEFAULT_RETRY_LIMIT
): Promise<AfreecaTvUserListItem[] | null> => {
  if (!viewerListCalled) {
    throw new Error('getViewerList(): Human error. sendChUser() not called')
  }

  if (!retry) {
    console.log('getViewerList(): retry limit exceeded')
    return null
  }

  const viewerList = liveView.Chat.chatUserListLayer.getFlattenedUserList() as AfreecaTvUserListItem[]

  if (viewerList.length < expectedCount) {
    console.log('viewerList not found or has error. retry, remaining:', --retry)
    await delay(1000)
    return getViewerList(liveView, expectedCount, retry)
  }

  return viewerList
}

export const sendChUser = (liveView: any) => {
  if (!liveView.playerController.sendChUser) {
    throw new Error('liveView not found')
  }
  liveView.playerController.sendChUser()
  viewerListCalled = true
}

export const getCurrentViewerList = async (liveView: any) => {
  try {
    sendChUser(liveView)
    const viewerCount = getViewerCount()
    const viewerList = await getViewerList(liveView, viewerCount * 0.5)
    return viewerList?.filter((viewer) => viewer.type !== 'title')
  } catch (err) {
    console.error(err)
    return null
  }
}
