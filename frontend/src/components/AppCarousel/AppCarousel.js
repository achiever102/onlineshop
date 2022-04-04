import React, { Component } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
import UrlLocator from "../../helpers/UrlLocator";


class AppCarousel extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount(){
    axios
        .get(
          `${UrlLocator.getApiUrl("GET_HOME_CAROUSEL_IMAGES")}`)
        .then((response) => {
          if (response.status === 200) {
            this.setState({items: response.data})
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error)
        });
  }

    render(){

      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

        return(
           

  
    this.state.items.length > 0 ?
  
    (
      <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={2500}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
    
      {
        this.state.items.map((item) => {
          return <div key={item.id}>
          
          <img 
              className="w-100 p-1"
              src={item.imageUrl}
              alt="First slide"
              
            />
          
          </div>
            })
      }
    
          </Carousel>
          )
:
null
  
  



        )
    }
}

export default AppCarousel;