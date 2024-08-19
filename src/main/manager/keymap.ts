export enum KeymapType {
    SHOW_HIDE_WINDOW,
}

export default class KeymapManager {
    constructor() {
        this.initKeymapConfig()
    }

    private static readonly KEYMAP: Map<KeymapType, string> = new Map<KeymapType, string>([
        [KeymapType.SHOW_HIDE_WINDOW, ""],
    ]);

    private static readonly DEFAULT_KEYMAP: Map<KeymapType, string> = new Map<KeymapType, string>([
        [KeymapType.SHOW_HIDE_WINDOW, 'CommandOrControl+Shift+;'],
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
        this.DEFAULT_KEYMAP.entries().forEach((entry) => {
            this.KEYMAP.set(entry[0], entry[1])
        })
    }

    // 加载快捷键配置
    private initKeymapConfig(): void {
        if (!this.useKeyMapConfigFile()) {
            this.useDefaultKeymapConfig()
        }
    }

    private useKeyMapConfigFile(): boolean {
        // todo 加载持久化配置文件
        return false;
    }

    private useDefaultKeymapConfig(): void {
        KeymapManager.reset()
    }
}