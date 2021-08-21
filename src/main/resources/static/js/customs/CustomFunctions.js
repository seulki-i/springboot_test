
/**
 * 해당 Field가 하나가 아니면 오류를 발생시킨다.
 */
$.fn.assertOne = function (targetName) {
    if (this.length === 0) {
        if (targetName)

        throw new Error("대상 엘리먼트를 찾지 못했습니다.");
    } else if (this.length > 1) {
        if (targetName)

        throw new Error("대상 엘리먼트가 1개 이상 발견되었습니다.");
    }
};

/**
 * 해당 Field가 존재하지 않으면 오류를 발생시킨다.
 */
$.fn.assertOneMore = function (targetName) {
    if (this.length === 0) {
        if (targetName)

        throw new Error("대상 엘리먼트를 찾지 못했습니다.");
    }
};

$.scope = function (scopeNames, assert) {
    var target = $(document);

    if (scopeNames !== undefined) {
        var scopeNamesArray = scopeNames.split(".");

        var length = scopeNamesArray.length;

        if (length > 1) {
            for (var i in scopeNamesArray) {
                target = target.scope(scopeNamesArray[i], assert);
            }
        } else {
            target = target.scope(scopeNames, assert)
        }
    }

    return target;
};

$.getField = function (fieldName) {
    return $(document).getField(fieldName);
}

/**
 * 하위 엘리먼트 중 data-scope="scopeName" 을 가지고 있는 엘리먼트를 리턴한다.
 * assert 값이 false가 아니면, scope가 존재 하지 않을때 오류를 발생시킨다.
 * @param {string} scopeNames
 * @param {boolean=} assert
 * @returns {*}
 */
$.fn.scope = function (scopeNames, assert) {
    var target = $(this);

    if (scopeNames !== undefined) {
        var scopeNamesArray = scopeNames.split(".");

        var length = scopeNamesArray.length;

        if (length > 1) {
            for (var i in scopeNamesArray) {
                target = target.scope(scopeNamesArray[i], assert);
            }
        } else {
            target = target.find("[data-scope=" + scopeNames + "]");
        }
    } else {
        throw new Error("필수값이 전달되지 않았습니다. scopeNames");
    }

    return target;
};

$.fn.parentScope = function (scopeName, assert) {
    var _this = this;

    var scope = _this.closest("[data-scope=" + scopeName + "]");

    if (assert !== false) {
        scope.assertOneMore(scopeName);
    }

    return scope;
};

$.fn.hideScope = function (scopeName, assert) {
    var _this = this;

    var scope = _this.find("[data-scope=" + scopeName + "]");

    if (assert !== false) {
        scope.assertOneMore(scopeName);
    }

    scope.hide();

    return scope;
};

$.fn.showScope = function (scopeName, assert) {
    var _this = this;

    var scope = _this.find("[data-scope=" + scopeName + "]");

    if (assert !== false) {
        scope.assertOneMore(scopeName);
    }

    scope.show();

    return scope;
};

$.hasScope = function (scopeName) {
    var _this = $(document);

    var scope = _this.find("[data-scope=" + scopeName + "]");

    return scope.length > 0;
}

$.fn.hasScope = function (scopeName) {
    var _this = this;

    var scope = _this.find("[data-scope=" + scopeName + "]");

    return scope.length > 0;
};

/**
 * 하위 엘리먼트 중 data-template="templateName" 을 가지고 있는 엘리먼트를 리턴한다.
 * {template}이 존재 하지 않을때 오류를 발생시킨다.
 * @param {string} templateName
 * @param {number=} targetIndex
 * @returns {*}
 */
$.fn.template = function (templateName, targetIndex) {
    var _this = this;

    if (targetIndex === undefined) targetIndex = 0;

    var source = _this.find("[data-template=" + templateName + "]");

    // source.assertOne(templateName);

    return Handlebars.compile(source.eq(targetIndex).html());
};

/**
 * 하위 엘리먼트 중 동일 값을 가지는 엘리먼트를 체크하거나, 해당 엘리먼트에 이벤트를 등록한다.
 * @param value : function 이면 이벤트를 등록하고, 값이면 동일 값을 가진 체크박스를 체크한다.
 */
$.fn.check = function (value) {
    var _this = this;

    if ("boolean" === typeof value) {
        if (value) {
            _this.iCheck("check");
        } else {
            _this.iCheck("uncheck");
        }
    } else if ("function" === typeof value) {
        $.each(_this, function (i, e) {
            $(e).on("ifChecked", value);
            $(e).on("ifUnchecked", value);
        });
    } else {
        $.each(_this, function (i, e) {
            if ($(e).val().toString() === value.toString()) {
                $(e).prop("checked", true);
                $(e).iCheck("check");
            }
        });
    }
};

$.fn.checkFields = function (fieldName, value) {
    const _target = $(this).getFields(fieldName);

    _target.check(value);
}

/**
 * 필드 관련 함수..
 */
$.fn.hasField = function (fieldName, value) {
    if (value === undefined) {
        return this.find("[data-field=" + fieldName + "]").length > 0;
    } else {
        return this.find("[data-field=" + fieldName + "][value=" + value + "]").length > 0;
    }
};

/**
 * 필드값을 가지고 있는 {element}를 찾아 리턴한다.
 * @param fieldName {string}
 * @param value {(string|number)=}
 * @returns {*}
 */
$.fn.getField = function (fieldName, value) {
    var _this = this;

    if (value !== undefined) {
        if (value === "") value = "''";

        return _this.find("[data-field=" + fieldName + "][value=" + value + "]");
    } else {
        return _this.find("[data-field=" + fieldName + "]");
    }
};


/**
 * 필드값을 가지고 있는 {element}를 찾아 리턴한다.
 * @param fieldName ?{string}
 * @param value ?{string}
 * @returns {*}
 */
$.fn.getFields = function (fieldName, value) {
    var _this = this;

    if (fieldName) {
        // 필드명이 전달되면 해당 필드명의 필드를 리턴한다.
        var target;

        if (value) {
            target = _this.find("[data-field=" + fieldName + "][value=" + value + "]");
        } else {
            target = _this.find("[data-field=" + fieldName + "]");
        }

        target.assertOneMore(fieldName);

        return target;
    } else {
        // 필드명이 전달되지 않으면, 모든 필드를 리턴한다.
        return _this.find("[data-field]");
    }
};

$.getFieldValue = function (fieldName, assert) {
    var target = $.scope().getField(fieldName);

    if (assert !== false) {
        target.assertOne(fieldName);
    }

    var OUTPUT;

    if ("SELECT" === target.prop("tagName")) {
        OUTPUT = target.find("option:selected").val();
    } else {
        OUTPUT = target.val();
    }

    if (isNaN(OUTPUT) || v.isBlank(OUTPUT)) {
        return OUTPUT;
    } else {
        if (OUTPUT.length === parseInt(OUTPUT).toString().length) {
            return parseInt(OUTPUT);
        } else {
            return OUTPUT;
        }
    }
};

$.fn.getFieldValue = function (fieldName, assert) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    if (assert !== false) {
        target.assertOne(fieldName);
    }

    var OUTPUT;

    if ("SELECT" === target.prop("tagName")) {
        OUTPUT = target.find("option:selected").val();
    } else {
        OUTPUT = target.val();
    }

    if (isNaN(OUTPUT) || v.isBlank(OUTPUT)) {
        return OUTPUT;
    } else {
        if (OUTPUT.length === parseInt(OUTPUT).toString().length) {
            return parseInt(OUTPUT);
        } else {
            return OUTPUT;
        }
    }
};

$.fn.getFieldValues = function (fieldName) {
    var _this = this;

    var targets = _this.find("[data-field=" + fieldName + "]");

    targets.assertOneMore(fieldName);

    var OUTPUT = [];

    $.each(targets, function (i, e) {
        if (isNaN($(e).val()) || v.isBlank($(e).val())) {
            OUTPUT.push($(e).val());
        } else {
            if ($(e).val().length === parseInt($(e).val()).toString().length) {
                OUTPUT.push(parseInt($(e).val()));
            } else {
                OUTPUT.push($(e).val());
            }
        }
    });

    return OUTPUT;
};

$.fn.getFieldText = function (fieldName) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    target.assertOne(fieldName);

    var OUTPUT;

    if (target.prop("tagName") === "SELECT") {
        OUTPUT = target.find("option:selected").text();
    } else {
        OUTPUT = target.text();
    }

    return OUTPUT;
};

/**
 * 필드값을 가지고 있는 {element}를 찾아 숨긴다.
 * @param fieldName {string}
 * @param assert {boolean=}
 * @returns {*}
 */
$.fn.hideField = function (fieldName, assert) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    if (assert !== false) {
        target.assertOneMore(fieldName);
    }

    target.hide();

    return _this;
};

/**
 * 필드값을 가지고 있는 {element}를 찾아 숨긴다.
 * @param fieldName {string}
 * @param assert {boolean=}
 * @returns {*}
 */
$.fn.showField = function (fieldName, assert) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    if (assert !== false) {
        target.assertOneMore(fieldName);
    }

    target.show();

    return _this;
};

$.fn.hideFields = function (fieldName) {
    let _this = this;

    let fields;

    if (Array.isArray(fieldName)) {
        $.each(fieldName, function (i, name) {
            $(_this.find("[data-field=" + name + "]")).hide();
        });
    } else {
        fields = this.find("[data-field=" + fieldName + "]");

        fields.assertOneMore(fieldName);

        fields.hide();
    }

    return _this;
};

$.fn.showFields = function (fieldName) {
    let _this = this;

    let fields;

    if (Array.isArray(fieldName)) {
        $.each(fieldName, function (i, name) {
            $(_this.find("[data-field=" + name + "]")).show();
        });
    } else {
        fields = this.find("[data-field=" + fieldName + "]");

        fields.assertOneMore(fieldName);

        fields.show();
    }

    return _this;
};

$.fn.focusField = function (fieldName) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    target.assertOne(fieldName)

    target.focus();

    return _this;
};


$.fn.getComboText = function (fieldName) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    if (target.prop("tagName") !== "SELECT") {
        throw new Error("정의되지 않은 엘리먼트Type입니다.");
    }

    return target.children("option:selected").text();
};

$.fn.setFieldValue = function (fieldName, value) {
    if (v.isBlank(fieldName) || value === undefined) {
        throw new Error("필수값이 전달되지 않았습니다.");
    }

    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    $.each(target, function (i, e) {
        var _that = this;

        if (_that.tagName === "INPUT" && (_that.type === "radio" || _that.type === "checkbox")) {
            if (_that.type === "radio") {
                $(_that).val(value).trigger("change");
            } else if (_that.type === "checkbox") {
                $(_that).val(value).trigger("change");
            }
        } else if (_that.tagName === "INPUT" && (_that.type === "text" || _that.type === "hidden" || _that.type === "password")) {
            if ("datepicker" === $(_that).attr("data-field-format") || $(_that).parent().hasClass("input-daterange")) {
                $(_that).datepicker("setDate", value);
            } else {
                $(_that).val(value).trigger("change");
            }
        } else if (_that.tagName === "INPUT" && (_that.type === "number" || _that.type === "tel")) {
            $(_that).val(value).trigger("change");
        } else if (_that.tagName === "TEXTAREA") {
            $(_that).val(value).trigger("change");
        } else {
            throw new Error("정의되지 않은 엘리먼트Type입니다.");
        }
    }, target);

    return target;
};

$.fn.setFieldText = function (fieldName, text) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    target.text(text);
};

$.fn.clearFieldText = function (fieldName) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");

    target.text("");
};

/**
 * 하위 data-field attribute를 가지고 있는 모든 엘리먼트의 value를 JSON Object로 리턴한다.
 * @return {object}
 */
$.fn.getFieldParameters = function () {
    var _this = this;

    var PARAMETERS = {};

    $.each(_this.find("[data-field]"), function (i, e) {
        var _that = this;

        if (_that.tagName === "INPUT" && (_that.type === "radio" || _that.type === "checkbox")) {
            if (_that.type === "radio") {
                PARAMETERS[$(e).data("field")] = _this.find("input[data-field=" + $(e).data("field") + "]:checked").val();
            } else if (_that.type === "checkbox") {
                PARAMETERS[$(e).data("field")] =
                    // $.map(_this.find("input[data-field=" + $(e).data("field") + "]:checked"), function (element) {
                    //     return this.val();
                    // });
                    $.map(_this.find("input[data-field=" + $(e).data("field") + "]"), (object) => {
                        let valueIfTrue = $(object).attr("data-field-value-if-true");
                        let valueIfFalse = $(object).attr("data-field-value-if-false");
                        if (valueIfTrue === undefined) valueIfTrue = "Y";
                        if (valueIfFalse === undefined) valueIfFalse = "N";
                        return ($(object).prop("checked") ? valueIfTrue : valueIfFalse);
                    })[0];
            }
        }else {
            var value = $(e).val();

            if (v.isBlank(value)) { // 빈문자열은 null로 치환한다.
                value = null;
            }

            PARAMETERS[$(e).data("field")] = value;
        }
    });

    return PARAMETERS;
};


$.fn.fieldValidation = function () {
    var _this = this;

    var isValid = true;

    $.each(_this.find("[data-field]"), function (i, e) {
        var _that = this;

        var placeHolder = "";

        var label = "";

        var text = "";

        if ($(_that).attr("data-required") === "" && v.isBlank($(_that).val())) {

            swal({
                title: "필수값을 입력하세요.",
                type: "warning"
            }, function () {
                setTimeout(function () {
                    $(_that).focus();
                }, 150);
            })

            isValid = false;

            return false;
        } else if ($(_that).attr("data-required") === "" && $(_that).attr("data-validation-type") === "ip") {
            placeHolder = $(_that).attr("placeholder");

            label = $(_that).attr("data-label");

            text = v.isBlank(label) ? placeHolder : label;

            var checkIp = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;

            if (!checkIp.test($(_that).val())) {
                text = "'" + text + "' 형식이 맞지 않습니다.";

                _ALERT.error(text, function () {
                    setTimeout(function () {
                        $(_that).focus();
                    }, 150);
                });

                isValid = false;

                return false;
            }
        } else if ($(_that).attr("data-required") === "" && $(_that).attr("data-validation-type") === "phone") {
            placeHolder = $(_that).attr("placeholder");

            label = $(_that).attr("data-label");

            text = v.isBlank(label) ? placeHolder : label;

            var checkPhoneNumber = /^\d{2,3}-\d{3,4}-\d{4}$/;

            if (!checkPhoneNumber.test($(_that).val())) {
                text = "'" + text + "' 형식이 맞지 않습니다.";

                _ALERT.error(text, function () {
                    setTimeout(function () {
                        $(_that).focus();
                    }, 150);
                });

                isValid = false;

                return false;
            }
        }

    });

    return isValid;
};

/**
 * 필드값을 초기화 한다.
 */
$.fn.clearField = function (fieldName) {
    var _this = this;

    if (fieldName) {
        var _that = _this.find("[data-field=" + fieldName + "]");

        _that.assertOne(fieldName);

        if (_that.prop("tagName") === "INPUT") {
            if (_that.prop("type") === "radio") {
                _that.prop("checked", false);
            } else if (_that.prop("type") === "checkbox") {
                _that.prop("checked", false);
            } else {
                if (_that.attr("data-field-format") === "daterangepicker") {
                    _DATERANGEPICKER.clear(_that);
                } else {
                    _that.val("");
                }
            }
        } else if (_that.prop("tagName") === "SELECT") {
            _SELECT.changeAtFirstOption(_that);
        } else if (_that.prop("tagName") === "TEXTAREA") {
            _that.val("");
        }

        return _that;
    } else {
        if (_this.prop("tagName") === "INPUT") {
            if (_this.prop("type") === "radio") {
                _this.prop("checked", false);
            } else if (_this.prop("type") === "checkbox") {
                _this.prop("checked", false);
            } else {
                if (_this.attr("data-field-format") === "daterangepicker") {
                    _DATERANGEPICKER.clear(_this);
                } else {
                    _this.val("");
                }
            }
        } else if (_this.prop("tagName") === "SELECT") {
            _SELECT.changeAtFirstOption(_this);
        } else if (_this.prop("tagName") === "TEXTAREA") {
            _this.val("");
        }

        return _this;
    }
};

/**
 * 필드값을 초기화 한다.
 * @param skipHidden // inputType이 hidden이면 해당 필드 값은 초기화 하지 않는다.
 */
$.fn.clearFields = function (skipHidden) {
    var _this = this;

    $.each(_this.find("[data-field]"), function (i, e) {
        var _that = this;

        if (_that.tagName === "INPUT") {
            if (_that.type === "radio") { // 같은 필드값의 가장 첫번째 체크 박스를 체크한다.
                var fieldName = $(_that).attr("data-field");

                _this.getField(fieldName).first().prop("checked", true).iCheck("update");
                _this.getField(fieldName).not(":first").prop("checked", false).iCheck("update");
            } else if (_that.type === "checkbox") {
                $(_that).prop("checked", false).iCheck("update");
            } else if (_that.type === "hidden") {
                if (!skipHidden) {
                    $(_that).val("");
                }
            } else {
                if ($(_that).attr("data-field-format") === "daterangepicker") {
                    _DATERANGEPICKER.clear($(_that));
                } else {
                    $(_that).val("");
                }
            }
        } else if (_that.tagName === "SELECT") {
            _SELECT.changeAtFirstOption($(_that));
        } else if (_that.tagName === "TEXTAREA") {
            $(_that).val("");
        }
    });
};

$.fn.fillFields = function (data, callbackFunc) {
    var _this = this;

    if (!$.isPlainObject(data)) {
        throw "Function을 수행할 수 없습니다.";
    }

    $.each(data, function (k, v) {

        var _that = _this.find("[data-field=" + k + "]");

        if ("daterangepicker" === _that.attr("data-field-format")) {
            var dataEndField = _that.attr("data-end-field");

            if (dataEndField in data) {
                _that.data("daterangepicker").setStartDate(v);
                _that.data("daterangepicker").setEndDate(data[dataEndField]);
            }
        } else
        if ("datepicker" === _that.attr("data-field-format")) {
            _that.datepicker("setDate", v);
        } else if ("timepicker" === _that.attr("data-field-format")) {
            _that.val(v).trigger("change");
        } else if ("editor" === _that.attr("data-field-format")) {
            _EDITOR.setHtml(_that.get(0), v);
        } else if (_that.prop("tagName") === "INPUT" && (_that.prop("type") === "radio" || _that.prop("type") === "checkbox")) {
            $.each(_that, function (i, o) {
                if ($(o).attr("data-field-format") === "checkbox") {
                    let valueIfTrue = $(o).attr("data-field-value-if-true");
                    if (valueIfTrue === undefined) valueIfTrue = "Y";

                    const checked = valueIfTrue === v;
                    if (checked) {
                        $(o).iCheck("check");
                    } else {
                        $(o).iCheck("uncheck");
                    }
                } else if ($(o).attr("data-field-format") === "radio") {
                    const checked = $(o).val() === v;

                    if (checked) {
                        $(o).iCheck("check");
                    } else {
                        $(o).iCheck("uncheck");
                    }
                } else if ($(o).prop("type") === "checkbox") { /* non-iCheck checkbox */
                    let valueIfTrue = $(o).attr("data-field-value-if-true");
                    if (valueIfTrue === undefined) valueIfTrue = "Y";
                    $(o).prop("checked", valueIfTrue === v);
                } else {
                    $(o).prop("checked", $(o).val() === v).trigger("change");
                }
            });
        } else if (_that.prop("tagName") === "SELECT") {
            _SELECT.changeValue(_that, v);
        } else {
            _that.val(v);
        }
    });

    if (undefined !== callbackFunc) {
        callbackFunc();
    }
};

/**
 * 필드 변경 이벤트를 추가한다.
 * @param fieldName 필드명
 * @param callBackFunc 변경 이벤트, 전달되지 않으면 변경 이벤트를 발생시킨다.
 * @param addEvent 이전 이벤트에 추가할지 지정한다. 지정하지 않거나 false를 지정하면 이전 이벤트를 지우고 새로 등록한다.
 */
$.fn.changeField = function (fieldName, callBackFunc, addEvent) {
    var $target = this.find("[data-field=" + fieldName + "]");

    $target.assertOne(fieldName);

    if (callBackFunc) {
        if ($target.attr("data-field-format") === "select") {
            _SELECT.change($target, callBackFunc, addEvent);
        } else
        if ($target.attr("data-field-format") === "daterangepicker") {
            _DATERANGEPICKER.change($target, callBackFunc, addEvent);
        } else {
            if (addEvent !== true) {
                // overwrite
                $target.off("change").change(callBackFunc);
            } else {
                $target.change(callBackFunc);
            }
        }
    } else {
        $target.change();
    }
};

$.fn.changeFields = function (fieldName, callBackFunc, addEvent) {
    this.find("[data-field=" + fieldName + "]").each(function (index, element) {
        var $target = $(element);

        if (callBackFunc) {
            if ($target.attr("data-field-format") === "select") {
                _SELECT.change($target, callBackFunc, addEvent);
            } else
            if ($target.attr("data-field-format") === "daterangepicker") {
                _DATERANGEPICKER.change($target, callBackFunc, addEvent);
            } else {
                if (addEvent !== true) {
                    // overwrite
                    $target.off("change").change(callBackFunc);
                } else {
                    $target.change(callBackFunc);
                }
            }
        } else {
            $target.change();
        }
    });
};

$.fn.bindCombo = function (data, type) {
    _SELECT.bindOptions(this, data, type);
};

/**
 * @param disabled {boolean}
 */
$.fn.disabled = function (disabled) {
    if ("SELECT" === this.prop("tagName")) {
        _SELECT.disabled(this, disabled);
    } else {
        this.prop("disabled", disabled);
    }
};

$.fn.isDisabled = function () {
    return this.is(":disabled");
};

$.fn.fieldsDisabled = function (disabled) {
    var fields = this.find("[data-field]");

    if (undefined === disabled) disabled = true;

    fields.disabled(disabled);
};

$.fn.toggleDisabled = function () {
//  chosen -> .select2
    // this.prop("disabled", !this.prop("disabled"));
    //
    // this.trigger("chosen:updated");
    if ("SELECT" === this.prop("tagName")) {
        _SELECT.toggleDisabled(this);
    } else {
        this.prop("disabled", !this.prop("disabled"));
    }
};

$.fn.fieldsToggleDisabled = function () {
    var targets = this.find("[data-field]");

    $.each(targets, function (i, e) {
        $(e).toggleDisabled();
    });
};


/**
 * this element 하위 자식중 버튼을 찾아 리턴한다.
 * @param buttonName
 * @param assert - 필수 (true면 필수체크)
 * @returns {*}
 */
$.fn.getButton = function (buttonName, assert) {
    var button = this.find("[data-button=" + buttonName + "]");

    if (assert) {
        button.assertOne(buttonName);
    }

    return button;
};

$.fn.hideButton = function (buttonName, assert) {
    var button = this.find("[data-button=" + buttonName + "]");

    if (assert) {
        button.assertOne(buttonName);
    }

    button.hide();

    return this;
};

$.fn.showButton = function (buttonName) {
    var button = this.find("[data-button=" + buttonName + "]");

    button.assertOne(buttonName);

    button.show();

    return this;
};

$.fn.getButtons = function (buttonName, assert) {
    if (buttonName) {
        var buttons = this.find("[data-button=" + buttonName + "]");

        if (assert) {
            buttons.assertOneMore(buttonName);
        }

        return buttons;
    } else {
        return this.find("[data-button]");
    }
};

$.fn.hideButtons = function (buttonName) {
    var _this = this;

    var buttons;

    if (Array.isArray(buttonName)) {
        $.each(buttonName, function (i, name) {
            $(_this.find("[data-button=" + name + "]")).hide();
        });
    } else {
        buttons = this.find("[data-button=" + buttonName + "]");

        buttons.assertOneMore(buttonName);

        buttons.hide();
    }

    return _this;
};

$.fn.showButtons = function (buttonName) {
    var _this = this;

    var buttons;

    if (Array.isArray(buttonName)) {
        $.each(buttonName, function (i, name) {
            $(_this.find("[data-button=" + name + "]")).show();
        });
    } else {
        buttons = this.find("[data-button=" + buttonName + "]");

        buttons.assertOneMore(buttonName);

        buttons.show();
    }

    return _this;
};

/**
 * 버튼 클릭 이벤트를 실행하거나 등록한다.
 * @param buttonName - 클릭할 버튼명
 * @param callBack - 클릭이벤트
 * @param assert - 필수 (true면 필수체크)
 * @returns {$}
 */
$.fn.clickButton = function (buttonName, callBack, assert) {
    var button = this.find("[data-button=" + buttonName + "]");

    if (assert) {
        button.assertOne(buttonName);
    }

    if (callBack) {
        // 콜백 함수가 존재하면, 이벤트를 등록한다.
        button.off("click").click(callBack);
    } else {
        // 콜백 함수가 없으면 버튼을 클릭한다.
        button.click();
    }

    return this;
};

/**
 * 버튼 클릭 이벤트를 실행하거나 등록한다.
 * @description data-button 속성은 BUTTON, INPUT CHECK BOX, INPUT RADIO 엘리먼트에 할당할 수 있다.
 * @param buttonName - 클릭할 버튼명
 * @param callBack - 클릭이벤트
 * @returns {$}
 */
$.fn.clickButtons = function (buttonName, callBack) {
    var buttons = this.find("[data-button=" + buttonName + "]");

    buttons.each(function (i, button) {
        if (callBack) {
            // 콜백 함수가 존재하면, 이벤트를 등록한다.
            if ("BUTTON" === $(button).prop("tagName") || ("INPUT" === $(button).prop("tagName") && ("button" === $(button).prop("type")))) {
                $(button).off("click").click(callBack);
            } else if ("INPUT" === $(button).prop("tagName") && ("checkbox" === $(button).prop("type") || "radio" === $(button).prop("type"))) {
                $(button).off("click").click(callBack);

                if ($(button).attr("data-field-format") === "checkbox") { // 해당 엘리먼트가 CHECKBOX 일때, iCheck 이벤트 추가.
                    $(button).on("ifChecked", callBack);
                    $(button).on("ifUnchecked", callBack);
                } else if ($(button).attr("data-field-format") === "radio") { // 해당 엘리먼트가 RADIO 일때, iCheck 이벤트 추가.
                    $(button).on("ifChecked", callBack);
                }
            } else {
                $(button).off("click").click(callBack);
            }
        } else {
            // 콜백 함수가 없으면 버튼을 클릭한다.
            $(button).click();
        }
    });

    return this;
};

/**
 * 해당 객체의 데이터 값을 리턴, 값이 없다면 자식 엘리먼트에서 찾는다.
 * @param name
 * @returns {*}
 */
$.fn.getData = function (name) {
    var k_name = v.kebabCase(name);

    var target = this.attr("data-" + k_name);

    if (target === undefined) {
        target = this.find("[data-" + k_name + "]");

        target.assertOne(name);

        return target.attr("data-" + k_name);
    } else {
        return target;
    }
};

$.fn.format = function (type) {
    var _this = this;

    if ("TIMEPICKER" === type || undefined === type) {
        _this.formatTimepicker();
    }

    if ("DATEPICKER" === type || undefined === type) {
        _this.formatDatepicker();
    }

    if ("DATERANGEPICKER" === type || undefined === type) {
        _this.formatDaterangepicker();
    }

    if ("SELECT" === type || undefined === type) {
        _this.formatSelect();
    }

    if ("CHECKBOX" === type || undefined === type) {
        _this.formatCheckbox();
    }

    if ("RADIO" === type || undefined === type) {
        _this.formatRadio();
    }

    if ("IP" === type || undefined === type) {
        _this.formatIpAddress();
    }

    if ("PHONE" === type || undefined === type) {
        _this.formatPhone();
    }

    if ("DATE" === type || undefined === type) {
        _this.formatDate();
    }

    if ("DATERANGE" === type || undefined === type) {
        _this.formatDaterange();
    }

    if ("EDITOR" === type || undefined === type) {
        _this.formatEditor();
    }
};


$.fn.formatTimepicker = function () {
    var targets = this.find("[data-field-format=timepicker]");

    if (targets.length) {
        const config = {
            'timeFormat': 'H:i',
            "wrapHours": false,
            "lang": { am: 'am', pm: 'pm', AM: 'AM', PM: 'PM', decimal: '.', mins: '분', hr: '시간', hrs: '시간' }
        };
        $.each(targets, function (i, e) {
            _FORM.timepicker(e, config);
        })
    }
};

$.fn.formatDatepicker = function () {
    var targets = this.find("[data-field-format=datepicker]");

    if (targets.length) {
        // const defaultConfig = {
        //     "language": $("html").attr("lang"),
        //     "format": _DATES.DEFAULT_FORMAT.toLowerCase(),
        //     "todayBtn": "linked",
        //     "autoclose": true,
        //     "clearBtn": true,
        //     "todayHighlight": true,
        //     "templates": {
        //         "leftArrow": '<i class="fal fa-chevron-left"></i>',
        //         "rightArrow": '<i class="fal fa-chevron-right"></i>'
        //     }
        // };
        // $.each(targets, function (index, element) {
        //     const config = _.clone(defaultConfig);
        //     _FORM.datepicker(element, config);
        // });
        targets.datepicker({
            language : 'ko',
            format: 'yyyy-mm-dd',
            todayBtn: 'linked',
            autoclose: true,
            clearBtn: true,
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="fas fa-chevron-left"></i>',
                rightArrow: '<i class="fas fa-chevron-right"></i>'
            }
        });
    }
};

$.fn.formatDaterangepicker = function () {
    this.find("[data-field-format=daterangepicker]").each(function (index, element) {
        _DATERANGEPICKER.initialize($(element));
    });
};

$.fn.formatSelect = function () {
    this.find("[data-field-format=select]").each(function (index, element) {
        _SELECT.initialize($(element));
    });
};

$.fn.formatCheckbox = function (options) {
    var defaultOptions = {};

    if (this.attr("data-field-format") === "checkbox") {
        if (undefined !== this.attr("data-checkbox-class") && "" === this.attr("data-checkbox-class")) {
            defaultOptions.checkboxClass = this.attr("data-checkbox-class");
        } else {
            defaultOptions.checkboxClass = "icheckbox_flat-blue";
        }

        this.iCheck(_.extend(defaultOptions, options));

        this.on("ifChanged", function (evt) {
            $(this).iCheck("update");
        });
    } else {
        var target = this.find("[data-field-format=checkbox]");

        $.each(target, function (i, obj) {
            obj = $(obj);

            if (undefined !== obj.attr("data-checkbox-class") && "" !== obj.attr("data-checkbox-class")) {
                defaultOptions.checkboxClass = obj.attr("data-checkbox-class");
            } else {
                defaultOptions.checkboxClass = "icheckbox_flat-blue";
            }

            obj.iCheck(_.extend(defaultOptions, options));

            obj.on("ifChanged", function () {
                obj.iCheck("update");
            });
        });
    }
};

$.fn.formatRadio = function () {
    if (this.attr("data-field-format") === "radio") {
        this.iCheck({
            radioClass: 'iradio_flat-blue'
        });
    } else {
        var target = this.find("[data-field-format=radio]");

        if (target.length > 0) {
            target.iCheck({
                radioClass: 'iradio_flat-blue'
            });
        }
    }
};

/**
 * 페이지네이션을 추가한다.
 */
$.fn.pagination = function (options) {
    const _this = this;
    const scopeNames = (null != options && null != options.scopeNames ? options.scopeNames : "pagination");
    _this.scope(scopeNames).twbsPagination("destroy");
    _this.setFieldText("totalCount", options.totalCount + "건");
    const defaultOptions = {
        startPage: Number(options.currentPage || 1),
        totalPages: options.totalPage || 1,
        visiblePages: 10,
        itemOnPage: 10,
        initiateStartPageClick: false,
        first: '&laquo;&laquo;',
        prev: '&laquo;',
        next: '&raquo;',
        last: '&raquo;&raquo;',
        onPageClick: options.onPageClick || function() {}
    };

    if (options !== "destroy") {

        options = _.extend(defaultOptions, options);

        this.scope(scopeNames).twbsPagination(options);

        this.scope(scopeNames).find("ul").addClass("pagination").addClass("justify-content-center");
    }
};

/*
 * 현재 조회된 페이지를 조회한다.
 */
$.fn.currentPage = function (options) {
    const scopeNames = (null != options && null != options.scopeNames ? options.scopeNames : "pagination");

    return this.scope(scopeNames).twbsPagination('getCurrentPage');
}

/**
 * 필드 키입력 이벤트.
 */
$.fn.pressEnterOnFields = function (callBackFunc) {
    const $target = this.find("[data-field]");

    $target.keypress(function (evt) {
        if (evt.keyCode === 13) {
            callBackFunc();
        }
    });
};

/**
 * 콤보 필드 변경 이벤트.
 */
$.fn.changeOnSelectFields = function (callBackFunc) {
    var target = this.find("select[data-field]");

    target.change(function () {
        callBackFunc();
    });
};


/**
 * 클릭 이벤트를 바인딩 한다.
 * 해당 엘리먼트의 하위 TR 엘리먼트가 클릭되면, selected 클래스를 토글한다.
 * @param isMultiple
 * @param callBackFunc // callBackFunc의 this는 해당 Tr Element를
 */
$.fn.bindSelected = function (isMultiple, callBackFunc) {
    const _this = this;
    let target;

    if (_this.prop("tagName") === "TABLE") {
        target = _this.find("tbody>tr");
    } else if (_this.prop("tagName") === "TBODY") {
        target = _this.find("tr");
    } else {
        target = _this.find("tbody>tr");
    }

    if (isMultiple !== false) {
        target.click(function (evt) {
            const _that = $(this);

            if (evt.target.tagName === "TR" || evt.target.tagName === "TD") {
                _that.toggleClass("bg-info-50");

                if (undefined !== callBackFunc) {
                    callBackFunc.apply(_that);
                }
            }
        });
    } else {
        target.click(function (evt) {
            const _that = $(this);

            if (evt.target.tagName === "TR" || evt.target.tagName === "TD") {
                _that.addClass("bg-info-50");
                _that.siblings().removeClass("bg-info-50");

                if (undefined !== callBackFunc) {
                    callBackFunc.apply(_that, [evt]);
                }
            }
        });
    }

    target.format("CHECKBOX");
};

/**
 * 해당 엘리먼트의 선택된 TR 엘리먼트를 가지고 있는 TR 엘리먼트가 존재하면 true IF NOT false
 * @returns boolean
 */
$.fn.hasSelectedTrElements = function () {
    var _this = this;

    return _this.getSelectedTrElementsValues().length >= 1;
};

$.fn.getSelectedTrElements = function () {
    var _this = this;

    return _this.find("tr.bg-info-50");
};

$.fn.removeSelectedTrElements = function () {
    const _this = this;

    _this.getSelectedTrElements().remove();
};

/**
 * 해당 엘리먼트의 선택된(selected 클래스를 가지고 있는) TR 엘리먼트의 field 데이터를 리턴한다.
 * @param fieldName 이 전달되지 않으면 존재하는 모든 field 값을 포함하여 리턴한다.
 * @returns {[]}
 */
$.fn.getSelectedTrElementsValues = function (fieldName) {
    var _this = this;

    var selectedRows = _this.getSelectedTrElements();

    var output = [];

    if (fieldName === undefined) {
        $.each(selectedRows, function () {
            var _that = $(this);

            output.push(_that.getFieldParameters());
        });
    } else {
        $.each(selectedRows, function () {
            var _that = $(this);

            output.push(_that.getFieldValue(fieldName));
        });
    }

    return output;
};

$.fn.getSelectedTrElementValue = function (fieldName) {
    var _this = this;

    var selectedRow = _this.getSelectedTrElements();

    selectedRow.assertOne();

    if (fieldName === undefined) {
        return selectedRow.getFieldParameters();
    } else {
        return selectedRow.getFieldValue(fieldName);
    }
};

/**
 * 해당 엘리먼트의 선택된(selected 클래스를 가지고 있는) TR 엘리먼트의 selected 클래스를 제거한다.
 */
$.fn.clearSelected = function () {
    var _this = this;

    var selectedRows = _this.find("tr.bg-info-50");

    selectedRows.removeClass("bg-info-50");
};

/**
 * 해당 엘리먼트의 체크된 체크박스를 가지고 있는 TR 엘리먼트를 리턴한다..
 * @returns {[]}
 */
$.fn.getCheckedTrElements = function () {
    var _this = this;

    if ("TBODY" !== _this.prop("tagName")) {
        _this = _this.find("tbody");
    }

    var checkedCheckbox = _this.find("tr input[type=checkbox]:checked");

    return checkedCheckbox.closest("tr");
};

/**
 * 해당 엘리먼트의 체크된 체크박스를 가지고 있는 TR 엘리먼트가 존재하면 true IF NOT false
 * @returns boolean
 */
$.fn.hasCheckedTrElements = function () {
    var _this = this;

    return _this.getCheckedTrElements().length >= 1;
};


/**
 * 해당 엘리먼트의 TR 엘리먼트가 존재한면  true IF NOT false
 * @returns boolean
 */
$.fn.hasTrElements = function () {
    var _this = this;

    return _this.getTrElements().length > 0;
};

$.fn.getTrElements = function () {
    var _this = this;

    return _this.find("tbody>tr");
};

/**
 * 해당 FieldValue 엘리먼트 존재여부 true OR false;
 * @returns boolean
 * */
$.fn.getFieldElements = function (fieldName) {
    var _this = this;

    var target = _this.find("[data-field=" + fieldName + "]");
    var OUTPUT;

    if (target.length === 0 || target.length > 1) {
        OUTPUT = false;
    } else {
        OUTPUT = true;
    }
    return OUTPUT;
};

$.fn.clearTable = function (scopeName) {
    const _this = $(this);

    _this.scope("criteria").clearFields();

    if (undefined === scopeName) scopeName = "result-body";

    const template = _this.template("result-body");

    _this.scope("result-body").html(template([]));

    _this.pagination({
        totalPage: 1,
        currentPage: 1,
        totalCount: 0,
        visiblePages: 5
    });
}

