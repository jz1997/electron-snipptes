import ContentTab from '@renderer/components/config/ContentTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Toaster } from '@renderer/components/ui/toaster'

// Config Page
export default function Config() {
  return (
    <div className="w-screen h-screen bg-white p-4">
      <Tabs defaultValue="content" className="w-full h-full flex flex-col">
        <div className="h-12 flex items-center">
          <TabsList>
            <TabsTrigger value="content">内容</TabsTrigger>
            <TabsTrigger value="shortcut">快捷键</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="w-full flex-1 h-0" value="content">
          <ContentTab />
        </TabsContent>
        <TabsContent value="shortcut">Change your password here.</TabsContent>
      </Tabs>

      <Toaster />
    </div>
  )
}
