import { KeymapType } from "@main/manager/keymap";
import { useStore } from "@renderer/store";

export default () => {
    const setError = useStore(state => state.setError)

    const register = async (keymapType: KeymapType, keymap: string) => {
        const registerResult = await window.api.registerKeymap(keymapType, keymap)
        if (!registerResult) {
            setError(`注册 ${keymap} 快捷键失败，可以去设置中进行调整。`)
        }
    }

    return {
        register
    }
}