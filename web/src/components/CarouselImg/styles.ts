import styled from "styled-components";

export const Container = styled.div`

  .carousel.carousel-slider {
    margin: 0px auto;
    overflow: visible;
  }

  .carousel .slide {
    color: white;
    background: var(--color-primary);
  }

  .carousel .slide-holder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .carousel .slide img {
    margin: 30px;
    width: 35%;
    height: 200px;
    object-fit: contain;
  }
  .carousel .slide iframe {
    margin: 30px;
    width: 35%;
  }
  .carousel .text-container {
    padding: 30px;
    text-align: left;
  }

  .carousel .text-container h2 {
    margin-top: 0px;
  }

  .carousel .text-container p:last-child {
    margin-bottom: 0px;
  }

  .carousel .control-dots {
    bottom: -40px;
  }

  .carousel .thumbs-wrapper {
    margin: 30px;
  }

`;
