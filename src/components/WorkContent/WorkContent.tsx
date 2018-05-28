import * as React from 'react'
import WorkContentLoader from '@/workContentLoader'

import './WorkContent.css'
import { Work } from '@/modules/home/reducer'

interface WorkProps {
  updateWorkContentImg: (workContentImg: string) => void
  targetWork: Work | null
}

export default class WorkContent extends React.PureComponent<WorkProps, {}> {
  constructor(props: WorkProps) {
    super(props)
  }

  public render(): JSX.Element | null {
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
