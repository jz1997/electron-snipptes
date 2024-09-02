import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@renderer/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Category } from '@main/db/entites/category'
import React, { useEffect } from 'react'
import { cn } from '@renderer/utils/utils'

export interface CategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit?: (value: any) => void
  onCancel?: () => void
  category?: Category
}

export default function CategoryForm({
  onSubmit,
  className,
  category,
  ...props
}: CategoryFormProps) {
  const formSchema = z.object({
    name: z
      .string()
      .min(2, '分类名称长度在 2 至 64 个字符之间')
      .max(64, '分类名称长度在 2 至 64 个字符之间')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(category || { name: '' })
    }
  })

  useEffect(() => {
    if (category) {
      form.reset({
        ...(category || { name: '' })
      })
    }
  }, [category])

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const data: any = {
      ...values,
      createAt: new Date()
    }

    if (category && category.id) {
      data.id = category.id
    }

    onSubmit?.(data)
  }

  return (
    <div className={cn('p-4 border rounded-md', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center justify-start gap-x-2">
            <Button type="submit">提交</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
