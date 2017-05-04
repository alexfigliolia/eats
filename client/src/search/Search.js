import React, { Component } from 'react';
import List from '../list/List.js';
import Dot from '../place/Dot.js';

class Search extends Component {

  onSubmit(){
    var city = this.refs.city.value;
    var cuisine = this.refs.cuisine.value;
    var matchRating = this.refs.matchRating.value;
    var budget = this.refs.budget.value;
    this.props.search(city, cuisine, matchRating, budget);
  }

  render() {
    return (
      <div className="search" id='search'>
      	<div>
      		<div className='find-info'>
      			<h2>*Where you at?</h2>
      			<div className='input-contain'>
      				<input ref='city' type='text' placeholder='City'/>
      			</div>
      		</div>
      		<div className='find-info'>
      			<h2>Cuisine?</h2>
      			<div className='input-contain'>
      				<input ref='cuisine' type='text' placeholder='Italian, Bar Food, Burger?'/>
      			</div>
      		</div>
      		<div className='find-info'>
      			<h2>What matters?</h2>
      			<div className='input-contain'>
      				<select ref='matchRating'>
      				  <option value="rating">- Best Match or Rating -</option>
    					  <option value="best_match">Best Match</option>
    					  <option value="rating">Rating</option>
    					</select>
      			</div>
      		</div>
      		<div className='find-info'>
      			<h2>How much?</h2>
      			<div className='input-contain'>
      				<select ref='budget'>
      				  <option value="1,2,3,4">- Price Range -</option>
    					  <option value="1,2,3,4">Any</option>
    					  <option value="1,2,3">Moderate</option>
                <option value="1,2">Cost Effective</option>
                <option value="1">Cheaper</option>
    					</select>
      			</div>
      		</div>
      		<button className={this.props.searchButtonClasses} onClick={this.onSubmit.bind(this)}>{this.props.searchButtonText}</button>
      	</div>
        <List 
          data={this.props.data}
          listClasses={this.props.listClasses}
          viewMore={this.props.viewMore}
          loadMore={this.props.loadMore}
          loadButtonClasses={this.props.loadButtonClasses}
          loadButtonText={this.props.loadButtonText} />
        <Dot />
      </div>
    );
  }
}

export default Search;
