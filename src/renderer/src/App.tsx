import Result from "./components/Result"
import Search from "./components/Search"

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Search />
      <div className={'h-2'} ></div>
      <Result />
    </>
  )
}

export default App
