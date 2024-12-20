export enum KeymapType {
  SHOW_HIDE_WINDOW,
  QUICK_SAVE
}

export default class KeymapManager {
  constructor() {
    this.initKeymapConfig()
  }

  private static readonly KEYMAP: Map<KeymapType, string> = new Map<KeymapType, string>([
    [KeymapType.SHOW_HIDE_WINDOW, ''],
    [KeymapType.QUICK_SAVE, '']
  ])

  private static readonly DEFAULT_KEYMAP: Map<KeymapType, string> = new Map<KeymapType, string>([
    [KeymapType.SHOW_HIDE_WINDOW, 'CommandOrControl+Shift+;'],
    [KeymapType.QUICK_SAVE, 'CommandOrControl+Shift+i']
  ])

  public static get(key: KeymapType): string {
    return this.KEYMAP.get(key) || ''
  }

  public static set(key: KeymapType, value: string): void {
    this.KEYMAP.set(key, value)
  }

  public static getOrDefault(key: KeymapType): string {
    return this.KEYMAP.get(key) || this.DEFAULT_KEYMAP.get(key) || ''
  }

  public static reset(): void {
    this.KEYMAP.clear()

    for (const [key, value] of this.DEFAULT_KEYMAP.entries()) {
      this.KEYMAP.set(key, value)
    }
  }

  // 加载快捷键配置
  private initKeymapConfig(): void {
    if (!this.useKeyMapConfigFile()) {
      this.useDefaultKeymapConfig()
    }
  }

  private useKeyMapConfigFile(): boolean {
    // todo 加载持久化配置文件
    return false
  }

  private useDefaultKeymapConfig(): void {
    KeymapManager.reset()
  }
}
