import React, { Component } from 'react';
import Result from './Result.js';

class List extends Component {
  render() {
    return (
        <div className={this.props.listClasses} id='list'>
            <div>
                <h1>Search Results</h1>
                <div className="results" onClick={this.props.viewMore}>
				          {
                  	this.props.data.map(function(restaurant, i){
                  	  return (
                          <Result 
                            key={i}
                            name={restaurant.name} 
                            index={i} 
                            image={restaurant.image_url}
                            id={restaurant.id} />
                  	  );
                  	})
                  }
                </div>
            </div>
            <button className={this.props.loadButtonClasses} onClick={this.props.loadMore}>{this.props.loadButtonText}</button>
        </div>
    );
  }
}

export default List;
