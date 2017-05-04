import React, { Component } from 'react';
import Flickity from 'flickity';


class Place extends Component {
  render() {
    return (
    	<div className="place" id="place">
    		<div>
                <div className='place-image carousel' ref='carousel' data-flickity='{"contain": true, "setGallerySize" : true, "percentPosition": false, "cellAlign": "center" }'>
                    <img src={this.props.images[0]} alt='restaurant' />
                    <img src={this.props.images[1]} alt='restaurant' />
                    <img src={this.props.images[2]} alt='restaurant' />
                </div>
                <div className='place-info'>
                    <h1>{this.props.rData.name}</h1>
                    <h2>{this.props.categories[0]}</h2>
                    <div className='rating-price'>
                        <a href={"tel:1-562-867-5309" + this.props.rData.phone} className="phone"><img src="icons/phone.svg" alt="phone number" />{this.props.rData.display_phone}</a>
                        <h3><img src='icons/pointer.svg' alt='location'/>{this.props.address}</h3>
                        <h3><img src='icons/like.svg' alt='rating'/>Rating: {this.props.rData.rating}/5</h3>
                        <h3><img src='icons/business.svg' alt='cost rating'/>Price: {this.props.price}</h3>
                    </div>
                    <a href={this.props.rData.url} target="_blank">Visit on Yelp</a>
                </div>
    		</div>
    	</div>
    );
  }
}

export default Place;
