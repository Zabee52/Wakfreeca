interface TrieNode<T = any> {
  value?: T
  children: Record<string, TrieNode<T>>
}

export class Trie<T = any> {
  private root: TrieNode<T>

  constructor() {
    this.root = {
      children: {},
    }
  }

  insert(key: string, value: T) {
    let node = this.root
    for (const char of key) {
      node.children[char] = node.children[char] || { children: {} }
      node = node.children[char]
    }
    node.value = value
  }

  search(key: string): TrieNode<T> | null {
    let node = this.root
    for (const char of key) {
      if (!node.children[char]) {
        return null
      }
      node = node.children[char]
    }
    return node
  }

  nearByItems(startNode: TrieNode<T>, maxCount: number = 20): T[] {
    return this.traverse(startNode, maxCount)
  }

  private traverse(node: TrieNode<T>, maxCount: number): T[] {
    if (!node?.children) {
      return []
    }
    const resultSet: T[] = []
    const queue: TrieNode<T>[] = [...Object.values(node.children)]
    while (queue.length) {
      const current = queue.shift()!
      if (current.value) {
        resultSet.push(current.value)
      }
      if (resultSet.length >= maxCount) {
        break
      }
      const childrens = Object.values(current.children)
      if (!childrens.length) {
        continue
      }
      queue.push(...Object.values(childrens))
    }
    return resultSet
  }

  destroy() {
    this.root = {
      children: {},
    }
  }

  remove(key: string) {
    const node = this.search(key)
    if (!node) {
      return
    }
    node.value = undefined
  }
}
