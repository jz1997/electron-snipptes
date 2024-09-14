export default () => {
  // 打开配置文件窗口
  const openSettingModal = () => {
    window.api.openConfigWindow()
    window.electron.ipcRenderer.send('hide-window')
  }
  return {
    openSettingModal
  }
}
