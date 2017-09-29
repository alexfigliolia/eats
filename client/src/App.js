import React, { Component } from 'react';
import Header from './header/Header';
import Banner from './banner/Banner';
import Search from './search/Search';
import Place from './place/Place';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      city : "",
      cuisine: "",
      matchRating: "",
      budget: "",
      cityId: "",
      data: [],
      rData: {},
      logoClasses: "logo",
      bannerClasses: "banner",
      searchButtonClasses: "search-btn",
      searchButtonText: "Feed Me!",
      listClasses: "list",
      address: "",
      categories: [],
      price: "",
      rating: "",
      imgs: [],
      offset: 0,
      loadMoreClasses: "load-more",
      loadMoreText: "Load More"
    }
  }

  scrollDown = () => {
    scrollIt(
      document.getElementById('search'),
      300,
      'easeOutQuad'
    );
  }

  setHeight = (el1, el2) => {
      el1.style.height = el2.clientHeight + 'px';
  }

  conductSearch = (userShit) => {
    let self = this;
    axios.post('/data', userShit)
      .then(function(response) {
        console.log(response);
        let r = response.data.length - 1,
            d = response.data[r],
            stateData = self.state.data,
            l = document.getElementById('list'),
            s = document.getElementById('search');
        stateData.push.apply(stateData, d);
        console.log(stateData);
        self.setState({
          data: stateData,
          listClasses: "list list-show",
          loadMoreClasses: "load-more",
          loadMoreText: "Load More"
        });
        self.setHeight(s, l);

        if(userShit.offset === 0) {
          scrollIt(
            document.getElementById('search'),
            300,
            'easeOutQuad'
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  searchInfo = (a, b, c, d) => {
    const userShit = {city : a, cuisine: b, matchRating: c, budget: d, offset: 0}
    if(userShit.city !== ''){
      this.setState({
        city : a,
        cuisine: b,
        matchRating: c,
        budget: d,
        searchButtonClasses: "search-btn search-btn-animate",
        searchButtonText: "",
        searchClasses: "search search-scroll",
        offset: 0,
        data: []
      });
      this.conductSearch(userShit);
    } else {
      this.setState({
        searchButtonText: "Enter your city"
      });
    }
  }

  loadMore = () => {
    const offset = this.state.offset + 20;
    this.setState({
      offset: offset,
      loadMoreClasses: "load-more load-more-animate",
      loadMoreText: ""
    })
    const userShit = {
      city : this.state.city, 
      cuisine: this.state.cuisine, 
      matchRating: this.state.matchRating, 
      budget: this.state.budget, 
      offset: offset
    }
    this.conductSearch(userShit);
  }

  viewMore = (e) => {
    if(e.target.classList.contains('trigger-search')) {
      const place = e.target.dataset.place,
          s = {place: place},
          m = document.getElementsByClassName('result'),
          d = document.getElementById('dot'),
          p = document.getElementById('place');
      for(var i = 0; i<m.length; i++){
          if(m[i].dataset.place === place) {
              let left = (m[i].offsetLeft + (m[i].offsetWidth / 2)) - 35;
              let top  = (m[i].offsetTop + (m[i].offsetHeight / 2)) - 60;
              d.style.top = top + 'px';
              d.style.left = left + 'px';
              d.classList.add('dot-show');
          }
      }
      axios.post('/place', s)
          .then((response) => {
              let c = [],
                  im = response.data.photos, 
                  a = response.data.location.address1, 
                  price = response.data.price, 
                  r = response.data.rating;
              console.log(response.data);
              for(var i = 0; i<response.data.categories.length; i++){
                let cat = response.data.categories[i].title;
                c.push(cat);
              }
              if(price === "$$$$") {price = "More Expensive";}
              if(price === "$$$") {price = "Moderate";}
              if(price === "$$") {price = "Cost Effective";}
              if(price === "$") {price = "Cheaper";}
              this.setState({
                  rData: response.data,
                  address: a,
                  categories: c,
                  price: price,
                  rating: r,
                  imgs: im 
              });
              d.classList.add('dot-expand');
              setTimeout(() => {
                  p.classList.add('place-show');
                  p.scrollTop = 0;
                  document.body.style.overflow = 'hidden';
                  this.setState({
                    logoClasses: "logo logo-back"
                  });
              }, 700);
          })
          .catch((error) => {
              console.log(error);
              d.classList.remove('dot-show');
              document.body.style.overflow = 'auto';
          });
    }
  }

  backToResults = (e) => {
    if(e.target.className === "logo logo-back" || e.target.tagName === "IMG") {
      const d = document.getElementById('dot'),
            p = document.getElementById('place');
      p.classList.remove('place-show');
      setTimeout(() => {
        d.classList.remove('dot-expand');
        document.body.style.overflow = 'auto';
        this.setState({
          logoClasses: "logo"
        })
      }, 200)
      setTimeout(() => {
        d.classList.remove('dot-show');
      }, 1000)
    }
  }

  backToSearch = () => {
    if(this.state.searchButtonText === "Feed Me!") {
      scrollIt(
        document.getElementById('search'),
        300,
        'easeOutQuad'
      );
    } else {
      const s = document.getElementById('search'),
            r = document.getElementsByClassName('result');
      for(var i = 0; i<r.length; i++){
        r[i].classList.remove('result-show');
      }
      setTimeout(() => {
        this.setState({
          listClasses: "list",
          searchButtonClasses: "search-btn"
        });
        s.style.height = 'auto';
      }, 450)
      setTimeout(() => {
        this.setState({
          searchButtonText: "Feed Me!"
        })
      }, 1450);
    }
  }

  render = () => {
    return (
      <div className="App">

        <Header 
          logoClasses={this.state.logoClasses}
          back={this.backToResults}
          search={this.backToSearch} />

        <Banner
          classes={this.state.bannerClasses}
          scrollDown={this.scrollDown} />

        <Search
          search={this.searchInfo}
          searchButtonClasses={this.state.searchButtonClasses}
          searchButtonText={this.state.searchButtonText} 
          data={this.state.data}
          listClasses={this.state.listClasses}
          viewMore={this.viewMore}
          loadMore={this.loadMore}
          loadButtonClasses={this.state.loadMoreClasses}
          loadButtonText={this.state.loadMoreText} />

        <Place 
          rData={this.state.rData}
          categories={this.state.categories}
          address={this.state.address}
          price={this.state.price}
          images={this.state.imgs} />

      </div>
    );
  }
}

export default App;

function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 80;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
