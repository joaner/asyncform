# async form

## examples

see examples/index.html;

```javascript
document.forms[0].async({
    error: function(e) {
        console.log(e);
        alert(e);
    },
    success: function(response) {
        alert(response.title);
    }
});
```
