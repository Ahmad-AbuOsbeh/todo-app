import React, { Component } from 'react';
export const SettingsContext = React.createContext();

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //context settings
      itemsPerPage: 2,
      sortCat: 'hardest',
      showCompleted: false,
    };
  }

  render() {
    return <SettingsContext.Provider value={this.state}>{this.props.children}</SettingsContext.Provider>;
  }
}
