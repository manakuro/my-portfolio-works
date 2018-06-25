import IntersectionObserver from '@researchgate/react-intersection-observer'
import * as React from 'react'
import pure from 'recompose/pure'

import sampleImg from './images/sample.jpeg'
import sampleImg2 from './images/sample2.jpeg'
import aboutMeImg from './images/manato.jpg'
import structureImg from './images/create-react-app-typescript.jpg'

interface WorkOneProps {
  handleIntersection: (entry: IntersectionObserverEntry) => any
}

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
          This is mainly build with React and Typescript. Redux and
          Redux-observable are used for state management. I introduce recompose
          for most components because I personally prefer to Functional
          Programming and want to make them as much stateless as possible for
          easily maintainable and testable code.
        </p>

        <p>
          I basically follow{' '}
          <a
            href="https://github.com/piotrwitek/react-redux-typescript-guide"
            target="_blank"
          >
            react-redux-typescript-guide
          </a>{' '}
          to develop it.
        </p>

        <h2>Testing</h2>

        <ul>
          <li>Jest</li>
          <li>Enzyme</li>
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

        <p>Changes are automatically rendered as you type.</p>
        <ul>
          <li>
            Implements{' '}
            <a href="https://github.github.com/gfm/">
              GitHub Flavored Markdown
            </a>
          </li>
          <li>Renders actual, "native" React DOM elements</li>
          <li>
            Allows you to escape or skip HTML (try toggling the checkboxes
            above)
          </li>
          <li>
            If you escape or skip the HTML, no{' '}
            <code>dangerouslySetInnerHTML</code> is used! Yay!
          </li>
        </ul>
        <h2>HTML block below</h2>
        <div>
          &ltblockquote&gt This blockquote will change based on the HTML
          settings above. &lt/blockquote&gt
        </div>
        <h2>How about some code?</h2>
        <pre>
          <code className="language-js">
            var React = require('react') var Markdown =
            require('react-markdown') React.render( &ltMarkdown source="# Your
            markdown here" /&gt, document.getElementById('content') )
          </code>
        </pre>
        <p>Pretty neat, eh?</p>
        <h2>Tables?</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tables</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>alignment</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>wewt</td>
              <td>✔</td>
            </tr>
          </tbody>
        </table>

        <h2>More info?</h2>
        <p>
          Read usage information and more on{' '}
          <a href="//github.com/rexxars/react-markdown">GitHub</a>
        </p>
        <hr />
        <p>
          A component by <a href="http://vaffel.ninja">VaffelNinja</a> / Espen
          Hovlandsdal
        </p>

        <IntersectionObserver onChange={handleIntersection} threshold={1}>
          <div data-src={sampleImg}>
            <h2>EC Website</h2>
            <p>
              This is a copy website of NIKE.com, which is developed by Vue.js,
              Ruby on Rails and GraphQL.
            </p>
            <p>Changes are automatically rendered as you type.</p>
            <ul>
              <li>
                Implements{' '}
                <a href="https://github.github.com/gfm/">
                  GitHub Flavored Markdown
                </a>
              </li>
              <li>Renders actual, "native" React DOM elements</li>
              <li>
                Allows you to escape or skip HTML (try toggling the checkboxes
                above)
              </li>
              <li>
                If you escape or skip the HTML, no{' '}
                <code>dangerouslySetInnerHTML</code> is used! Yay!
              </li>
            </ul>
          </div>
        </IntersectionObserver>

        <h2>HTML block below</h2>
        <div>
          &ltblockquote&gt This blockquote will change based on the HTML
          settings above. &lt/blockquote&gt
        </div>
        <h2>How about some code?</h2>
        <pre>
          <code className="language-js">
            var React = require('react') var Markdown =
            require('react-markdown') React.render( &ltMarkdown source="# Your
            markdown here" /&gt, document.getElementById('content') )
          </code>
        </pre>
        <p>Pretty neat, eh?</p>
        <h2>Tables?</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tables</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>alignment</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>wewt</td>
              <td>✔</td>
            </tr>
          </tbody>
        </table>
        <h2>More info?</h2>
        <p>
          Read usage information and more on{' '}
          <a href="//github.com/rexxars/react-markdown">GitHub</a>
        </p>
        <hr />
        <IntersectionObserver onChange={handleIntersection}>
          <p data-src={sampleImg2}>
            A component by <a href="http://vaffel.ninja">VaffelNinja</a> / Espen
            Hovlandsdal
          </p>
        </IntersectionObserver>
      </div>
    )
  },
)

export default WorkOne
