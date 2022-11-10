import React, { Component } from 'react';

require('./MainMenu.css');

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySubMenu: false
    };
  }
  
  mainMenu = this.props.items.map((item) =>
    <li>
      <div onClick={(e) => this.props.clickCallback(item.id, e)}>{item._metadata.stringMetadata[0].value}</div>
    </li>
  );

  render() {
    return (
        <>
          {this.props.items.map(({id, _metadata}) => (
            <li>
              <div onClick={(e) => this.props.clickCallback(id, e)}>{_metadata.stringMetadata[0].value}</div>
            </li>
          ))}
        </>
    );
  }
}

export default MainMenu;
