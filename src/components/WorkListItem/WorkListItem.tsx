import * as React from 'react'
import { Work, Language } from '@/modules/home/reducer'
import compose from 'recompose/compose'
import './WorkListItem.css'
import LanguageIcon from '@/components/LanguageIcon/LanguageIcon'
import { HomeDispatchFromProps, HomeOwnProps } from '@/components/Home/Home'
import { onlyUpdateForKeys, withHandlers } from 'recompose'

export interface WorkListItemProps {
  work: Work
  updateTargetWork: (payload: Work) => any
  updateCircle: HomeDispatchFromProps['updateCircle']
  languages: Language[]
  history: HomeOwnProps['history']
}

export interface WithHandlers {
  handleClick: () => any
}

export interface WorkListItemPropsWithCompose
  extends WorkListItemProps,
    WithHandlers {}

export function getLanguage(
  id: number,
  { languages }: { languages: Language[] },
): Language | undefined {
  return languages.find(l => l.id === id)
}

export function handleClick(
  e: React.SyntheticEvent<EventTarget>,
  props: WorkListItemProps,
): void {
  const { updateCircle, history, work } = props

  const nativeEvent: any = e.nativeEvent
  const { pageX, pageY } = nativeEvent

  const marginTop = 130
  const circleStyle = {
    top: `${pageY - (marginTop + 50)}px`,
    left: `${pageX - 50}px`,
  }

  updateCircle(circleStyle)

  history.push({
    pathname: `/works/${work.id}`,
    state: { fromWorkListItem: true },
  })
}

export const enhance = compose<WorkListItemPropsWithCompose, WorkListItemProps>(
  withHandlers({
    handleClick: (props: WorkListItemProps) => (
      event: React.SyntheticEvent<EventTarget>,
    ) => handleClick(event, props),
  }),
  onlyUpdateForKeys(['work', 'updateTargetWork', 'updateCircle', 'history']),
)

export const WorkListItem = (
  props: WorkListItemPropsWithCompose,
): JSX.Element => {
  const { work } = props

  const languageIcons = work.languages.map(l => {
    const language = getLanguage(l, props)
    return language ? <LanguageIcon language={language} key={l} /> : null
  })

  return (
    <div className="work-list-item">
      <div className="work-list-item-Card">
        <img
          src={work.img}
          onClick={props.handleClick}
          className="work-list-item-Card_Img"
        />

        <div className="work-list-item-Card_Desc">
          <h3 className="work-list-item-Card_DescHeading">{work.title}</h3>
          <p className="work-list-item-Card_DescSubHeading">
            {work.description}
          </p>

          <div className="work-list-item-TechList">{languageIcons}</div>
        </div>
      </div>
    </div>
  )
}

export default enhance(WorkListItem)
