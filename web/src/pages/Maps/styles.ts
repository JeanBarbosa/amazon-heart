import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  width: 100vw;
  height: 100vh;

  form.landing-page-form {
    width: 500px;

    background: #ffffff;
    border: 1px solid #d3e2e5;
    border-radius: 30px;

    padding: 20px 40px;

    position: absolute;
    top: 30px;
    right: 40px;

    z-index: 1;
  }

  .leaflet-container {
    z-index: 0;
  }

  form.landing-page-form fieldset {
    border: 0;
  }

  form.landing-page-form fieldset legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5c8599;
    font-weight: 700;

    border-bottom: 1px solid #d3e2e5;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  form.landing-page-form .input-block + .input-block {
    margin-top: 24px;
  }

  form.landing-page-form .input-block label {
    display: flex;
    color: #8fa7b3;
    margin-bottom: 8px;
    line-height: 24px;
  }

  form.landing-page-form .input-block label span {
    font-size: 14px;
    color: #8fa7b3;
    margin-left: 24px;
    line-height: 24px;
  }

  form.landing-page-form .input-block input {
    width: 100%;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    outline: none;
    color: #5c8599;
  }

  form.landing-page-form .input-block input {
    height: 44px;
    padding: 0 16px;
  }

  form.landing-page-form button.confirm-button {
    margin-top: 34px;

    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background-color: var(--color-primary);
    border-radius: 20px;
    color: #ffffff;
    font-weight: 800;

    transition: background-color 0.2s;
  }

  form.landing-page-form button.confirm-button:hover {
    background-color: #6c79f5;
  }

  /* Pop Up - Marker */
  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }

  .map-popup .leaflet-popup-content h3 {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;
  }

  .map-popup .leaflet-popup-content p {
    color: #042f38;
    font-size: 12px;
    font-weight: bold;
    margin: 8px 12px;
    line-height: 15px;
  }

  .map-popup .leaflet-popup-tip-container {
    display: none;
  }

  /* Styling react select */

  .filter__control {
    border-radius: 20px !important;

    width: 100% !important;
    background: #f5f8fa !important;
    border: 1px solid #d3e2e5 !important;
    border-radius: 20px !important;
    outline: none !important;
    color: #5c8599 !important;
  }

  .filter__option {
    background: #f5f8fa !important;
    color: #5c8599 !important;
  }

  .filter__option--is-focused {
    background: #d3e2e5 !important;
    color: #010101 !important;
  }

`;