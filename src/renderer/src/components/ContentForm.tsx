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
import { Content } from '@main/db/entites/content'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Textarea } from '@renderer/components/ui/textarea'
import { Category } from '@main/db/entites/category'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { SelectViewport } from '@radix-ui/react-select'

export interface ContentFormHandle {
  submit: () => Promise<Content>
}

export interface ContentFormProps {
  content?: Content
}

const ContentForm = forwardRef<ContentFormHandle, ContentFormProps>(
  ({ content }: ContentFormProps, ref) => {
    const [categories, setCategories] = useState<Category[]>([])

    const formSchema = z.object({
      title: z
        .string({
          required_error: '请输入标题'
        })
        .min(2, '标题长度在 2 至 1000 个字符之间')
        .max(64, '标题长度在 2 至 1000 个字符之间'),
      categoryId: z
        .string({
          required_error: '请选择分类'
        })
        .min(1, '请选择分类'),
      content: z
        .string({
          required_error: '请输入内容'
        })
        .min(1, '正文不能为空')
        .max(9999, '正文最大长度为 9999')
    })

    formSchema.required({
      title: true,
      categoryId: true,
      content: true
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: content?.title || '',
        content: content?.content || '',
        categoryId: content && content?.categoryId ? content.categoryId.toString() : ''
      }
    })

    useEffect(() => {
      window.api.findAllCategory().then((result: Category[]) => {
        setCategories(result)
      })
    }, [])

    useEffect(() => {
      if (content) {
        form.reset({
          title: content?.title || '',
          content: content?.content || '',
          categoryId: content && content?.categoryId ? content.categoryId.toString() : ''
        })
      }
    }, [content])

    const submit = (): Promise<Content> => {
      return new Promise<Content>((resolve) => {
        form.handleSubmit((values: z.infer<typeof formSchema>) => {
          const data: Content = {
            ...values,
            categoryId: parseInt(values.categoryId)
          }

          if (content && content.id) {
            data.id = content.id
          }

          if (content && content.createAt) {
            data.createAt = content.createAt
          }

          resolve(data)
        })()
      })
    }

    useImperativeHandle(ref, () => ({
      submit: submit
    }))

    return (
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectViewport>
                      {categories.map((category) => {
                        return (
                          <SelectItem key={'category_' + category.id} value={category.id + ''}>
                            {category.name}
                          </SelectItem>
                        )
                      })}
                    </SelectViewport>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <Textarea placeholder="请输入正文" className="resize-none" rows={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }
)

export default ContentForm
