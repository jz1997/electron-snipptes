import { useToast } from '@renderer/components/ui/use-toast'

interface MessageProps {
  title?: string
  description?: string
  duration?: number
  variant?: 'info' | 'danger' | 'warning' | 'success' | 'default' | 'destructive'
}

const defaultMessageProps: MessageProps = {
  title: '系统提示',
  duration: 1000,
  variant: 'info'
}

const useMessage = () => {
  const { toast } = useToast()

  const infoMsg = ({ title = defaultMessageProps.title, description }) => {
    toast({
      ...defaultMessageProps,
      variant: 'info',
      title,
      description
    })
  }

  const errorMsg = ({ title = defaultMessageProps.title, description }) => {
    toast({
      ...defaultMessageProps,
      variant: 'danger',
      title,
      description
    })
  }

  const warnningMsg = ({ title = defaultMessageProps.title, description }) => {
    toast({
      ...defaultMessageProps,
      variant: 'warning',
      title,
      description
    })
  }

  const successMsg = ({ title = defaultMessageProps.title, description }) => {
    toast({
      ...defaultMessageProps,
      variant: 'success',
      title,
      description
    })
  }

  return {
    toast,
    infoMsg,
    errorMsg,
    warnningMsg,
    successMsg
  }
}

export default useMessage
