import React, { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import InputButtonGroup from './InputButtonGroup'
import OperationDropMenu from './OperationDropMenu'
import { Content } from '@main/db/entites/content'
import moment from 'moment'
import { formatDate } from '@renderer/utils/datetime'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Result } from '@main/db/entites/common'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
import { Category } from '@main/db/entites/category'
import { useStore } from '@renderer/store'

export interface SnippetListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
  onEditClick?: (c: Content) => void
  onDeleteClick?: (c: Content) => void
}

export default function SnippetList({
  onSearch = (_e) => {},
  onAddClick = () => {},
  onEditClick = () => {},
  onDeleteClick = () => {},
  className,
  ...props
}: SnippetListProps) {
  const [contents, setContents] = useState<Content[]>([])
  const [activeId, setActiveId] = useState<number | bigint | undefined>(0)
  const { cid } = useParams()
  const navigate = useNavigate()
  const { articleUpdateFlag, setArticleUpdateFlag } = useStore((state) => ({
    articleUpdateFlag: state.articleUpdateFlag,
    setArticleUpdateFlag: state.setArticleUpdateFlag
  }))

  useEffect(() => {
    setActiveId(0)
    getContents()
  }, [cid])

  useEffect(() => {
    if (articleUpdateFlag) {
      getContents()
    }
    return () => setArticleUpdateFlag(false)
  }, [articleUpdateFlag])

  const getContents = () => {
    const params = new Map<string, any>()
    if (cid != '-1') {
      params.set('categoryId', cid)
    }

    window.api.findAllContent(params).then((result: Result<Content[]>) => {
      if (result.success && result.data) {
        setContents(result.data)
      }
    })
  }

  const onContentClick = (c: Content) => {
    setActiveId(c.id)
    navigate(`/config/content/categories/${cid}/contents/${c.id}`)
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <div className="w-full h-full px-2">
          <ScrollArea className="shrink-0 w-full h-full rounded-md">
            <div className="w-full">
              {contents.map((snippet) => (
                <div
                  className={cn('w-full flex flex-row justify-between items-center gap-x-2')}
                  key={'content_' + snippet.id}
                  onClick={() => onContentClick(snippet)}
                >
                  <div
                    className={cn(
                      'text-sm cursor-pointer flex justify-between items-center gap-x-2 hover:bg-slate-200 px-2 py-2 rounded-md flex-1 w-0',
                      {
                        'bg-slate-200': activeId === snippet.id
                      }
                    )}
                  >
                    <span className="truncate">{snippet.title}</span>
                    <span className="text-xs text-gray-700">
                      {formatDate(snippet.createAt, 'YYYY/MM/DD')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
