import React, { Component } from 'react';

require('./Submenu.css');

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldLabels: []
    };
  }

  openSubMenu = (fieldLabel) => {
    this.setState(() => ({
      fieldLabels: fieldLabel,
    }));

  }

  render() {
    return (
        <div className="submenu" >
          <div className="content">
            <div class="left">
              <ul>
                {this.props.items.map(({boldtext, boldText, shorttext, fieldLabel }) => (
                  <li onClick={(e) => this.openSubMenu(fieldLabel, e)}>
                    { fieldLabel && <div className="arrowRight"><img src="/etc.clientlibs/pmi-spa-poc/clientlibs/clientlib-react/resources/arrowRight.svg" alt="logo"></img></div>}
                    { boldtext && <div className="bold-text">{boldtext}</div>}
                    { boldText && <div className="bold-text">{boldText}</div>}
                    <span className={boldtext || boldText ? '' : 'shortLink'} >{shorttext}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="center">
              { this.state.fieldLabels &&
                <ul>
                  {this.state.fieldLabels.map(({boldtext, plaintext, teaserImagePath }) => (
                    <li>
                      { teaserImagePath && <div className="small-image"><img src={ teaserImagePath._authorUrl } alt="iqos"></img></div>}
                      { boldtext && <div className="bold-text no-background">{boldtext}</div>}
                      <span>{plaintext}</span>
                    </li>
                  ))}
                </ul> }
            </div>
            <div class="right">
              <div>
                { this.props.teaser && <img src={ this.props.teaser.teaserImagePath._authorUrl } width="300px" alt="teaser" />}
              </div>
              <div>
                <h2>{this.props.teaser && this.props.teaser.boldtext}</h2>
              </div>
              <p>{this.props.teaser && this.props.teaser.plaintext}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default Submenu;
