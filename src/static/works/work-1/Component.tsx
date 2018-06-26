import IntersectionObserver from '@researchgate/react-intersection-observer'
import * as React from 'react'
import pure from 'recompose/pure'

import aboutMeImg from './images/manato.jpg'
import structureImg from './images/create-react-app-typescript.jpg'

interface WorkOneProps {
  handleIntersection: (entry: IntersectionObserverEntry) => any
}

const code1 = `
import React from 'react';

const counter = (Component) => class extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            counter: 1,
        }
    }

    increment = () => {
        this.setState({ counter: this.state.counter + 1})
    }

    decrement = () => {
        this.setState({ counter: this.state.counter - 1 })
    }

    render() {
        return <Comopennt 
                {...this.props} 
                decrement={this.decrement} 
                increment={this.increment} />
    }
}

const CounterComponent = (props) => {
    <div>
        <h1>{props.counter}</h1>
        <button onClick={() => { props.increment() }}>increment</button>
        <button onClick={() => { props.decrement() }}>decrement</button>
    </div>
}

const EnhancedComponent = counter(CounterComponent);
export default () => (<EnhancedComponent />)
`

const code2 = `
import React from 'react'
import {compose, withState, withHandlers} from 'recompose'

const CounterComponent = (props) => (
    <div>
        <h1>{props.counter}</h1>
        <button onClick={() => { props.increment() }}>increment</button>
        <button onClick={() => { props.decrement() }}>decrement</button>
        <button onClick={() => { props.reset() }}>reset</button>
    </div>
);

const enhancer = compose(
    withState('counter', 'updateCounter', 5),
    withHandlers({
        increment: ({ updateCounter }) => () => updateCounter(counter => counter + 1),
        decrement: ({ updateCounter }) => () =>  updateCounter(counter => counter - 1),
        reset: ({ updateCounter }) => () => updateCounter(5)
    })
);

const EnhancedComponent = enhancer(CounterComponent);

export default () => (<EnhancedComponent />);
`

const code3 = `
const Enhancer = compose(
  withStateHandlers(
    ({
      name = 'hello',
      age = 1,
    }) => ({
      name,
      age,
    }),
    {
      update: (state) => (value) => {
        return { ...state, ...value };
      },
    },
  ),
  lifecycle({
    componentDidMount() {
      // you can use this context in lifecycle
      console.log(this.props.name)
      console.log(this.props.age)
    },
  }),
);
`

const code4 = `
const Enhancer = compose(
  withStateHandlers(
    ({
      name = 'hello',
      age = 1,
    }) => ({
      name,
      age,
    }),
    {
      update: (state) => (value) => {
        return { ...state, ...value };
      },
    },
  ),
);

const MyLifecycle = (Component) => class MyComponent extends React.Component {
    //….
    componentDidMount() {
        console.log(this.props.name)
        console.log(this.props.age)
    }

    render() {
        return <Component {...this.props}  />
    }
}

const Component = (props) => (
    <div>props.name</div>
)

const Enhanced = Enhancer(MyLifecycle(Component))
`

const WorkOne: React.ComponentType<WorkOneProps> = pure(
  (props): JSX.Element => {
    const { handleIntersection } = props

    return (
      <div className="markdown-body">
        <IntersectionObserver onChange={handleIntersection}>
          <h2 data-src={aboutMeImg}>About Me</h2>
        </IntersectionObserver>
        <p>
          I am Manato Kuroda based in Tokyo, Japan. I am a web developer and a
          designer working as a freelancer. I want to introduce myself through
          this website and to show my skillsets and my inspirations. I had
          already made{' '}
          <a href="http://manato.ca" target="_blank">
            my portfolio
          </a>{' '}
          before while I was in Canada but it's more focusing on my skills.
        </p>

        <p>
          I have a wide-ranging subset of the following skills, such as Angular,
          Vue.js, React and Ruby on Rails so on, but more importantly I love to
          constantly learn and experiment new techs as grow fast.
        </p>

        <h2>About This Website</h2>
        <p>
          The idea behind this portfolio is an attempt of experimenting new
          techs and brushing up my programming and design skills. You can see
          the list of programming languages in header and find a project with
          techs in which you’re interested . I expect this will also motivate me
          to keep trying brand new languages and bring some inspirations.
        </p>

        <p>
          After click on a project, the detail page will show up with slide
          animation. You can see the description of work in right side and see
          some pictures in left side related to the explanation on each
          paragraph. There is an expand icon on top right, by clicking on it you
          can read it on full screen mode.
        </p>

        <IntersectionObserver onChange={handleIntersection} threshold={1}>
          <div data-src={structureImg}>
            <h2>Structure</h2>
            <ul>
              <li>
                <strong>
                  <a
                    href="https://github.com/wmonk/create-react-app-typescript"
                    target="_blank"
                  >
                    React / Create react app typescript
                  </a>
                </strong>
                - React is a very popular JavaScript Dom rendering framework
                using a component-based architecture. Create React App
                Typescript is a tool built by developers at Facebook to help you
                build React applications with Typescript. You can simply run one
                command and create react app typescript sets up the tool and you
                start your React project soon.{' '}
              </li>
              <li>
                <strong>
                  <a href="https://www.typescriptlang.org/" target="_blank">
                    TypeScript
                  </a>
                </strong>
                - Typescript is a typed superset of JavaScript that compiles to
                plain JavaScript. Nowadays it has been very popular among
                Frontend developer. Angular 2 decided to adopt it.
              </li>
              <li>
                <strong>
                  <a href="https://redux.js.org/" target="_blank">
                    Redux
                  </a>
                </strong>
                - Redux is a state management tool for JavaScript. It helps you
                manage the data you display and how you respond to users
                actions. Redux was inspired by Flux and Elm. You can learn more
                about Flux and some of the challenges Facebook{' '}
                <a
                  href="https://www.youtube.com/watch?v=nYkdrAPrdcw&feature=youtu.be&list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v&t=621"
                  target="_blank"
                >
                  in this video
                </a>.
              </li>
              <li>
                <strong>
                  <a href="https://redux-observable.js.org/" target="_blank">
                    Redux-observable
                  </a>
                </strong>
                - Middleware is for Redux which can be used to handle
                asynchronous logic. It is based on RxJS
              </li>
              <li>
                <strong>
                  <a
                    href="https://github.com/acdlite/recompose"
                    target="_blank"
                  >
                    Recompose
                  </a>
                </strong>
                - A React utility for functional components and high-order
                components. It allows you to separate your logic from your
                components.
              </li>
              <li>
                <strong>
                  <a
                    href="https://aws.amazon.com/serverless/?nc1=h_ls"
                    target="_blank"
                  >
                    S3 + Route53 + CloudFront
                  </a>
                </strong>
                - Amazon Web Service provides these service for server less
                architecture.
              </li>
            </ul>
          </div>
        </IntersectionObserver>

        <p>
          This is a single page application with React and built as a serverless
          application with AWS S3, Route53 and CloudFront.
        </p>

        <p>
          I basically follow{' '}
          <a
            href="https://github.com/piotrwitek/react-redux-typescript-guide"
            target="_blank"
          >
            react-redux-typescript-guide
          </a>{' '}
          to develop it. Redux and Redux-observable are used for state
          management. I introduce recompose for most components because I
          personally prefer to Functional Programming and want to make them as
          much stateless as possible for easily maintainable and testable code.
        </p>

        <h3>recomposing</h3>

        <p>
          I created functional component with recompose instead of class based
          component. Recompose is varied, simple and specific-purpose functions
          and gives me more component reusability. I think it's great for
          handling higher order components to enhance functional components.
        </p>

        <p>Let's take a look at an example for Hoc component.</p>

        <p>Here's HoC with ES6</p>

        <pre>
          <code className="language-js">{code1}</code>
        </pre>

        <p>It's not bad actually but it could be improved.</p>

        <p>Here's with recompose</p>

        <pre>
          <code className="language-js">{code2}</code>
        </pre>

        <p>
          There is less code and looks simpler I guess. Recompose offers a
          collection of functions that themselves or return higher order
          components, so you can mix them or compose as you want. You can check
          out a bunch of functions{' '}
          <a href="https://github.com/acdlite/recompose/blob/master/docs/API.md">
            here
          </a>.
        </p>

        <h3>And how to deal with Lifecycle?</h3>

        <p>
          Recompose provides lifecycle() to access component lifecycle methods.
          Any state changes made in a lifecycle method, by using setState, will
          be propagated to the wrapped components as props.
        </p>

        <p>Examples:</p>

        <pre>
          <code className="language-js">{code3}</code>
        </pre>

        <p>
          All you need to is just to include lifecycle and write the lifecycle
          method inside. But{' '}
          <a href="https://github.com/istarkov">Ivan Starkov</a>, who is
          collaborator of recompose says{' '}
          <a href="https://github.com/acdlite/recompose/issues/653#issuecomment-383645282">
            here
          </a>:
        </p>

        <p>
          <em>
            I wrote that lifecycle is somehow a recompose mistake, you don't
            need it at all as it's easier to write ordinary class. Just write
            your HOC if you need it, it's very simple
          </em>
        </p>

        <p>
          Which you can write lifecycle methods in your HoC class component.
        </p>

        <pre>
          <code className="language-js">{code4}</code>
        </pre>

        <h2>Testing</h2>

        <ul>
          <li>
            <strong>
              <a href="http://jestjs.io/" target="_blank">
                Jest
              </a>
            </strong>
            - Jest is used by Facebook to test all JavaScript code including
            React applications.
          </li>

          <li>
            <strong>
              <a href="https://github.com/airbnb/enzyme" target="_blank">
                Enzyme
              </a>
            </strong>
            - Enzyme is a JavaScript Testing utility for React that makes it
            easier to assert, manipulate, and traverse your React Components'
            output.
          </li>
        </ul>

        <p>
          As I see it, Jest is a powerful tool for unit tests. I find myself
          comfortable writing tests with easily mock function to ensure the
          function is invoked as expected.
        </p>

        <p>
          I highly recommend writing test for maintainable code. I think testing
          is all about development velocity and project robustness. If you have
          to change something, you would probabbly have the frightening thoughts
          of "breaking something?" but if your app is test covered, these
          thoughts don't exist.
        </p>
        <p>
          And another reason for that is if you find yourself uncomfortable
          writing your tests and feel pain in the ass, your code might be
          something bad. That would have too much context or would be too
          dependent on other modules or classes. Decoupling would be needed.
          Writing tests saves your time and helps you write an awesome code.
        </p>

        <h2>Summary</h2>

        <p>
          Having launched the project, there is a lot to be done straight off
          the cuff design wise so I will be updating! I hope you find my works
          interesting and get some inspirations.
        </p>
      </div>
    )
  },
)

export default WorkOne
