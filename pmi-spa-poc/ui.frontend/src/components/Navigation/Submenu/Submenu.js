import React, { Component } from 'react';

require('./Submenu.css');

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySubMenu: false
    };
  }

 componentDidMount() {
    /*
    if(this.props.items.length > 0) {
      this.submenu = this.props.items.map(item) => (
        <li>
          <div>{item.name}</div>
        </li>
      );
    }
    */
    console.log('SUB', this.submenu);
  }

  render() {
    console.log('THIS props?', this.props.items);
    return (
        <div className="submenu" >
          <div class="left">
            <ul>
              {this.props.items.map(({ id, name, subName }) => (
                <li>
                  <div>{name}</div>
                  <div className="subname">{subName}</div>
                </li>
              ))}
            </ul>
          </div>
          <div class="right">
            image
          </div>
        </div>
    );
  }
}

export default Submenu;
