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
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { cn } from '@renderer/utils/utils'

export interface CategoryFormProps {
  className?: string
  onSubmit?: (value: Category) => void
  category?: Category
}

export interface CategoryFormHandle {
  submit: () => Promise<Category>
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

    // 手动触发表单提交
    const submit = (): Promise<Category> => {
      return new Promise<Category>((resolve) => {
        form.handleSubmit((values: z.infer<typeof formSchema>) => {
          const data: Category = {
            ...values
          }

          if (category && category.id) {
            data.id = category.id
          }

          if (category && category.createAt) {
            data.createAt = category.createAt
          }

          resolve(data)
        })()
      })
    }

    return (
      <div className={cn(className)} {...props}>
        <Form {...form}>
          <form className="space-y-8">
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
