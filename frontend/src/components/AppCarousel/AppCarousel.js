import React, { Component } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


class AppCarousel extends Component{
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

      /*const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1281 },
          items: 4,
          slidesToSlide: 3 // optional, default to 1.
        },ipad: {
          breakpoint: { max: 1280, min: 1025 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile1: {
          breakpoint: { max: 767, min: 481 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 480, min: 1 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };*/

        return(
           
           
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
  <div>

  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/001.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />

  </div>
  <div>
    
  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/003.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
  <div>
  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/005.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
  <div>
  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/006.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
  <div>

  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/07.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />

  </div>
  <div>
    
  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/gundam.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
  <div>
  <img
      className="w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/terminator.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
  <div>
  <img
      className=" w-100 p-1"
      src="https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/test_photos/just_cause_3.jpg"
      alt="First slide"
      onClick={() => {console.log("xxxxxxxxxxxx")}}
    />
  </div>
</Carousel>


        )
    }
}

export default AppCarousel;