tennu-logemitter
================

This is a plugin for the Tennu IRC bot framework.

It hooks itself in front of the regular logger and emits an event whenever a
message is sent to the logger.

## Usage

In your plugins `handlers` object:

```
"logemitter:info": function(data) {
	// Do whatever with the data
	// See Tennu documentation for information on the logger data format
}
```