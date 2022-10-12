import React, { Component } from 'react';
import Submenu from './Submenu/Submenu';

require('./Navigation.css');

const menu = [
  {
    id: 1,
    name: "About IQOS",
    subName: "",
    style:"primary",
    position: "left",
    url: "",
    image:"",
    title:"Title txt",
    description:"descr",
    sub:[
      {
        id: 8,
        name: "What is IQOS",
        subName: "Discover the world of IQOS",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      },
      {
        id: 9,
        name: "What is heated tobacco?",
        subName: "Benefits, Functionality and Technology",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      }
    ]
  },
  {
    id: 2,
    name: "Shop",
    subName: "",
    style:"primary",
    position: "left",
    url: "",
    image:"",
    title:"For all who want to try first.",
    description:"Try IQOS now at home for free.",
    sub:[
      {
        id: 5,
        name: "IQOS 3 DUO",
        subName: "Our best alternative",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"For all who want to try first.",
        description:"Try IQOS now at home for free.",
        sub:[]
      },
      {
        id: 6,
        name: "HEETS Sticks",
        subName: "",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      },
      {
        id: 7,
        name: "Accessories",
        subName: "",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      }
    ]
  },
  {
    id: 3,
    name: "myIQOS",
    subName: "",
    style:"primary",
    position: "left",
    url: "",
    image:"",
    title:"Enjoy privileges",
    description:"Discover IQOS Club and our referral program",
    sub:[
      {
        id: 10,
        name: "Discover myIQOS",
        subName: "Care and privileges",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      },
      {
        id: 11,
        name: "Try IQOS",
        subName: "",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      },
      {
        id: 12,
        name: "Get support",
        subName: "",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      },
      {
        id: 13,
        name: "Enjoy privileges",
        subName: "",
        style:"primary",
        position: "",
        url: "",
        image:"",
        title:"",
        description:"",
        sub:[]
      }
    ]
  },
  {
    id: 4,
    name: "Support",
    subName: "",
    style:"primary",
    position: "right",
    url: "",
    image:"",
    title:"3x HEETS for free.",
    description:"Get it now for your first device and every further newly purchased device (as long as there are less than 5 devices in your profile).",
    sub:[]
  },
];


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      displaySubMenu: false,
      submenu: {}
    };
  }

  handleClickOutside(event) {  
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.setState(() => ({
        displaySubMenu: false,
      }));
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  };

  openSubMenu = (id) => {
    let selected = menu.find(function(e) {
      return e.id === id;
    });
    this.setState(() => ({
      displaySubMenu: true,
      submenu: selected.sub
    }));
  }

  mainMenuLeft = menu.filter(item => item.position === "left").map((item) =>
    <li>
      <div onClick={(e) => this.openSubMenu(item.id, e)}>{item.name}</div>
      <div className="subname">{item.subName}</div>
    </li>
  );

  mainMenuRight = menu.filter(item => item.position === "right").map((item) =>
    <li>
      <a href={item.url}>{item.name}</a>
    </li>
  );

  render() {
    return (
      <div ref={this.ref}>
        <div className="navigation" >
          <div class="left">
            <ul>{this.mainMenuLeft}</ul>
          </div>
          <div class="right">
            <ul>{this.mainMenuRight}</ul>
          </div>
        </div>
        { this.state.displaySubMenu && <Submenu items={this.state.submenu} /> }
      </div>
    );
  }
}

export default Navigation;
