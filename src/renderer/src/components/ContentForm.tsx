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
import { Content } from '@main/db/entites/content'
import { useToast } from '@renderer/components/ui/use-toast'
import { Toaster } from '@renderer/components/ui/toaster'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Textarea } from '@renderer/components/ui/textarea'
import { Category } from '@main/db/entites/category'
import { useEffect, useState } from 'react'
import { SelectViewport } from '@radix-ui/react-select'

export interface ContentFormProps {
  content?: Content
  onSubmit?: (values: any) => void
  onCancel?: () => void
}

export default function ContentForm({
  content,
  onSubmit = (v) => {},
  onCancel = () => {}
}: ContentFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [filterCategoryName, setFilterCategoryName] = useState('')

  const naviagte = useNavigate()
  const { toast } = useToast()
  const formSchema = z.object({
    title: z
      .string({
        required_error: '请输入标题'
      })
      .min(2, '标题长度在 2 至 1000 个字符之间')
      .max(64, '标题长度在 2 至 1000 个字符之间'),
    categoryId: z.string({
      required_error: '请选择分类'
    }),
    content: z.string({
      required_error: '请输入内容'
    })
  })

  formSchema.required({
    title: true,
    categoryId: true,
    content: true
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(content || {
        id: null,
        title: '',
        content: ''
      }),
      categoryId: content && content.categoryId ? content.categoryId.toString() : ''
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
        ...content,
        categoryId: content.categoryId ? content.categoryId.toString() : ''
      })
    }
  }, [content])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      categoryId: values.categoryId ? parseInt(values.categoryId) : ''
    }
    // 编辑
    if (content && content.id) {
      data['id'] = content.id
    }

    onSubmit(data)
  }

  const goBack = () => {
    naviagte(-1)
  }
  return (
    <div className="p-4">
      <div className="border rounded-md p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                    <Textarea
                      placeholder="请输入正文"
                      className="resize-none"
                      rows={6}
                      {...field}
                    />
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

      {/* Toast */}
      <Toaster />
    </div>
  )
}
