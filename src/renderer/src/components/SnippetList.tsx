import React, { useEffect } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { cn } from '@renderer/utils/utils'
import { Content } from '@main/db/entites/content'
import { formatDate } from '@renderer/utils/datetime'
import { Outlet, useParams } from 'react-router-dom'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
import { useStore } from '@renderer/store'
import ContentToolbar from './config/ContentToolbar'
import useContent from '@renderer/hooks/useContent'
import { parseNumber } from '@renderer/utils/string'
import Spnning from './Spnning'
import { INVALID_ID } from '@renderer/utils/const'

export interface SnippetListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddClick?: () => void
  onEditClick?: (c: Content) => void
  onDeleteClick?: (c: Content) => void
}

export default function SnippetList() {
  const { cid } = useParams()
  const { contentChangeState } = useStore((state) => ({
    contentChangeState: state.contentChangeState,
    setContentChangeState: state.setContentChangeState
  }))

  const {
    contents,
    getContents,
    activeId,
    setActiveId,
    updateCateoryParamsAndFetch,
    onContentClick,
    loading,
    onAddContent,
    onDeleteContent
  } = useContent({ cid: parseNumber(cid || INVALID_ID + '') })

  useEffect(() => {
    setActiveId(INVALID_ID)
    updateCateoryParamsAndFetch(parseNumber(cid || INVALID_ID + ''))
  }, [cid])

  useEffect(() => {
    if (contentChangeState.flag) {
      setActiveId(contentChangeState.id || INVALID_ID)
      getContents()
    }
  }, [contentChangeState])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <div className="w-full h-full px-2 flex flex-col justify-between">
          {loading && (
            <div className="w-full flex flex-row justify-center py-2">
              <Spnning title="loading" />
            </div>
          )}
          {!loading && (
            <ScrollArea className="shrink-0 flex-1 h-0 rounded-md">
              <div className="w-full flex flex-col gap-y-2">
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
          )}

          {/* Toolbar */}
          <ContentToolbar
            showEdit={false}
            onAddClick={() => onAddContent()}
            addDisable={!cid || cid === INVALID_ID + ''}
            editDisable={!activeId || activeId === INVALID_ID}
            deleteDisable={!activeId || activeId === INVALID_ID}
            onDeleteClick={() => onDeleteContent(activeId || INVALID_ID)}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
