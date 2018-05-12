import types from '@/reducers/home/action-types';
import sampleImg from '@/static/images/sample.jpeg';

const WORK_CONTENT = `
## EC Website

This is a copy website of NIKE.com, which is developed by Vue.js, 
Ruby on Rails and GraphQL.

Changes are automatically rendered as you type.

- Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Renders actual, "native" React DOM elements
- Allows you to escape or skip HTML (try toggling the checkboxes above)
- If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal

## EC Website

This is a copy website of NIKE.com, which is developed by Vue.js, 
Ruby on Rails and GraphQL.

Changes are automatically rendered as you type.

- Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Renders actual, "native" React DOM elements
- Allows you to escape or skip HTML (try toggling the checkboxes above)
- If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`;

/* interfaces */
export interface IWork {
  id: number;
  title: string;
  description: string;
  img: string;
}

export interface IHomeState {
  works: IWork[];
  workContent: string;
  workContentImg: string;
  isShowOverlay: boolean;
  isShowWorksContent: boolean;
  isShowWorksContentAnimation: boolean;
  circleStyle: any;
}

/* reducer */
const initialState: IHomeState = {
  works: Array.apply(null, new Array(21)).map((_: null, i: number) => ({
    id: i + 1,
    title: 'EC Website',
    description: `
        I’ve been a CMT for ten years now, and I have, literally and
        figuratively, held the pulse of a steaming cross-section of
        San Franciscans
      `,
    img: sampleImg
  })),
  workContent: WORK_CONTENT,
  workContentImg: sampleImg,
  isShowOverlay: false,
  isShowWorksContent: false,
  isShowWorksContentAnimation: false,
  circleStyle: {},
};

export default function home(state: IHomeState = initialState, action: any ) {
  switch (action.type) {
    case types.TOGGLE_OVERLAY:
      const { isShowOverlay } = action;
      return { ...state, isShowOverlay };

    case types.TOGGLE_WORKS_CONTENT:
      const { isShowWorksContent } = action;
      return { ...state, isShowWorksContent };

    case types.TOGGLE_WORKS_CONTENT_ANIMATION:
      const { isShowWorksContentAnimation } = action;
      return { ...state, isShowWorksContentAnimation };

    case types.UPDATE_CIRCLE:
      const { circleStyle } = action;
      return { ...state, circleStyle };

    default:
      return state;
  }
}
