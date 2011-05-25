Tranquil
========

Tranquil is a Sinatra app that acts as a basic framework for building status
boards like the one used by
[Panic](http://www.panic.com/blog/2010/03/the-panic-status-board/). Started on
a whim, it's intended to provide enough flexibility for anyone -- even without
a local installation.

Principle
---------

Your status board is defined by a basic configuration file, which is specified
as a JSON hash. This file (`/config.json`, by default) will be loaded via
JSONP, and will be polled periodically for changes (automatically refreshing
your status board).  Alternate configurations can be loaded by specifying the
`config` query parameter.

The `javascript` and `stylesheet` keys may be supplied as arrays of filenames;
these files will be loaded iff the exact filename has not already been loaded.

The `layout` key should refer to an array, each element corresponding to a
'row' in the board's layout. Elements in the `layout` array may be arrays of
'panels' (which will be distributed equitably across the width of the board),
or individual 'panel' objects (which receive the full width).

Each 'panel' is described by a simple object, with a few consistent keys:

  * `type` - Not surprisingly, this describes the type of panel being created;
    the value of `type` is used to look up a function in the global `Tranquil`
    object, which is bound to the panel's div and receives the 'panel' object
    as an argument.
  * `height` - The height of this panel's row.
  * `url` - The URL to retrieve data from.
  * `interval` - The number of milliseconds between requests.
  * `filter` - The name of a function used to preprocess the retrieved data.
