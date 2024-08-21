import { Tabs, TabsContent, TabsList, TabsTrigger } from "@renderer/components/ui/tabs";

// Config Page
export default function Config() {
  return (
    <div className="w-full bg-white p-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">笔记</TabsTrigger>
          <TabsTrigger value="password">快捷键</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
