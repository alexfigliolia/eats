import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
    	<header className="header" id="header">
    		<div>
    			<h1>Eats</h1>
    			<div onClick={this.props.toggleSearch} className={this.props.classes}></div>
    		</div>
    	</header>
    );
  }
}

export default Header;
