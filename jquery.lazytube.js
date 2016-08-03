/**
 * jQuery.lazyTube
 * On-demand loading for YouTube videos
 * Avoid hanging your client's browsers by loading YouTube videos ONLY when they want to watch them
 * @version  1.0
 * @author   biohzrdmx <github.com/biohzrdmx>
 * @requires jQuery 1.8+
 * @license  MIT
 */
;(function($) {
	$.fn.lazyTube = function(options) {
	if (!this.length) { return this; }
		var opts = $.extend(true, {}, $.lazyTube.defaults, options);
		this.each(function() {
			var el = $(this),
				id = el.data('id') || null,
				thumbnail = el.data('thumbnail') || 'mqdefault',
				autoplay = el.data('autoplay') || 'no',
				autoload = el.data('autoload') || false,
				width = el.data('width') || '320',
				height = el.data('height') || '240',
				target = el.data('target') || 'self',
				preview = el.children('.preview');
			//
			if (preview.length == 0) {
				preview = $('<a href="#" class="preview"></a>');
				el.prepend(preview);
			}
			//
			preview.append('<img src="//img.youtube.com/vi/' + id + '/' + thumbnail + '.jpg" alt="" />');
			//
			preview.on('click', function(e) {
				switch (target) {
					case 'self':
						var embedMarkup = opts.embedCode,
							embedElement = null,
							flags = 'rel=0&wmode=transparent';
						flags += autoplay == 'yes' ? '&autoplay=1' : '';
						embedMarkup = embedMarkup.replace('{width}', width).replace('{height}', height).replace('{id}', id).replace('{flags}', flags);
						embedElement = $(embedMarkup);
						preview.hide();
						el.append(embedElement);
						break;
					default:
						var handler = opts.targetHandlers[target];
						if ( typeof handler == 'function' ) {
							handler.call(el, opts, {
								id: id,
								width: width,
								height: height,
								autoplay: autoplay
							});
						}
				}
				e.preventDefault();
			});
			//
			if (autoload == 'yes') {
				$(window).on('load', function() {
					preview.trigger('click');
				});
			}
		});
		return this;
	};
	// default options
	$.lazyTube = {
		defaults: {
			targetHandlers: {},
			embedCode: '<div class="embed"><iframe width="{width}" height="{height}" src="//www.youtube-nocookie.com/embed/{id}?{flags}" frameborder="0" allowfullscreen></iframe></div>'
		}
	};
})(jQuery);