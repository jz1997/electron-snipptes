import { useStore } from '@renderer/store'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error() {
  const { error, setError } = useStore((state) => {
    return {
      error: state.error,
      setError: state.setError
    }
  })

  useEffect(() => {
    const id = setTimeout(() => {
      setError('')
    }, 3000)

    return () => clearTimeout(id)
  }, [error])

  if (error && error !== '') {
    return (
      <div className="bg-white p-3">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>错误提示</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }
  return <></>
}
