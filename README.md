# cxs
> Fastest and smallest CSS-in-JS library. Only **0.4kb**

This fork of `cxs` gets rid of some features that I do not need in my project and uses some "tricks" to achieve a _slightly_ better performance.

```js
const className = cxs({ color: 'tomato' })
```

## Install

```sh
yarn add cxs

# or using npm
npm i cxs
```

## Usage

cxs works with any framework, but this example uses React for demonstration purposes.

```js
import React from 'react'
import cxs from 'cxs'

const Box = (props) => {
  return (
    <div {...props} className={className} />
  )
}

const className = cxs({
  padding: '32px',
  backgroundColor: 'tomato'
})

export default Box
```

### Pseudoclasses

```js
const className = cxs({
  color: 'tomato',
  ':hover': {
    color: 'black'
  }
})
```

### Media Queries

```js
const className = cxs({
  fontSize: '32px',
  '@media screen and (min-width: 40em)': {
    fontSize: '48px'
  }
})
```

### Child Selectors

```js
const className = cxs({
  color: 'black',
  ' > a': {
    color: 'tomato'
  }
})
```

## API

### `cxs(style)`

Accepts a styles object returns a className string.

**Note**: contrary to the original `cxs`, this fork accepts only one object as argument.

### Vendor prefixes

`cxs` **does not** handle vendor prefixing to keep the module size at a minimum.