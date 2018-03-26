# pretty-progressbar  [![NPM version](https://img.shields.io/npm/v/pretty-progressbar.svg)](https://www.npmjs.com/package/pretty-progressbar)
[![Downloads](http://img.shields.io/npm/dm/pretty-progressbar.svg)](https://npmjs.org/package/pretty-progressbar)

A generic React component which renders a responsive and slick progress bars. It provides 4 type of progress bars with options to customize them accordingly.

![Pretty Progress Bar](https://media.giphy.com/media/yvqUDxA4HZ0w4iHY0Z/giphy.gif)

----------------------------------------------------------------------------------------------------

Getting Started
-----

```javascript
npm i pretty-progressbar --save-dev 
```

or

```javascript
npm install pretty-progressbar --save-dev 
```

Usage - Example 1
-----

```javascript
import React from 'react';
import { render } from 'react-dom';
import PrettyProgressbar from 'pretty-progressbar';

class App extends React.Component {
 render() {
        return (
           <PrettyProgressbar 
                 percentage="41" 
                 type='default' 
                 label={true}/>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)

```

![Pretty Progress Bar](https://raw.githubusercontent.com/krishcdbry/pretty-progressbar/master/demo/assets/progressbar-default.png)


Usage - Example 2 (With Custom Styles)
-----

```javascript
import React from 'react';
import { render } from 'react-dom';
import PrettyProgressbar from 'pretty-progressbar';

class App extends React.Component {
 render() {
        let progressBarStyle = {
            'display' : 'inline-block',
            'margin' : '9px'
        }

        let progressStyle = {
            'background' : 'indianred'
        }

        return (
           <PrettyProgressbar 
                 percentage="81"
                 type='circle' 
                 label={true}
                 progressbarStyle={progressBarStyle} 
                 progressStyle={progressStyle}/>
        )
    }
}

render(
    <App/>, document.getElementById('root')
)

```
![Pretty Progress Bar](https://raw.githubusercontent.com/krishcdbry/pretty-progressbar/master/demo/assets/progressbar-circle.png)


Props
-----

Name               | Required | Type     | Description |
-------------------|----------|----------|------------------------------------------------------------------------
`percentage`       | Yes      | number   | Progress from 0 to 100. Default 0
`label`            | No       | boolean  | Which shows percentage on the progress bar (true/false) - Default false
`type`             | No       | string   | Which defines type of progress bar (default/circle/cyclinder/square) - Default 
`progressbarStyle` | No       | object   | Style object for the progressbar wrapper (container)
`progressStyle`    | No       | object   | Style object for the progress (content)



## Author
Krishcdbry (krishcdbry@gmail.com)

## Demo
Click here @[https://krishcdbry.github.io/pretty-progressbar/demo/](https://krishcdbry.github.io/pretty-progressbar/demo/)

## Licence
MIT @[krishcdbry](krishcdbry.com)
