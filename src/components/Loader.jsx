import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <figure className="iconLoaderProgress">
          <svg className="iconLoaderProgressFirst" width={120} height={120}>
            <circle cx={60} cy={60} r={50} />
          </svg>
          <svg className="iconLoaderProgressSecond" width={120} height={120}>
            <circle cx={60} cy={60} r={50} />
          </svg>
        </figure>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #141218;
  }

  .iconLoaderProgress {
    display: flex;
    align-items: center;
    justify-content: center;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-name: rotateLoader;
  }

  .iconLoaderProgress svg {
    stroke-width: 8px; /* reduced stroke width */
    fill: none;
    transform-origin: center;
    z-index: 999;
  }

  .iconLoaderProgressFirst circle,
  .iconLoaderProgressSecond circle,
  .iconLoaderProgressFirst,
  .iconLoaderProgressSecond {
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  .iconLoaderProgressFirst circle,
  .iconLoaderProgressSecond circle {
    animation-duration: 3s;
    border-radius: 15px;
  }

  .iconLoaderProgressFirst,
  .iconLoaderProgressSecond {
    position: absolute;
    animation-duration: 6s;
  }

  .iconLoaderProgressFirst circle {
    animation-name: circleFirst;
    stroke-dasharray: 314, 314; /* adjusted for smaller radius */
    stroke-dashoffset: 0;
    stroke: #7c57f4;
    stroke-linecap: round;
  }

  .iconLoaderProgressSecond {
    transform: rotate(-14deg);
  }

  .iconLoaderProgressSecond circle {
    animation-name: circleSecond;
    stroke-dasharray: 314, 314; /* adjusted for smaller radius */
    stroke-dashoffset: 0;
    stroke: #bfb2f7;
    stroke-linecap: round;
  }

  @keyframes circleFirst {
    from,
    to {
      stroke-dashoffset: 25; /* adjusted for smaller radius */
    }

    50% {
      stroke-dashoffset: 312;
    }
  }

  @keyframes circleSecond {
    from,
    to {
      stroke-dashoffset: -312;
    }

    50% {
      stroke-dashoffset: -25;
    }
  }

  @keyframes rotateLoader {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
