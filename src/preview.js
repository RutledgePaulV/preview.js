(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['module', 'jQuery'], function (module, jQuery) {
            return factory(module.config(), jQuery);
        });
    } else {
        root.preview = function (options) {
            return factory(options, options.jQuery || root.jQuery);
        }
    }

}(this, function (options, $) {

    var cache = {};
    var defaults = {width: 200, height: 130};
    var settings = $.extend({}, defaults, options);
    var isNotRelativePath = /(^\/\/.*)|(^http:\/\/)|(^https:\/\/)/;

    $(document).ready(function () {

        // parses the url from a given anchor and takes a callback for what to do with the server's result
        var getUri = function (anchor, callback) {
            var href = $(anchor).attr('href');
            var url;
            if (isNotRelativePath.test(href)) {
                url = href;
            } else {
                if (href.charAt(0) === '/') {
                    url = location.protocol + '//' + location.hostname + ':' + location.port + '/' + href;
                } else {
                    url = location.protocol + '//' + location.hostname + ':' + location.port + '/' + location.pathname;
                }
            }
            if (cache.hasOwnProperty(url)) {
                callback(cache[url]);
            } else {
                $.get(settings.server, {url: url}, function (result) {
                    cache[url] = result.uri;
                    callback(result.uri);
                });
            }
        };

        // loop over anchors on the page
        $('a[href]').each(function () {
            var anchor = $(this);
            getUri(anchor, function (result) {
                var path = settings.server + result;
                var thumbnail = $('<img src="' + path + '" width="' + settings.width + '" height="' + settings.height + '"/>');
                $('body').append(thumbnail);
                thumbnail.hide();
                anchor.hover(function (e) {
                    $(thumbnail).css({left: e.pageX + 1, top: e.pageY + 1}).stop().show(100);
                }, function () {
                    $(thumbnail).hide();
                });
            });
        });

    });

}));