import { Trie } from './trie'

export class TrieFactory {
  private static instance: Trie

  public static getInstance<T = any>(): Trie {
    if (!TrieFactory.instance) {
      TrieFactory.instance = new Trie<T>()
    }
    return TrieFactory.instance
  }
}
