$(document).ready(function () {
    Page.init();
});

const Page = {
    init: function () {
        TableScope.init();
    }
};

const TableScope = {
    $el: $.scope("TableScope"),

    init: function () {
        const _this = this;

        _this.bind.buttons(_this);

        _this.reload(1);
    },

    bind: {
        buttons: function (_this) {
            // $("#reloadBtn").on("click", function () {
            //     _this.reload();
            // });
            _this.$el.clickButton("reloadBtn", function (){
               _this.reload(1);
            });

        }

    },

    reload: function (currentPage) {
        console.log("로드");
        const _this = this;

        _this.$el.scope("criteria").setFieldValue("page", currentPage);

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/findAll",
            dataType: 'json',
            data: $.scope("criteria").getFieldParameters(),
            success: function success(response) {

                const template = _this.$el.template("result-body");

                _this.$el.scope("result-body").html(template(response.content));

                _this.$el.pagination({
                    totalPage: response.totalPages,
                    currentPage: currentPage,
                    totalCount: response.totalElements,
                    onPageClick: function (event, clickedPage) {

                        _this.reload(clickedPage);
                    }
                });

            }
        });
    }
}