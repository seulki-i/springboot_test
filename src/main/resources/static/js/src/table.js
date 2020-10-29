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
    interval: null,

    init: function () {
        const _this = this;

        _this.bind.buttons(_this);

        _this.reload();

        //10초에 한번씩 reload
        TableScope.interval = setInterval(function() {
            _this.reload();
        }, 10000);
    },

    bind: {
        buttons: function (_this) {
            $("#reloadBtn").on("click", function () {
                _this.reload();
            });

            $("#stopBtn").on("click", function () {
                clearInterval(ChartScope.interval);
            });
        }
    },

    reload: function () {
        console.log("로드");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/lastList",
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