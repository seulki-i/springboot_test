Handlebars.registerHelper('select', function (value, options) {
    var $el = $('<select />').html(options.fn(this));
    $el.find('[value="' + value + '"]').attr({'selected': 'selected'});
    return $el.html();
});

Handlebars.registerHelper("isOne", function (number, options) {
    if (1 === number) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isZero", function (number, options) {
    if (0 === number) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isNull", function (arg, options) {
    if (arg === null || arg === '') {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("json", function (data) {
    return JSON.stringify(data);
});

Handlebars.registerHelper("contains", function (list, value, options) {
    if ("string" === typeof list) {
        list = eval(list);
    }

    if (_.contains(list, value)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("equals", function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("notEquals", function (a, b, options) {
    if (a !== b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isBlank", function (value, options) {
    if (v.isBlank(value)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper("concat", function (a, b) {
    return a + b;
});

Handlebars.registerHelper("between", function (a, b, value, options) {
    if (a <= value <= b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
