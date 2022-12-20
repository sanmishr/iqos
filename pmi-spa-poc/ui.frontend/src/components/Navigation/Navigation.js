import React, {Component} from 'react';
import MainMenu from './MainMenu/MainMenu';
import Submenu from './Submenu/Submenu';

require('./Navigation.css');

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            displaySubMenu: false,
            displayMobileMenu: false,
            submenu: {},
            menu: [],
            teaser: {}
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
        Notification.requestPermission();
        document.addEventListener('click', this.handleClickOutside, true);
        this.fetchData();

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    };

    openSubMenu = (id) => {
        let selected = this.state.menu.find(function (e) {
            return e.id === id;
        });
        console.log('selected', selected);
        let submenu = [];
        if (selected.navigationmenu) submenu = submenu.concat(selected.navigationmenu);
        if (selected.pageswithoutsubnav) submenu = submenu.concat(selected.pageswithoutsubnav);
        this.setState(() => ({
            displaySubMenu: true,
            submenu: submenu,
            teaser: selected.teaser
        }));
    }

    fetchData = () => {
        return fetch('/graphql/execute.json/pmi-spa-poc/Navigation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log('RES', result.data.mainNavigationByPath.item);
                let menu = [];
                let id = 1;
                result.data.mainNavigationByPath.item.mainavigationsleft.forEach((element) => {
                    element.id = ++id;
                    element.position = 'left';
                    menu.push(element);
                });
                result.data.mainNavigationByPath.item.mainnavigationright.forEach((el) => {
                    el.id = ++id;
                    el.position = 'right';
                    menu.push(el);
                });

                this.setState(() => ({
                    menu: menu
                }));
            });
    }

    render() {
        return (
            <div ref={this.ref} className="navigation_wrapper">
                <div className="gray-overlay"></div>
                <div className="mobile-top">
                    <div className="left">
                        <div className="mobile-menu-btn">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="center">
                        <a href="/" class="logo">
                            <img src="/etc.clientlibs/pmi-spa-poc/clientlibs/clientlib-react/resources/iqos.png" alt="logo"></img>
                        </a>
                    </div>
                    <div className="right">
                        <a role="menuitem" href="/de/en/shopping-bag.html" class="actionBar__icon j-openToggle j-over actionbar-minicart-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>562C2D68-971C-429B-AA1D-B87DA05127F8</title>
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Navigation/S/Solid/Default" transform="translate(-320.000000, -16.000000)" stroke="#34303D"
                                       stroke-width="1.5">
                                        <g id="Icons/24/Cart/LightTheme" transform="translate(320.000000, 16.000000)">
                                            <g id="Group" transform="translate(5.000000, 3.000000)">
                                                <path
                                                    d="M0.5,3.5 L13.5,3.5 C13.7761424,3.5 14,3.72385763 14,4 L14,14.5 C14,16.1568542 12.6568542,17.5 11,17.5 L3,17.5 C1.34314575,17.5 -2.41183085e-16,16.1568542 0,14.5 L0,4 C-8.93288388e-17,3.72385763 0.223857625,3.5 0.5,3.5 Z"
                                                    id="Rectangle"></path>
                                                <path
                                                    d="M4,0 L4,0 L4,0 L8,0 C9.1045695,-2.02906125e-16 10,0.8954305 10,2 L10,4 C10,5.1045695 9.1045695,6 8,6 L4,6 L4,6"
                                                    id="Rectangle" stroke-linecap="round"
                                                    transform="translate(7.000000, 3.000000) rotate(-90.000000) translate(-7.000000, -3.000000) "></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="mobile-menu">
                    <div>
                        <ul>
                            <MainMenu items={this.state.menu} mobile={true} clickCallback={this.openSubMenu}/>
                        </ul>
                    </div>
                </div>
                <div className="navigation">
                    <div class="left">
                        <ul>
                            <MainMenu items={this.state.menu.filter(item => item.position === "left")} clickCallback={this.openSubMenu}/>
                        </ul>
                    </div>
                    <div class="center">
                        <a href="/" class="logo">
                            <img src="/etc.clientlibs/pmi-spa-poc/clientlibs/clientlib-react/resources/iqos.png" alt="logo"></img>
                        </a>
                    </div>
                    <div class="right">
                        <ul>
                            <MainMenu items={this.state.menu.filter(item => item.position === "right")} clickCallback={this.openSubMenu}/>
                            <li>
                                <div class="user">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g fill="none" fill-rule="evenodd">
                                            <g stroke="#34303D" stroke-width="1.5">
                                                <g>
                                                    <g transform="translate(-912 -24) translate(912 24) translate(5 3.75)">
                                                        <path
                                                            d="M11 10.75c.621 0 1.184.252 1.591.659.407.407.659.97.659 1.591h0v2.438c0 .345-.14.657-.366.883-.226.227-.539.366-.884.366h0H2c-.345 0-.658-.14-.884-.366-.226-.226-.366-.538-.366-.884h0V13c0-.621.252-1.184.659-1.591.407-.407.97-.659 1.591-.659h0z"></path>
                                                        <circle cx="7" cy="4" r="4"></circle>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <div class="dropdown">
                                        <div>
                                            <a href="#login">Login</a>
                                        </div>
                                        <div>
                                            <a href="#register">Register</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a role="menuitem" href="/de/en/shopping-bag.html"
                                   class="actionBar__icon j-openToggle j-over actionbar-minicart-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <title>562C2D68-971C-429B-AA1D-B87DA05127F8</title>
                                        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Navigation/S/Solid/Default" transform="translate(-320.000000, -16.000000)" stroke="#34303D"
                                               stroke-width="1.5">
                                                <g id="Icons/24/Cart/LightTheme" transform="translate(320.000000, 16.000000)">
                                                    <g id="Group" transform="translate(5.000000, 3.000000)">
                                                        <path
                                                            d="M0.5,3.5 L13.5,3.5 C13.7761424,3.5 14,3.72385763 14,4 L14,14.5 C14,16.1568542 12.6568542,17.5 11,17.5 L3,17.5 C1.34314575,17.5 -2.41183085e-16,16.1568542 0,14.5 L0,4 C-8.93288388e-17,3.72385763 0.223857625,3.5 0.5,3.5 Z"
                                                            id="Rectangle"></path>
                                                        <path
                                                            d="M4,0 L4,0 L4,0 L8,0 C9.1045695,-2.02906125e-16 10,0.8954305 10,2 L10,4 C10,5.1045695 9.1045695,6 8,6 L4,6 L4,6"
                                                            id="Rectangle" stroke-linecap="round"
                                                            transform="translate(7.000000, 3.000000) rotate(-90.000000) translate(-7.000000, -3.000000) "></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {this.state.displaySubMenu && <Submenu items={this.state.submenu} teaser={this.state.teaser}/>}
            </div>
        );
    }
}

export default Navigation;
