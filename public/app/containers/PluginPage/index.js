/*
 *
 * PluginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createSelector } from 'reselect';
import { selectPlugins } from 'containers/App/selectors';

export class PluginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Helmet
          title="Strapi - Plugin"
          meta={[
            { name: 'description', content: 'Description of PluginPage' },
          ]}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

PluginPage.propTypes = {
  plugins: React.PropTypes.object,
};

const mapStateToProps = createSelector(
  selectPlugins(),
  (plugins) => ({ plugins })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PluginPage);
