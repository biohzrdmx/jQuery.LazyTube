/**
 * jQuery.lazyTube
 * On-demand loading for YouTube videos, with support for other services by custom callbacks
 * Avoid hanging your client's browsers by loading YouTube videos ONLY when they want to watch them
 * @version  1.1
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
				width = el.data('width') || '480',
				height = el.data('height') || '270',
				target = el.data('target') || 'self',
				flags = el.data('flags') || null,
				preview = el.children('.preview');
			//
			if (preview.length == 0) {
				preview = $('<a href="#" class="preview"></a>');
				el.prepend(preview);
			}
			var previewMarkup = opts.thumbnailCode(el, id, thumbnail);
			preview.append(previewMarkup);
			//
			preview.on('click', function(e) {
				switch (target) {
					case 'self':
						var flags = flags || 'rel=0&wmode=transparent' + (autoplay == 'yes' ? '&autoplay=1' : ''),
							embedMarkup = opts.embedCode(el, width, height, id, flags),
							embedElement = null;
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
			thumbnailCode: function(el, id, thumbnail) {
				return '<img src="https://img.youtube.com/vi/'+ id +'/'+ thumbnail +'.jpg" alt="" />';
			},
			embedCode: function(el, width, height, id, flags) {
				return '<div class="embed"><iframe width="'+ width +'" height="'+ height +'" src="https://www.youtube-nocookie.com/embed/'+ id +'?'+ flags +'" frameborder="0" allowfullscreen></iframe></div>';
			}
		}
	};
})(jQuery);