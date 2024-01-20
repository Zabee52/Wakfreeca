interface DraggableOptions {
  element: HTMLElement
}

class Draggable {
  private element: HTMLElement
  private isDragging: boolean = false
  private initialX: number = 0
  private initialY: number = 0
  private offsetX: number = 0
  private offsetY: number = 0

  constructor(options: DraggableOptions) {
    this.element = options.element
    this.initDraggable()
  }

  private initDraggable(): void {
    this.element.addEventListener('mousedown', (e: MouseEvent) => this.startDrag(e))
    document.addEventListener('mouseup', () => this.stopDrag())
    document.addEventListener('mousemove', (e: MouseEvent) => this.drag(e))
  }

  private startDrag(e: MouseEvent): void {
    this.isDragging = true
    this.initialX = e.clientX - this.offsetX
    this.initialY = e.clientY - this.offsetY
  }

  private drag(e: MouseEvent): void {
    if (this.isDragging) {
      e.preventDefault()

      let newX = e.clientX - this.initialX
      let newY = e.clientY - this.initialY

      // 화면 크기와 요소의 크기를 고려하여 새 위치 계산
      const elementRect = this.element.getBoundingClientRect()
      const maxX = window.innerWidth - elementRect.width
      const maxY = window.innerHeight - elementRect.height

      // 화면 끝에 도달했는지 검사
      if (newX < 0) newX = 0
      if (newY < 0) newY = 0
      if (newX > maxX) newX = maxX
      if (newY > maxY) newY = maxY

      this.offsetX = newX
      this.offsetY = newY

      this.setTranslate(newX, newY)
    }
  }

  private setTranslate(xPos: number, yPos: number) {
    this.element.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  }

  private stopDrag(): void {
    this.isDragging = false
  }
}

function createDragabbleElement(tagName: string): HTMLElement {
  const element = document.createElement(tagName)
  new Draggable({ element })
  return element
}
function init() {
  const moveLayerRoot = document.getElementsByClassName('moveLayer')?.[0]
  if (!moveLayerRoot) {
    throw new Error('moveLayer root element not found')
  }

  const userFilteredChatPopup = createDragabbleElement('div')
  userFilteredChatPopup.id = 'userFilteredChatPopup'
  userFilteredChatPopup.classList.add('chat-keeper', 'ui-draggable', 'hide')
  userFilteredChatPopup.style.top = '0px'
  userFilteredChatPopup.style.left = '0px'

  const userFilteredChatPopupInner = document.createElement('div')
  userFilteredChatPopupInner.classList.add('layer_in')
  const title = document.createElement('strong')
  title.classList.add('title', 'ui-draggable-handle')
  title.innerText = '채팅'
  userFilteredChatPopupInner.appendChild(title)

  const inwrap = document.createElement('div')
  inwrap.id = 'userFilteredChatPopupInner'
  inwrap.classList.add('inwrap', 'chat_area')
  inwrap.style.paddingLeft = '4px'
  inwrap.style.paddingRight = '4px'
  userFilteredChatPopupInner.appendChild(inwrap)

  const btnWrap = document.createElement('div')
  btnWrap.classList.add('btn_wrap')
  const btnClose = document.createElement('a')
  btnClose.href = 'javascript:;'
  btnClose.classList.add('btn_st2')
  btnClose.textContent = '닫기'
  btnClose.addEventListener('click', () => userFilteredChatPopup.classList.toggle('hide'))
  btnWrap.appendChild(btnClose)
  userFilteredChatPopupInner.appendChild(btnWrap)

  userFilteredChatPopup.appendChild(userFilteredChatPopupInner)

  moveLayerRoot.appendChild(userFilteredChatPopup)
}

// init()
