(function(w){
    var asyncForm = function(form, options) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'asyncform_' + Math.random();
        document.body.appendChild(iframe);

        form.target = iframe.name;

        this.listen = function() {
            iframe.addEventListener('load', function(e) {
                try {
                    var response = iframe.contentDocument.body.innerText;
                    try {
                        json = JSON.parse(response);
                    } catch (e) {
                        console.error(e);
                        throw "can't parse response content as json";
                    }
                    options.success(json);
                } catch (e) {
                    options.error(e);
                }
                document.body.removeChild(iframe);
            }, false);
        }
    }
    HTMLFormElement.prototype.async = function(options) {
        this.addEventListener('submit', function(e){
            async = new asyncForm(this, options);
            async.listen();
        }, false);
    }
})(window);
