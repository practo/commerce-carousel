# Commerce Carousel

An opinionated carousel for react apps

<img src="./art/carousel.jpg" height="200px" width="300px" />

## Motivation

Customizable carousel libraries comes at a price of increased bundle size even if we don't use most of the provided features. Also, not all of them can completely fulfil our requirements and we end up applying some hacks over it to make it work for us.

This is intended to be built for a specific use case and to be used in products which have the same design and functional requirements.

## Features

- Supports horizontal scroll when js is not loaded. (Works in AMP)
- Supports elements of a fixed width only.
- Dynamic update on window resize or number of items updated.
- Swipe movements in mobile devices supported.
- Mouse movements and wheel movements are not supported because desktop will have only navigation buttons to navigate.
- Supports callback for slide change.
