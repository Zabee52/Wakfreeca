export class FeatureLab {
  private static cleanChat = true

  static getCleanChat() {
    return FeatureLab.cleanChat
  }

  static setCleanChat(value: boolean) {
    FeatureLab.cleanChat = value
  }
}
