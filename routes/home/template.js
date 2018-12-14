import logo from '../../assets/aofl-logo.png';

export const template = (context, html) => html`
  <a class="logo" href="/">
    <img width="200" src="${logo}" alt="AofL JS Logo">
  </a>

  <div id="badges-container">
    <a href="https://github.com/AgeOfLearning/aofl" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/tag/AgeOfLearning/aofl.svg">
    </a>

    <a href="https://travis-ci.org/AgeOfLearning/aofl" target="_blank" rel="noopener noreferrer">
      <img src="https://travis-ci.org/AgeOfLearning/aofl.svg?branch=master">
    </a>

    <a href="https://codecov.io/gh/AgeOfLearning/aofl" target="_blank" rel="noopener noreferrer">
      <img src="https://codecov.io/gh/AgeOfLearning/aofl/branch/master/graph/badge.svg" alt="Coverage Status" />
    </a>

    <a href="https://github.com/AgeOfLearning/aofl/blob/master/LICENSE.md" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/license/AgeOfLearning/aofl.svg">
    </a>
  </div>

  <h1>Welcome to AofL JS</h1>

  <p>Let's get started</p>
  <a id="learn-aofl" href="https://ageoflearning.github.io/aofl/" target="_blank" rel="noopener noreferrer no-wrap">Learn AofL JS</a>.

  <h2>Supported Browsers</h2>

  <img src="https://saucelabs.com/browser-matrix/aoflsaucem.svg?auth=c0f586d708f2895cc0c009e385483adb" alt="Sauce Test Status"/>
`;
