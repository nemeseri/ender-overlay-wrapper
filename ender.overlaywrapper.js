/*!
  * Ender-Overlay-Wrapper: jQuery UI Dialog syntax for Ender-overlay
  * copyright Andras Nemeseri @nemeseri 2012 | License MIT
  * https://github.com/nemeseri/ender-overlay-wrapper
  */
!function ($) {

	function extend() {
		// based on jQuery deep merge
		var options, name, src, copy, clone,
			target = arguments[0], i = 1, length = arguments.length;

		for (; i < length; i += 1) {
			if ((options = arguments[i]) !== null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					if (copy && (is.obj(copy))) {
						clone = src && is.obj(src) ? src : {};
						target[name] = extend(clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	}

	// from jquery
	function proxy(fn, context) {
		var slice = Array.prototype.slice,
			args = slice.call(arguments, 2);
		return function () {
			return fn.apply(context, args.concat(slice.call(arguments)));
		};
	}

	/*
		Dialog Wrapper
	*/
	function Dialog(el, settings) {
		this.init(el, settings);
	}

	Dialog.prototype = {
		template: '<div class="ui-dialog ui-widget ui-widget-content ui-corner-all" ' +
			'tabindex="-1" role="dialog" aria-labelledby="ui-dialog-title-dialog">' +
			'<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">' +
				'<span class="ui-dialog-title"></span>' +
				'<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button">' +
					'<span class="ui-icon ui-icon-closethick"><%= closeText %></span>' +
				'</a>' +
			'</div>' +
		'</div>',
		contentClass: "ui-dialog-content ui-widget-content",

		init: function ($el, options) {
			this.options = {
				disabled: false,
				autoOpen: true,
				buttons: {},
				closeOnEscape: true,
				closeText: "close",
				dialogClass: "",
				draggable: false,
				height: "auto",
				hide: null,
				maxHeight: false,
				maxWidth: false,
				minHeight: 150,
				minWidth: 150,
				modal: false,
				position: "center",
				resizable: false,
				show: null,
				stack: true,
				title: "",
				width: 300,
				zIndex: 1000
			};
			extend(this.options, options || {});

			var opt = this.options,
				title = "",
				enderOverlay,
				eOpt = {
					close: ".ui-dialog-titlebar-close",
					showMask: false,
					autoOpen: true,
					allowMultipleDisplay: true,
					cssClass: "",
					zIndex: 1000,
					animationIn: "none",
					animationOut: "none"
				};

			this.setupDialog($el);
			this.$dialog.overlay(eOpt);
		},

		setupDialog: function ($el) {
			var opt = this.options;

			// setup dialog element
			$el.addClass(this.contentClass);
			title = $el.attr("title");
			$el.removeAttr("title");

			if (opt.title) {
				title = opt.title;
			}

			// setup template as ender overlay element
			this.template = this.template.replace("<%= closeText %>", opt.closeText);
			this.$dialog = $(this.template);
			this.$dialog.find(".ui-dialog-title").html(title);
			this.$dialog
				.addClass(opt.dialogClass)
				.css({
					outline: 0
				})
				.append($el);
		}
	}

	$.fn.dialog = function (options) {
		this.each(function (el) {
			var d = new Dialog($(el), options);
		});

		return this;
	};

}(window.ender || window.jQuery);