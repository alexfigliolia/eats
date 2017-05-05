import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
    	<header className="header" id="header">
    		<div>
    			<h1 
                  className={this.props.logoClasses} 
                  onClick={this.props.back}> 
                    <img src="icons/left.svg" alt="back to results"/>
                    Eats
                </h1>
    			<div onClick={this.props.search} className="search-icon search-icon-animate"></div>
    		</div>
    	</header>
    );
  }
}

export default Header;
