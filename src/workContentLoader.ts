import loadable from 'loadable-components'
import * as React from 'react';

interface Loadable<T> extends React.ComponentClass<T> {
  Component: React.ComponentClass;
  loadingPromise: Promise<any>;
  load(): Promise<any>;
}

interface ComponentProps {
  [key: string]: any
}

const components: { [key: string]: Loadable<ComponentProps> } = {
  WorkOne: loadable(() => import('@/static/works/one/Component'))
};


export default components;
