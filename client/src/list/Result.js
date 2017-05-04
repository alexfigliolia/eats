import React, { Component } from 'react';

class Result extends Component {
    componentDidMount(){
        var m = document.getElementsByClassName('result');
        var delay = 1;
        for ( var i=m.length - 20; i < m.length; i++ ) {
            // get function in closure, so i can iterate
            var toggleItemMove = this.toggleMove( i );
            // reverse stagger order
            delay = (i / 2) + 1;
            delay *= 30;
            // stagger transition with setTimeout
            setTimeout( toggleItemMove, delay );
        }
    }

    toggleMove(i){
        var m = document.getElementsByClassName('result');
        var item = m[i];
        return function() {
            item.classList.add('result-show');
        }
    }

    componentWillUnmount(){
        var m = document.getElementsByClassName('result');
        for (var i = 0; i < m.length; i++) {
          return function() {
            m[i].classList.remove('result-show');
          }
        }
    }
  render() {
    return (
        <div className="result trigger-search" key={this.props.index} data-place={this.props.id}>
            <div className="result-img trigger-search" data-place={this.props.id}>
                <img className="trigger-search" src={this.props.image} alt="restaurant" data-place={this.props.id} />
            </div>
            <h2 className="trigger-search" data-place={this.props.id}>{this.props.name}</h2>
        </div>
    );
  }
}

export default Result;