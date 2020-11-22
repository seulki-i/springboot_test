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

        _this.reload(1);
    },

    bind: {
        buttons: function (_this) {
            $("#reloadBtn").on("click", function () {
                _this.reload();
            });

        }

    },

    reload: function (currentPage) {
        console.log("로드");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/findAll",
            dataType: 'json',
            data: null,
            success: function success(response, totalPage, totalCount) {
                TableScope.$el.find("[id=currentPage]").val(currentPage);

                const source = _this.$el.find("[data-template=result-body]");

                const template = Handlebars.compile(source.html());

                _this.$el.find("[data-scope=result-body]").html(template(response));

                ConstFunction.pagination({
                    _this : TableScope.$el,
                    totalPage: totalPage,
                    currentPage: currentPage,
                    totalCount: totalCount,
                    onPageClick: function (event, clickedPage) {
                        _this.reload(clickedPage);
                    }
                });

            }
        });
    }
}