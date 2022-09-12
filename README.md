# Oxbotica WebGL challenge


![Screenshot of the WebGL challenge demo](/src/hero_img.PNG "WebGL challenge demo")

## Design choices
- For referencing latitude and longitude of vehicle data within an arbitary space in Three.js, I used 3 data points: Point TL (51.797113,-1.366425), Point BL (51.797113,-1.366425) and Point BR (51.662187,-1.148908) to map latitude and longitude of vehicle data to x, y coordinates within the scene.\
For example:

```
  /*
    value: longitude of vehicle data
    inputMin: BL's longitude
    inputMax:  BR's longitude
    outputMin: origin's x
    outputMax: distance between BL and BR
  */

  function mapRange(value, inputMin, inputMax, outputMin, outPutMax) {
    return outputMin + (outPutMax - outputMin) * (value - inputMin) / (inputMax - inputMin);
  }
```

- Kept the colours simple to make the marker pin the focal point with bright red against grayscale colours.

***
## Run Demo Instructions
This demo needs node.js to serve the static files. Three.js library is hosted via CDN.

1. Clone this repo
2. Install necessary packages

```
npm install package.json
```
3. Run demo
```
npm start
```
***

## Improvements

- Make marker buttons and vehicle data as WebGL components instead of HTML elements.
- Sort vehicle data by timestamp and display it dynamically within canvas element.
- It's hard to read the latitude and longitude attached onto some of the marker pins that are futher from the camera, maybe, place the text geometry in a fixed position.