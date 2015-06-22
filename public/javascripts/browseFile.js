document.addEventListener('DOMContentLoaded', function () {
    var fileuploader = new FileUploader(
        document.querySelector('input[type="file"]'),
        document.querySelector('ul'),
        document.querySelector('button')
    );
});

function FileUploader(inputElement, displayElement, submitElement) {
    // add an event listener for the file
    var files = [];
    this.files = files;
    var self = this;
    inputElement.addEventListener('change', function () {
        Array.prototype.forEach.call(this.files, function (file) {
            files.push(file);
        });
        displayElement.innerHTML = '';
        files.forEach(function (file) {
            var displayString = file.name + ', ' + file.type + ', ' + file.size;
            var li = createElement('li', displayElement, '', displayString);
            createDeleteButton(li);
        });

        console.log(files);
    });

    function createDeleteButton(li) {
        // create a delete button that will allow you to delete the li element based
        // on which button was clicked.
        createElement('button', li, '', 'Delete').addEventListener('click', function () {
            console.log(this); // print the button element
            var li = this.parentNode;
            var ul = li.parentNode;
            var children = Array.prototype.slice.call(ul.children);
            var index = children.indexOf(li);
            files.splice(index, 1); // remove the file from the list
            ul.removeChild(li); // remove the child from the ul
        });
    }

    // handle the form submit
    submitElement.addEventListener('click', self.submit.bind(self));
}

FileUploader.prototype.submit = function () {

    // create a formdata object
    var formdata = this.files.reduce(function (formdata, file) {
        formdata.append(file.name, file);
        return formdata;
    }, new FormData());

    console.log(formdata);

    // send it by doing a AJAX post
    makeAjaxCall('POST', '/files/upload', function (xhr) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }, formdata);
};

function makeAjaxCall(httpVerb, url, callback, data) {
    // accepts data as a string
    var xhr = new XMLHttpRequest();
    xhr.open(httpVerb, url);
    xhr.addEventListener('readystatechange', function () {
        if(xhr.readyState === 4) {
            callback(xhr);
        }
    });
    if(typeof data === 'undefined') xhr.send();
    else xhr.send(data);
}

function createElement(elementType, parent, className, innerHTML, custom) {
    var element = document.createElement(elementType);
    if (parent) parent.appendChild(element);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;

    if (typeof custom !== 'undefined') {
        for (var prop in custom) {
            element.setAttribute(prop, custom[prop]);
        }
    }

    return element;
}