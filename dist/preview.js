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
    var defaults = {width: 200, height: 130, readyCss: {color: 'green'}};
    var settings = $.extend({}, defaults, options);
    var isNotRelativePath = /(^\/\/.*)|(^http:\/\/)|(^https:\/\/)/;

    // inject a tiny bit of styling to the page
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.previewjs-thumbnail { position: absolute; display: none; background: #ccc; border: 1px solid }';
    document.getElementsByTagName('head')[0].appendChild(style);


    $(document).ready(function () {

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

        $('a[href]').each(function () {
            var anchor = $(this);
            getUri(anchor, function (result) {
                var path = settings.server + result;
                var thumbnail = $('<img class="previewjs-thumbnail" src="' + path + '" width="' + settings.width + '" height="' + settings.height + '"/>');
                $('body').append(thumbnail);
                thumbnail.hide();
                anchor.hover(function (e) {
                    $(thumbnail).css({left: e.pageX + 1, top: e.pageY + 1}).stop().show(100);
                }, function () {
                    $(thumbnail).hide();
                });
                anchor.css(settings.readyCss);
            });
        });

    });

}));