import ChatFilter from '../src/lib/chat-filter'
import FeatureLab from '../src/lib/feature-lab'
import { ChatFilterItem } from '../src/lib/interfaces'
import { removeStorageLocal } from '../src/lib/storage-utils'
import { delay } from '../src/lib/common-utils'
import { ID_CHAT_FILTER_PREFIX } from '../src/lib/consts'

const listItems: {
  title: string
  type: keyof ChatFilterItem
}[] = [
  {
    title: '완전 일치',
    type: 'exactMatch',
  },
  {
    title: '부분 일치',
    type: 'includeMatch',
  },
  {
    title: '~으로 시작',
    type: 'startsWithMatch',
  },
]

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  })

  const githubIssueButton = document.getElementById('openGithubIssue') as HTMLDivElement
  githubIssueButton.addEventListener('click', function () {
    const url = 'https://github.com/Zabee52/Wakfreeca/issues'
    chrome.tabs.create({ url })
  })

  const copyEmailButton = document.getElementById('copyEmail') as HTMLDivElement
  copyEmailButton.addEventListener('click', function () {
    const email = 'zabeee52@gmail.com'
    navigator.clipboard
      .writeText(email)
      .then(function () {
        copyEmailButton.classList.remove('btn-secondary')
        copyEmailButton.classList.add('btn-success')
        copyEmailButton.textContent = '복사 완료!'

        setTimeout(() => {
          copyEmailButton.classList.remove('btn-success')
          copyEmailButton.classList.add('btn-secondary')
          copyEmailButton.textContent = '개발자에게 항의하고 싶다면 : zabeee52@gmail.com'
        }, 3000)
      })
      .catch(function (err) {
        console.error('Could not copy text: ', err)
      })
  })

  const sectionHome = document.getElementById('home') as HTMLDivElement

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i]

    const article = document.createElement('article')
    article.classList.add('mt-4')

    const title = document.createElement('div')
    title.textContent = listItem.title
    article.appendChild(title)

    const container = document.createElement('div')
    article.appendChild(container)

    const input = createInput()
    const button = createButton()
    const inputGroup = createInputGroup()
    inputGroup.classList.add('d-flex', 'align-items-center', 'justify-content-between')
    inputGroup.appendChild(input)
    inputGroup.appendChild(button)
    container.appendChild(inputGroup)

    const listGroup = createListGroup(`listGroup${listItem.type}`)
    container.appendChild(listGroup)

    button.addEventListener('click', () => {
      const text = input.value.trim()
      if (!text) {
        return
      }

      ChatFilter.addItem(listItem.type, text)
        .then(() => {
          loadItems()
        })
        .finally(() => {
          input.value = ''
          input.focus()
        })
    })
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        button.click()
      }
    })
    sectionHome.appendChild(article)
  }

  init()
})

const createInput = () => {
  const input = document.createElement('input')
  input.classList.add('form-control')
  input.type = 'text'
  return input
}

const createButton = () => {
  const button = document.createElement('button')
  button.classList.add('btn', 'btn-outline-secondary')
  button.textContent = '추가'
  return button
}

const createInputGroup = (id?: string) => {
  const inputGroup = document.createElement('div')
  inputGroup.classList.add('input-group')

  if (id) {
    inputGroup.id = id
  }
  return inputGroup
}

const createBadge = (type: keyof ChatFilterItem, text: string) => {
  const badge = document.createElement('div')
  badge.classList.add('badge', 'bg-primary')
  badge.textContent = text
  badge.style.cursor = 'pointer'
  badge.addEventListener('click', () => {
    ChatFilter.removeItem(type, text)
  })
  return badge
}

const createListGroup = (id?: string) => {
  const listGroup = document.createElement('div')
  listGroup.classList.add('mt-2', 'd-flex', 'gap-2')

  if (id) {
    listGroup.id = id
  }
  return listGroup
}

const init = async () => {
  if (!ChatFilter.loaded) {
    await ChatFilter.init()
  }
  if (!FeatureLab.loaded) {
    await FeatureLab.init()
  }

  loadItems()

  // TODO: remove in next deployment
  migration()
}

const migration = async () => {
  let removed = false
  if (FeatureLab.getFeatureEnabled('cuteFilter')) {
    await ChatFilter.addItem('exactMatch', 'ㄱㅇㅇ')
    await delay(100)
    await ChatFilter.addItem('exactMatch', 'ㄱㅇㅇㅇ')
    await delay(100)
    removed = true
  }
  if (FeatureLab.getFeatureEnabled('eeFilter')) {
    await ChatFilter.addItem('startsWithMatch', 'ㅔㅔ')
    await delay(100)
    removed = true
  }
  if (FeatureLab.getFeatureEnabled('kiaFilter')) {
    await ChatFilter.addItem('startsWithMatch', '캬ㅑ')
    await delay(100)
    removed = true
  }
  if (removed) {
    await removeStorageLocal('features')
    loadItems()
  }
}

const loadItems = () => {
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i]
    const listGroup = document.getElementById(`listGroup${listItem.type}`) as HTMLDivElement
    listGroup.innerHTML = ''
    const list = ChatFilter.getList(listItem.type)
    for (const text of list) {
      const badge = createBadge(listItem.type, text)
      listGroup.appendChild(badge)
    }
  }
}

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName !== 'local' || !changes[ID_CHAT_FILTER_PREFIX ]) {
    return
  }
  loadItems()
})
