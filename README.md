# SnapMobile-FileUpload

# Usage

Include this private module by adding the following under `dependencies` in `package.json`, and run `npm install`.

    "snapmobile-fileupload": "git+ssh://@github.com/SnapMobileIO/SnapMobile-FileUpload.git",

To configure, add the following to `app.js`:

    import 'snapmobile-fileupload';
    
Finally, add 'FileUploadModule' as a dependency for the angular app.

# CSS

Add the following CSS to your project or add your own. Almost every element has a class on it, so you should be able to do a lot with CSS.

```CSS
.file-upload{

  .drop-box {
    background: #F8F8F8;
    border: 5px dashed #DDD;
    width: 100%;
    text-align: center;
    padding: 25px 12px;
    line-height: auto;
    height: auto;
    cursor: pointer;
  }
  
  .dragover {
    border: 5px dashed blue;
  }
  
  .disabled {
    opacity: 0.5;
  }
  
  .enabled {
    opacity: 1.0;
  }

}
```

# Updating

Make any changes in `/src`.

Once changes are completed, run `gulp dist` to process JavaScript files and add to `/dist`.

