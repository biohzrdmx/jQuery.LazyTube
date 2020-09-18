## Introduction ##

Avoid hanging your client's browsers by loading YouTube videos ONLY when they want to watch them!

YouTube is bloated as hell and having to create a Flash instance everytime you want to watch a video isn't an easy task for the browser. Now imagine loading a page with, say 30 videos. Your browser will be on its knees by the 10th one.

So let's avoid that task until the user REALLY wants to watch the f***ing video.

### Credits ###

**Lead coder:** biohzrdmx [&lt;github.com/biohzrdmx&gt;](http://github.com/biohzrdmx)

### License ###

The MIT License (MIT)

Copyright &copy; 2020 biohzrdmx

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Basic usage ##

Just create a placeholder element and give some data attributes to it. It's that simple.

The `data-id` attribute specifies the video ID: for `http://www.youtube.com/watch?v=TVECSYevEz0` that would be `TVECSYevEz0`

```html
<div data-id="TVECSYevEz0" class="demo01"></div>

<script type="text/javascript">
  jQuery(document).ready(function($) {
    $('.demo01').lazyTube();
  });
</script>
```

LazyTube automagically fetches the preview image so you don't have to worry on doing it, and the video will be loaded when you click on it.

#### What about specifying the size and other things? ####

Data attributes are the way to go, just add some `width` and `height`:

```html
<div data-id="TVECSYevEz0" data-width="480" data-height="320" class="demo02"></div>
```

#### Autoload ####

You may also specify an `autoload` attribute if you want the video to start when the page finishes loading (but please don't do that, it's annoying):

```html
<div data-id="TVECSYevEz0" data-autoload="yes" class="demo02"></div>
```

#### Thumbnail size ####

And what about specifying the thumbnail size you want to get? That's what the `thumbnail` attribute is for!

```html
<div data-id="TVECSYevEz0" data-thumbnail="default" class="demo03"></div>
```

Supported values:

- `default`
- `mqdefault`
- `hqdefault`
- `sddefault`
- `maxresdefault`

That's simply awesome. But wait!

### Other services ###

Now it is also possible to use other video services such as Vimeo, given that you provide the embed and/or thumbnail code, for example:

```html
<div data-id="457373826" class="demo05" data-thumbnail="956495787_780x439"></div>
```

That contains the id of the video and the name of the thumbnail to use, so we just call the `lazyTube` function with some extra callbacks:

```javascript
jQuery(document).ready(function($) {
  $('.demo05').lazyTube({
    thumbnailCode: function(el, id, thumbnail) {
      return '<img src="https://i.vimeocdn.com/video/'+ el.data('thumbnail') +'.jpg" alt="" />';
    },
    embedCode: function(el, width, height, id, flags) {
      return '<iframe src="https://player.vimeo.com/video/'+ id +'?title=0&byline=0&portrait=0" width="'+ width +'" height="'+ height +'" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
    }
  });
});
```

As you can see, as long as the embed code is known, any service can be supported if you provide the code to generate the required markup.

### Extending LazyTube ###

It's also posible to modify the plugin behaviour *if you know what you're doing*. Yay!

The videos can be loaded on, say a [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/) box, and all you have to do is create an special handling function as is shown:

```html
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
```

Check `index.html` for some live examples.

### Troubleshooting ###

This plugin works on IE7+, Firefox and Chrome. Opera should do too, but I don't really care.

Also, javascript is a must. If the user has javascript disabled, well, this won't work at all.