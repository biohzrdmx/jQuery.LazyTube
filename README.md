##Introduction##

Avoid hanging your client's browsers by loading YouTube videos ONLY when they want to watch them!

YouTube is bloated as hell and having to create a Flash instance everytime you want to watch a video isn't an easy task for the browser. Now imagine loading a page with, say 30 videos. Your browser will be on its knees by the 10th one.

So let's avoid that task until the user REALLY wants to watch the f***ing video.

###Credits###

**Lead coder:** biohzrdmx [&lt;github.com/biohzrdmx&gt;](http://github.com/biohzrdmx)

###License###

The MIT License (MIT)

Copyright (c) 2013 biohzrdmx

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Basic usage##

Just create a placeholder element and give some data attributes to it. It's that simple.

The `data-id` attribute specifies the video ID: for `http://www.youtube.com/watch?v=TVECSYevEz0` that would be `TVECSYevEz0`

	<div data-id="TVECSYevEz0" class="demo01"></div>

	<script type="text/javascript">
	    jQuery(document).ready(function($) {
	        $('.demo01').lazyTube();
	    });
	</script>

LazyTube automagically fetches the preview image so you don't have to worry on doing it, and the video will be loaded when you click on it.

#### What about specifying the size and other things? ####

Data attributes are the way to go, just add some `width` and `height`:

	<div data-id="TVECSYevEz0" data-width="480" data-height="320" class="demo02"></div>


#### Autoplay ####

You may also specify an `autoplay` attribute if you want the video to start when the page finishes loading (but please don't do that, it's annoying):

	<div data-id="TVECSYevEz0" data-autoplay="yes" class="demo02"></div>

#### Thumbnail size ####

And what about specifying the thumbnail size you want to get? That's what the `thumbnail` attribute is for!

	<div data-id="TVECSYevEz0" data-thumbnail="default" class="demo03"></div>

Supported values:

- `default`
- `mqdefault`
- `hqdefault`
- `sddefault`
- `maxresdefault`

That's simply awesome. But wait!

### Extending LazyTube ###

It's also posible to modify the plugin behaviour *if you know what you're doing*. Yay!

The videos can be loaded on, say a [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/) box, and all you have to do is create an special handling function as is shown:

	<div data-id="TVECSYevEz0" data-target="magnificPopup" class="demo04"></div>

	<script type="text/javascript">
	    jQuery(document).ready(function($) {
	        $('.demo04').lazyTube({
	            targetHandlers: {
	                // Create your function here, its name must match the data-target attribute
	                magnificPopup: function(options, params) {
	                    // Here you'll get two parameters, options and params:
	                    //  - options is a hash with the specified options for the .lazyTube call
	                    //  - params is a hash with the extracted data-* attributes (such as width, height, autoplay, etc.)
	                    $.magnificPopup.open({
	                        items: [{
	                            src: 'https://www.youtube.com/watch/?v=' + params.id,
	                            type: 'iframe'
	                        }]
	                    });
	                    // As you can see, we're just using magnificPopup's API to launch the video
	                }
	            }
	        });
	    });
	</script>

Check `index.html` for some live examples.

### Troubleshooting ###

This plugin works on IE7+, Firefox and Chrome. Opera should do too, but I don't really care.

Also, javascript is a must. If the user has javascript disabled, well, this won't work at all.