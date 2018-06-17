import * as React from 'react'
import WorkContentLoader from '@/workContentLoader'

import './WorkDetailContent.css'
import { Work } from '@/modules/home/reducer'
import { onlyUpdateForKeys, withHandlers } from 'recompose'
import compose from 'recompose/compose'

export interface WorkDetailContentProps {
  updateWorkContentImg: (workContentImg: string) => void
  targetWork: Work | null
}

export interface WorkDetailContentWithHandlers {
  handleIntersection: () => any
}

export function handleIntersection(
  entry: IntersectionObserverEntry,
  props: WorkDetailContentProps,
): void {
  if (entry.isIntersecting) {
    const src = entry.target.getAttribute('data-src')
    if (src) props.updateWorkContentImg(src)
  }
}

export const enhance = compose<
  WorkDetailContentProps & WorkDetailContentWithHandlers,
  WorkDetailContentProps
>(
  withHandlers({
    handleIntersection: (props: WorkDetailContentProps) => (
      entry: IntersectionObserverEntry,
    ) => handleIntersection(entry, props),
  }),
  onlyUpdateForKeys(['targetWork']),
)

export const WorkDetailContentComponent = (
  props: WorkDetailContentProps & WorkDetailContentWithHandlers,
): JSX.Element | null => {
  if (!props.targetWork) return null

  const Component = WorkContentLoader[props.targetWork.component]

  return (
    <div className="markdown-body">
      <Component handleIntersection={props.handleIntersection} />
    </div>
  )
}

export const WorkDetailContentComponentEnhanced = enhance(
  WorkDetailContentComponent,
)

export default class WorkDetailContent extends React.PureComponent<
  WorkDetailContentProps,
  {}
> {
  constructor(props: WorkDetailContentProps) {
    super(props)
  }

  public render(): JSX.Element {
    return <WorkDetailContentComponentEnhanced {...this.props} />
  }
}
