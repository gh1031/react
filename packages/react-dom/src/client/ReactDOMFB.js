/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {findCurrentFiberUsingSlowPath} from 'react-reconciler/reflection';
import {getIsHydrating} from 'react-reconciler/src/ReactFiberHydrationContext';
import {get as getInstance} from 'shared/ReactInstanceMap';
import {addUserTimingListener} from 'shared/ReactFeatureFlags';

import ReactDOM from './ReactDOM';
import {isEnabled} from '../events/ReactBrowserEventEmitter';
import {getClosestInstanceFromNode} from './ReactDOMComponentTree';

Object.assign(
  (ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any),
  {
    // These are real internal dependencies that are trickier to remove:
    ReactBrowserEventEmitter: {
      isEnabled,
    },
    ReactFiberTreeReflection: {
      findCurrentFiberUsingSlowPath,
    },
    ReactDOMComponentTree: {
      getClosestInstanceFromNode,
    },
    ReactInstanceMap: {
      get: getInstance,
    },
    // Perf experiment
    addUserTimingListener,

    getIsHydrating,
  },
);

// TODO: These are temporary until we update the callers downstream.
ReactDOM.unstable_createRoot = ReactDOM.createRoot;
ReactDOM.unstable_createSyncRoot = ReactDOM.createSyncRoot;
ReactDOM.unstable_interactiveUpdates = (fn, a, b, c) => {
  ReactDOM.unstable_flushDiscreteUpdates();
  return ReactDOM.unstable_discreteUpdates(fn, a, b, c);
};

export default ReactDOM;
