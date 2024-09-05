import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Category } from '@main/db/entites/category'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { cn } from '@renderer/utils/utils'

export interface CategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit?: (value: any) => void
  onCancel?: () => void
  category?: Category
}

export interface CategoryFormHandle {
  submit: () => void
}

const CategoryForm = forwardRef<CategoryFormHandle, CategoryFormProps>(
  ({ category, onSubmit, className, ...props }: CategoryFormProps, ref) => {
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

    useImperativeHandle(ref, () => ({
      submit: submit
    }))

    // 表单按钮触发表单提交
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

    // 手动触发表单提交
    const submit = () => {
      form.handleSubmit((values: z.infer<typeof formSchema>) => {
        return new Promise((resolve, reject) => {
          const data: any = {
            ...values,
            createAt: new Date()
          }

          if (category && category.id) {
            data.id = category.id
          }

          resolve(data)
        })
      })()
    }

    return (
      <div className={cn(className)} {...props}>
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
          </form>
        </Form>
      </div>
    )
  }
)

export default CategoryForm
