import { useStore } from '@renderer/store'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@renderer/utils/utils'

export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Error({ className, ...props }: ErrorProps) {
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
      <div className={cn('bg-white p-3', className)} {...props}>
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
