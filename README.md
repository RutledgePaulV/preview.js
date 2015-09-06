## preview.js

Preview is a small javascript file that you can include on any site in order to add
on-hover thumbnails for publicly available links. Preview can be configured to
point at any server running [preview-server](https://github.com/rutledgepaulv/preview-server).


### usage
```bash
bower install --save preview.js
```


```html
<!-- global style -->
<script src="/path/to/bower_components/preview/dist/preview.min.js"></script>
<script>
    // if you were running preview-server via docker-machine (with the default VirtualBoxVM IP)...
    preview({server: 'http://192.168.99.100/'});
</script>
```

```javascript
// amd style

// requirejs configuration
require.config({

    //...

    paths: {
        jQuery: 'jquery/dist/jquery.min',
        preview: 'preview/dist/preview.min'
    },

    config: {
        preview: {
            server: 'http://192.168.99.100/'
        }
    }

    //...

});


// main file
define(['preview'], function() {

    // that's it. no need to call anything on preview, just make sure it gets loaded.

});

```


