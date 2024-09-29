export default () => {
  const handleKeyEvent = (e: KeyboardEvent) => {
    e.stopPropagation()

    switch (e.code) {
      case 'Escape':
        window.electron.ipcRenderer.send('hide-window')
        break
    }
  }

  const addKeydownEventHandler = () => {
    document.addEventListener('keydown', handleKeyEvent)
  }

  const removeKeydownEventHandler = () => {
    document.removeEventListener('keydown', handleKeyEvent)
  }

  return {
    handleKeyEvent,
    addKeydownEventHandler,
    removeKeydownEventHandler
  }
}
