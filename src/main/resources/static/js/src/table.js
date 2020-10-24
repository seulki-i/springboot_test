$(document).ready(function () {
    Page.init();
});

const Page = {
    init: function () {
        TableScope.init();
    }
};

const TableScope = {
    $el: $("#TableScope"),

    init: function () {
        const _this = this;

        _this.bind.buttons(_this);

        _this.reload();
    },

    bind: {
        buttons: function (_this) {
            $("#reloadBtn").on("click", function () {
                _this.reload();
            });

        }

    },

    reload: function () {
        console.log("로드");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/test",
            dataType: 'json',
            // data: ,
            success: function success(response) {

                const source = _this.$el.find("[data-template=result-body]");

                const template = Handlebars.compile(source.html());

                _this.$el.find("[data-scope=result-body]").html(template(response));

            }
        });
    }
}