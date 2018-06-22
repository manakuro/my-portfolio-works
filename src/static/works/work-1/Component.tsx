import IntersectionObserver from '@researchgate/react-intersection-observer'
import * as React from 'react'
import pure from 'recompose/pure'

import sampleImg from './images/sample.jpeg'
import sampleImg2 from './images/sample2.jpeg'
import sampleImg3 from './images/sample3.gif'

interface WorkOneProps {
  handleIntersection: (entry: IntersectionObserverEntry) => any
}

const WorkOne: React.ComponentType<WorkOneProps> = pure(
  (props): JSX.Element => {
    const { handleIntersection } = props

    return (
      <div className="markdown-body">
        <IntersectionObserver onChange={handleIntersection}>
          <h2 data-src={sampleImg3}>About Me</h2>
        </IntersectionObserver>
        <p>
          I am Manato Kuroda based in Tokyo, Japan. I am a web developer and a
          designer working as a freelancer. I want to introduce myself through
          this website and to show my skillsets and my inspirations. I had
          already made <a href="http://manato.ca">my portfolio</a> before while
          I was in Canada but it's more focusing on my skills.
        </p>

        <p>
          I have a wide-ranging subset of the following skills, such as Angular,
          Vue.js, React and Ruby on Rails so on, but more importantly I love to
          constantly learn and experiment new techs as grow fast. So I hope you
          find my works interesting and get some inspirations.
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

        <IntersectionObserver onChange={handleIntersection}>
          <h2 data-src={sampleImg}>More info?</h2>
        </IntersectionObserver>

        <p>
          Read usage information and more on{' '}
          <a href="//github.com/rexxars/react-markdown">GitHub</a>
        </p>
        <hr />
        <p>
          A component by <a href="http://vaffel.ninja">VaffelNinja</a> / Espen
          Hovlandsdal
        </p>
        <h2>EC Website</h2>
        <p>
          This is a copy website of NIKE.com, which is developed by Vue.js, Ruby
          on Rails and GraphQL.
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
