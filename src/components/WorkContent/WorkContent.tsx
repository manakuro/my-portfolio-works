import IntersectionObserver from '@researchgate/react-intersection-observer';
import * as React from 'react';

import './WorkContent.css';

import sampleImg from '@/static/images/sample.jpeg';
import sampleImg2 from '@/static/images/sample2.jpeg';
import sampleImg3 from '@/static/images/sample3.gif';

interface IWorkProps {
  content: string;
  updateWorkContentImg: (workContentImg: string) => any;
}

export default class WorkContent extends React.PureComponent<IWorkProps, {}> {
  constructor(props: IWorkProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="markdown-body">
        <IntersectionObserver onChange={this.handleIntersection}>
          <h2 data-src={sampleImg3}>EC Website</h2>
        </IntersectionObserver>
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
          &lt;blockquote&gt; This blockquote will change based on the HTML
          settings above. &lt;/blockquote&gt;
        </div>
        <h2>How about some code?</h2>
        <pre>
          <code className="language-js">
            var React = require('react'); var Markdown =
            require('react-markdown'); React.render( &lt;Markdown source="# Your
            markdown here" /&gt;, document.getElementById('content') );
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

        <IntersectionObserver onChange={this.handleIntersection}>
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
          &lt;blockquote&gt; This blockquote will change based on the HTML
          settings above. &lt;/blockquote&gt;
        </div>
        <h2>How about some code?</h2>
        <pre>
          <code className="language-js">
            var React = require('react'); var Markdown =
            require('react-markdown'); React.render( &lt;Markdown source="# Your
            markdown here" /&gt;, document.getElementById('content') );
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
        <IntersectionObserver onChange={this.handleIntersection}>
          <p data-src={sampleImg2}>
            A component by <a href="http://vaffel.ninja">VaffelNinja</a> / Espen
            Hovlandsdal
          </p>
        </IntersectionObserver>
      </div>
    );
  }

  private handleIntersection = (entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      const src = entry.target.getAttribute('data-src');
      if (src) this.props.updateWorkContentImg(src);
    }
  };
}
