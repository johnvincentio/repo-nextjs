---
meta-title: "SASS Mixins | John Vincent"
meta-description: "Example SASS mixins, SASS Compiler uage, SASS Tools"
meta-keywords: "SASS, Mixins"

title: "SASS Mixins"
subtitle: "Indispensable Tools"
lead: "I always seem to be looking for a mixin I used for an earlier project, so I decided to put them in a place I can find them."

category: [Sass]
permalink: /sass/sass-mixins/
---

<!-- end -->

## Sass Compiler

```
sass --watch scss:css --style expanded

sass --watch scss:css --line-numbers --style expanded

sass --watch scss:css --line-numbers --style compressed
```

## Normalize

A useful package 

```
npm install --save normalize-scss
cd normalize-scss/node_modules/normalize-scss/sass
```

Import these files.

## Useful

Debug

```
$duration: 10;

@debug "duration #{$duration}";
```

## Mixins

The following mixins have been useful at some point.

```
/* ----------------------------------- */
/* Mixins */
/* ----------------------------------- */

@mixin text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@mixin clearfix() {
    &:before,
    &:after {
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }
}
@mixin generateRow($number-of-items, $margin)
{
     width: ((100% - ($margin * ($number-of-items - 1)))/ $number-of-items);
     margin-right: $margin;
     margin-bottom: $margin;

     &:nth-child(#{$number-of-items}n)
     {
         margin-right: 0;
     }
}

// Gradient Backgrounds
// @include horizontal(COLOR, COLOR)
@mixin horizontal-gradient($startColor: $color-yellow, $endColor: $color-red) {
    background-color: $endColor;
    background-image: -webkit-gradient(linear, 0 0, 100% 0, from($startColor), to($endColor));
    background-image: -webkit-linear-gradient(left, $startColor, $endColor);
    background-image: -moz-linear-gradient(left, $startColor, $endColor);
    background-image: -ms-linear-gradient(left, $startColor, $endColor);
    background-image: -o-linear-gradient(left, $startColor, $endColor);
    background-image: linear-gradient(left, $startColor, $endColor);
    background-repeat: repeat-x;
}
// @include vertical(COLOR, COLOR)
@mixin vertical($startColor: $color-yellow, $endColor: $color-red) {
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from($startColor), to($endColor));
    background-image: -webkit-linear-gradient(top, $startColor, $endColor);
    background-color: $endColor;
    background-image: -moz-linear-gradient(top, $startColor, $endColor);
    background-image: -ms-linear-gradient(top, $startColor, $endColor);
    background-image: -o-linear-gradient(top, $startColor, $endColor);
    background-image: linear-gradient(top, $startColor, $endColor);
    background-repeat: repeat-x;
}

// @include directional(COLOR, COLOR, DEG)
@mixin directional($startColor: $white, $endColor: $lightergrey, $deg: 45deg) {
    background-color: $endColor;
    background-image: -moz-linear-gradient($deg, $startColor, $endColor);
    background-image: -ms-linear-gradient($deg, $startColor, $endColor);
    background-image: -webkit-linear-gradient($deg, $startColor, $endColor);
    background-image: -o-linear-gradient($deg, $startColor, $endColor);
    background-image: linear-gradient($deg, $startColor, $endColor);
    background-repeat: repeat-x;
}
@mixin linearGradient($top, $bottom){
    background: $top; /* Old browsers */
    background: -moz-linear-gradient(top,  $top 0%, $bottom 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,$top), color-stop(100%,$bottom)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top,  $top 0%,$bottom 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top,  $top 0%,$bottom 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top,  $top 0%,$bottom 100%); /* IE10+ */
    background: linear-gradient(to bottom,  $top 0%,$bottom 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
}
@mixin linearGradientRightToLeft($from, $to) {
  background: $from; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, $from , $to); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, $from, $to); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, $from, $to); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, $from , $to); /* Standard syntax */
}
@mixin linearGradientLeftToRight($from, $to) {
  background: $from; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(right, $from , $to); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(left, $from, $to); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(left, $from, $to); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to left, $from , $to); /* Standard syntax */
}

// Box Styles
// @include rounded(INT)
@mixin rounded($radius: 4px) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}

// @include border-radius(INT, INT, INT, INT)
@mixin border-radius($topright: 0, $bottomright: 0, $bottomleft: 0, $topleft: 0) {
    -webkit-border-top-right-radius: $topright;
    -webkit-border-bottom-right-radius: $bottomright;
    -webkit-border-bottom-left-radius: $bottomleft;
    -webkit-border-top-left-radius: $topleft;
    -moz-border-radius-topright: $topright;
    -moz-border-radius-bottomright: $bottomright;
    -moz-border-radius-bottomleft: $bottomleft;
    -moz-border-radius-topleft: $topleft;
    border-top-right-radius: $topright;
    border-bottom-right-radius: $bottomright;
    border-bottom-left-radius: $bottomleft;
    border-top-left-radius: $topleft;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
}

// @include box-shadow(shadow declaration)
@mixin box-shadow($shadow: 0 1px 3px rgba(0, 0, 0, .25)) {
    -webkit-box-shadow: $shadow;
    -moz-box-shadow: $shadow;
    box-shadow: $shadow;
}
// @include drop-shadow(X-OFFSET, Y-OFFSET, BLUR, ALPHA)
@mixin drop-shadow($x-axis: 0, $y-axis: 1px, $blur: 2px, $alpha: 0.1) {
    -webkit-box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);
    -moz-box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);
    box-shadow: $x-axis $y-axis $blur rgba(0, 0, 0, $alpha);
}


// Image Replacement
// @include hide-text()
@mixin hide-text() {
    font: 0/0 a;
    text-shadow: none;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}

// Value using calc
// @include width-calc(STRING PROPERTY, STRING OPERATION)
@mixin css3-calc($property, $operation) {
    #{$property}: -moz-calc(#{$operation});
    #{$property}: -webkit-calc(#{$operation});
    #{$property}: calc(#{$operation});
}

// Horizontally center a block-level element
// @include center-block()
@mixin center-block() {
    display: block;
    margin-left: auto;
    margin-right: auto;
}


@mixin border-radius($radius){
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}
@mixin box-shadow($shadow){
  -webkit-box-shadow: $shadow;
  -moz-box-shadow: $shadow;
  box-shadow: $shadow;
}
@mixin box-sizing($box-sizing){
    -webkit-box-sizing: $box-sizing;
    -moz-box-sizing: $box-sizing;
    box-sizing: $box-sizing;
}

@mixin scale($scale) {
    @include transform(scale($scale));
}

@mixin opacity($opacity) {
    opacity: $opacity;
    $opacity-ie: $opacity * 100;
    filter: alpha(opacity=$opacity-ie); //IE8
}

@mixin transition($args...) {
  -webkit-transition: $args;
  -moz-transition: $args;
  -ms-transition: $args;
  -o-transition: $args;
  transition: $args;
}

@mixin transform($transforms) {
  -moz-transform: $transforms;
  -o-transform: $transforms;
  -ms-transform: $transforms;
  -webkit-transform: $transforms;
  transform: $transforms;
}

@mixin rotate($val: -2deg) {
  -webkit-transform: rotate($val);
  -moz-transform: rotate($val);
  -ms-transform: rotate($val);
  -o-transform: rotate($val);
  transform: rotate($val);
}

@mixin rotateX( $val: -2deg ) {
  -webkit-transform: rotateX($val);
  -moz-transform: rotateX($val);
  -ms-transform: rotateX($val);
  -o-transform: rotateX($val);
  transform: rotateX($val);
}

@mixin rotateY( $val: -2deg ) {
  -webkit-transform: rotateY($val);
  -moz-transform: rotateY($val);
  -ms-transform: rotateY($val);
  -o-transform: rotateY($val);
  transform: rotateY($val);
}

@mixin transform-style($val) {
  -webkit-transform-style: $val;
  -moz-transform-style: $val;
  -ms-transform-style: $val;
  transform-style: $val;
}

@mixin perspective($val) {
  -webkit-perspective: $val; 
  -moz-perspective: $val; 
  -ms-perspective: $val; 
  perspective: $val;
}

@mixin backface-visibility ($arguments) {
	-webkit-backface-visibility: $arguments;
	-moz-backface-visibility: $arguments;
	-ms-backface-visibility: $arguments;
	-o-backface-visibility: $arguments;
	backface-visibility: $arguments;
}


@mixin keyframes($animation-name) {
    @-webkit-keyframes #{$animation-name} {
        @content;
    }
    @-moz-keyframes #{$animation-name} {
        @content;
    }
    @-ms-keyframes #{$animation-name} {
        @content;
    }
    @-o-keyframes #{$animation-name} {
        @content;
    }
    @keyframes #{$animation-name} {
        @content;
    }
}

@mixin animation($str) {
    -webkit-animation: #{$str};
    -moz-animation: #{$str};
    -ms-animation: #{$str};
    -o-animation: #{$str};
    animation: #{$str};
}

@mixin animation ($animation, $duration, $timing, $iteration) {
    -webkit-animation-name: $animation;
    -webkit-animation-duration: $duration;
    -webkit-animation-timing-function: $timing;
    -webkit-animation-iteration-count: $iteration;
    -moz-animation-name: $animation;
    -moz-animation-duration: $duration;
    -moz-animation-timing-function: $timing;
    -moz-animation-iteration-count: $iteration;
    -o-animation-name: $animation;
    -o-animation-duration: $duration;
    -o-animation-timing-function: $timing;
    -o-animation-iteration-count: $iteration;
    animation-name: $animation;
    animation-duration: $duration;
    animation-timing-function: $timing;
    animation-iteration-count: $iteration;
}

@mixin animation($animation, $duration, $timing, $iteration, $direction) {
  -webkit-animation-name: $animation;
  -webkit-animation-duration: $duration;
  -webkit-animation-timing-function: $timing;
  -webkit-animation-iteration-count: $iteration;
  -webkit-animation-direction: $direction;

  -moz-animation-name: $animation;
  -moz-animation-duration: $duration;
  -moz-animation-timing-function: $timing;
  -moz-animation-iteration-count: $iteration;
  -moz-animation-direction: $direction;

  -o-animation-name: $animation;
  -o-animation-duration: $duration;
  -o-animation-timing-function: $timing;
  -o-animation-iteration-count: $iteration;
  -o-animation-direction: $direction;

  animation-name: $animation;
  animation-duration: $duration;
  animation-timing-function: $timing;
  animation-iteration-count: $iteration;
  animation-direction: $direction;
}

@mixin animations($animate...) {
    $max: length($animate);
    $animations: '';

    @for $i from 1 through $max {
        $animations: #{$animations + nth($animate, $i)};

        @if $i < $max {
            $animations: #{$animations + ", "};
        }
    }
    -webkit-animation: $animations;
    -moz-animation:    $animations;
    -o-animation:      $animations;
    animation:         $animations;
}


@mixin breakpoint($point) {
    @if $point == w-140 {
        @media only screen and (min-width : 140px) { @content; }
    }
    @else if $point == w-200 {
        @media only screen and (min-width : 200px) { @content; }
    }
    @else if $point == w-260 {
        @media only screen and (min-width : 260px) { @content; }
    }
    @else if $point == w-320 {
        @media only screen and (min-width : 320px) { @content; }
    }
    @else if $point == w-380 {
        @media only screen and (min-width : 380px) { @content; }
    }
    @else if $point == w-440 {
        @media only screen and (min-width : 440px) { @content; }
    }
    @else if $point == w-500 {
        @media only screen and (min-width : 500px) { @content; }
    }
    @else if $point == w-560 {
        @media only screen and (min-width : 560px) { @content; }
    }
    @else if $point == w-620 {
        @media only screen and (min-width : 620px) { @content; }
    }
    @else if $point == w-680 {
        @media only screen and (min-width : 680px) { @content; }
    }
    @else if $point == w-740 {
        @media only screen and (min-width : 740px) { @content; }
    }
    @else if $point == w-800 {
        @media only screen and (min-width : 800px) { @content; }
    }
}
```

### Input Placeholder

```
@mixin placeholder {
  ::-webkit-input-placeholder {@content}
  :-moz-placeholder           {@content}
  ::-moz-placeholder          {@content}
  :-ms-input-placeholder      {@content}  
}
```

Usage

```
@include placeholder {
  color: #95a5a6;
}

```

## CSS Template

```
@import "variables";
@import "mixins";

.clearfix {
    @include clearfix;
}

@include opacity(0.3);

```

### Example

```
%arrow {
    content: '';
    display: inline;
    border-top: 3px solid $arrow-color;
    border-right: 3px solid $arrow-color;
    position: absolute;
}
@mixin arrow-sizing($size) {
    width: $size;
    height: $size;
}

@mixin up_arrow() {
    @extend %arrow;
    top: 5px;
    left: 42%;
    @include rotate(-45);
}
@mixin right_arrow() {
    @extend %arrow;
    top: 45%;
    right: 5px;
    @include rotate(45);
}
```

### Tile Sizing

```
@mixin square($size, $cols: 3) {
    width: $size / $cols;
    height: $size / $cols;
    line-height: $size / $cols;
}

@function mydivider($size, $cols, $factor: 1) {
    @return ($size / $cols) * $factor;
}

@mixin tile-sizing($size, $border-size, $cols: 7) {
    border: $border-size solid $tile-border-color;
    $tile_size: mydivider($size, $cols);
    width: $tile_size;
    height: $tile_size;
    line-height: $tile_size;
}

@mixin peg-sizing($size, $tile-border-size, $cols: 7) {
    $tile_size: mydivider($size, $cols);
    $tile_size_no_borders: $tile_size - (2 * $tile-border-size);
    $peg_size: $tile_size_no_borders * 0.9;

    width: $peg_size;
    height: $peg_size;
    line-height: $peg_size;
    $offset: ($tile_size_no_borders - $peg_size) / 2;
    top: $offset;
    left: $offset;
}
```

```
@function mydivider($size, $cols, $div: 1) {
    @return ($size / $cols) / $div;
}
@mixin square($size, $cols: 7) {
    width: mydivider($size, $cols);
    height: mydivider($size, $cols);
    line-height: mydivider($size, $cols);
}

@mixin peg($size, $cols: 7) {
    width: mydivider($size, $cols, 2);
    height: mydivider($size, $cols, 2);
    top: mydivider($size, $cols, 4);
    left: mydivider($size, $cols, 4);
}
```

### Variables

```
/* ----------------------------------- */
/* Variables */
/* ----------------------------------- */

$background-color: #fffafa;

$board-color: #d3d3d3;
$board-border-color: #cdc9c9;

//$tile-border-color: white;
$tile-border-color: $board-color;

$peg-color-occupied: #00bfff;
$peg-box-shadow-color: #888888;
$peg-color-empty: #696969;

$highlighted-peg-color-empty: $peg-color-empty;
$not-highlighted-peg-color-empty: $peg-color-empty;

$highlighted-peg-color-occupied: $peg-color-occupied;
$not-highlighted-peg-color-occupied: $peg-color-occupied;

$arrow-color: #13507a;

$button-background-color: $board-color;
$button-hover-background-color: $peg-color-occupied;
```

### Example of Keyframes and Animations

```
.ball {
	&:first-child {
		@include animation(
			left,
			1s,
			cubic-bezier(0.215, 0.61, 0.355, 1),
			infinite,
			alternate
		);
	}
	&:last-child {
		@include animation(
			right,
			1s,
			cubic-bezier(0.55, 0.055, 0.675, 0.19),
			infinite,
			alternate
		);
	}
}

@include keyframes(left) {
  0% {
    @include rotate(0deg);
  }
  50% {
    @include rotate(0deg);
  }
  100% {
    @include rotate(45deg);
  }
}

@include keyframes(right) {
  0% {
    @include rotate(-45deg);
  }
  50% {
    @include rotate(0deg);
  }
  100% {
    @include rotate(0deg);
  }
}
```

## Example of calculations

```
$deck-top-offset: 20px;
$deck-left-offset: 40px;

@mixin card($player, $card) {
	// @debug "player #{$player} card #{$card}";

	$deck-top: $deck-top-offset + ($player - 1) * 8 + ($card * 2);
	// @debug "deck-top #{$deck-top}";

	$toX: 180 + ($card * 200);
	$toY: ($player - 1) * 250;

	$duration: 1 + (($player - 1) * 4 + $card) * 0.25;
	// @debug "duration #{$duration}";

	&.C#{$player}#{$card} {
		// transition: transform #{$duration}s ease-out;
		// transition: transform 1s ease-out;
		@include transition(transform 1s ease-out);
		
		&.deck {
			top: #{$deck-top}; left: #{$deck-left-offset};
		}
		&.deal {
			transform: translate(#{$toX}px, #{$toY}px);
			&:hover {
				@include transition(all 0.5s);
				cursor: pointer;
				@include opacity(1);
				transform: scale(1.02) translate(#{$toX}px, #{$toY}px);
			}
		}
	}
}

.pokecard {

	@for $i from 0 through 3 {
		@include card(1, $i);
		@include card(2, $i);
	}
	...
}
```

## Convert a Link to a Button

```
%button {
  background-color: transparent;
  border: none transparent;
  outline: none;
  text-decoration: none;
  border-radius: 2px;
  line-height: normal;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  text-rendering: auto;
}

  &--nav-link {
    @extend %button;

    color: white;
    background-color: $primary-color;

    padding: 8px 16px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.029em;

    min-width: 64px;
    min-height: 36px;

    transition: color 0.1s ease, border-color 0.1s ease;

    &:disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.4;

      &:hover {
        opacity: 0.4;
      }
    }

    &:hover {
      background-color: $dark-primary-color;
      @include transition(all 0.3s);
      cursor: pointer;
      @include opacity(1);
    }
  }
```

## Convert a Button to a Div

```
@mixin button-to-div {
	border: none transparent;
	outline: none;
	text-decoration: none;
	border-radius: 2px;
	line-height: normal;
	white-space: nowrap;
	text-align: center;
	cursor: pointer;
	text-rendering: auto;
}
```

## Image as a Button

```
%img-button {
  background-color: transparent;
  border: none transparent;
  outline: none;
  text-decoration: none;
  border-radius: 2px;
  line-height: normal;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  text-rendering: auto;
}

img {
	width: 100px;
	height: auto;
	border-radius: 50%;
	&:hover {
		background-color: $dark-primary-color;
		@include transition(all 0.3s);
		cursor: pointer;
		@include opacity(1);
	}
}
```

## Center

```
@mixin center() {
	display: flex;
	justify-content: center;
	align-items: center
}

@mixin center2 {
	position: absolute;
	top: 50%;
	left: 50%;
	@include transform(translate(-50%, -50%));
}
```
