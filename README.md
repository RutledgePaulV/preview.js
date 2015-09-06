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
<script src="/path/to/bower_components/preview/preview.js"></script>
<script>
    preview.init({
        server: '//preview.io'
    });
</script>
```

```javascript
// amd style

// requirejs configuration
require.config({

    //...

    paths: {
        preview: 'preview/preview.js'
    },

    config: {
        preview: {
            server: '//preview.io'
        }
    }

    //...

});


// main file
define(['preview'], function() {

    // that's it. no need to call anything on preview, just make sure it gets loaded.

});

```


