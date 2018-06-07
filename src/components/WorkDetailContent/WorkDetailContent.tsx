import * as React from 'react'
import WorkContentLoader from '@/workContentLoader'

import './WorkDetailContent.css'
import { Work } from '@/modules/home/reducer'

export interface WorkDetailContentProps {
  updateWorkContentImg: (workContentImg: string) => void
  targetWork: Work | null
}

export default class WorkDetailContent extends React.PureComponent<
  WorkDetailContentProps,
  {}
> {
  constructor(props: WorkDetailContentProps) {
    super(props)
  }

  public render(): JSX.Element | null {
    console.log('this.props.targetWork', this.props.targetWork)
    if (!this.props.targetWork) return null

    const Component = WorkContentLoader[this.props.targetWork.component]

    return (
      <div className="markdown-body">
        <Component handleIntersection={this.handleIntersection} />
      </div>
    )
  }

  private handleIntersection = (entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      const src = entry.target.getAttribute('data-src')
      if (src) this.props.updateWorkContentImg(src)
    }
  }
}
