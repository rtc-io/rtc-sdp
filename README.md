# rtc-sdp

This is a utility module for intepreting and patching sdp.


[![NPM](https://nodei.co/npm/rtc-sdp.png)](https://nodei.co/npm/rtc-sdp/)

[![Build Status](https://img.shields.io/travis/rtc-io/rtc-sdp.svg?branch=master)](https://travis-ci.org/rtc-io/rtc-sdp) [![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable)

## Usage

The `rtc-sdp` main module exposes a single function that is capable of
parsing lines of SDP, and providing an object allowing you to perform
operations on those parsed lines:

```js
var sdp = require('rtc-sdp')(lines);
```

The currently supported operations are listed below:

### `sdp.addIceCandidate(data)`

Modify the sdp to include candidates as denoted by the data.

### `sdp.getMediaTypes() => []`

Retrieve the list of media types that have been defined in the sdp via
`m=` lines.

### `sdp.getMediaIDs() => []`

Retrieve the list of media IDs that have been defined in the sdp via
`m=mid` lines.

### `sdp.toString()`

Convert the SDP structure that is currently retained in memory, into a string
that can be provided to a `setLocalDescription` (or `setRemoteDescription`)
WebRTC call.

## SDP Filtering / Munging Functions

There are additional functions included in the module to assign with
performing "single-shot" SDP filtering (or munging) operations:

### `rtc-sdp/constrain-bandwidth`

```
fn(value, mediaType?) => fn(sdp) => sdp`
```

Create a filter function that can apply a `b=AS` line to the supplied SDP.

```js
var constrainBandwidth = require('rtc-sdp/constrain-bandwidth');
var quickconnect = require('rtc-quickconnect');

// create a conference with constrained bandwidth
var conference = quickconnect('https://switchboard.rtc.io', {
  room: 'sdpfilter-test',
  sdpfilter: constrainBandwidth(128)
});

conference.on('call:started', function(id) {
  console.log('call started with peer: ' + id);
});

```

The above example modifies the SDP at the session level.  In cases where you
need to apply a bandwidth constraint for a specific media type, you will need
to specify the mediaType as part of the function call:

```js
var constrainBandwidth = require('rtc-sdp/constrain-bandwidth');
var quickconnect = require('rtc-quickconnect');

// create a conference with constrained bandwidth
var conference = quickconnect('https://switchboard.rtc.io', {
  room: 'sdpfilter-test',
  sdpfilter: constrainBandwidth(128, 'video')
});

conference.on('call:started', function(id) {
  console.log('call started with peer: ' + id);
});

```

## License(s)

### Apache 2.0

Copyright 2015 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
