import React, { Component } from 'react';

class Banner extends Component {
  render() {
    return (
    	<div className={this.props.classes} id="banner">
    		<div>
    			<div className='headline'>
    				<h1>Eat Better</h1>
    				<h4>Find better food by location, cuisine, and type</h4>
                    <button onClick={this.props.scrollDown}></button>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default Banner;
