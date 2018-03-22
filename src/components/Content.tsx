import * as React from 'react'

export interface PageContent {
  content: string
  className: string
}

export const Content = (pageContent: PageContent) => (
  <div className={pageContent.className}>{pageContent.content}</div>
)
export const HTMLContent = (pageContent: PageContent) => (
  <div className={pageContent.className} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
)
