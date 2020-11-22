const ConstFunction = {
    /**
     * 페이지네이션을 추가한다.
     */
    pagination : function (options) {

        // const scopeNames = (null != options && null != options.scopeNames ? options.scopeNames : "pagination");
        // this.scope("pagination").twbsPagination("destroy");
        options._this.find("[id=pagination_test]").twbsPagination("destroy");
        options._this.find("[data-filed=totalCount]").text(options.totalCount + "건");
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
            onPageClick: options.onPageClick || function () {
            }
        };

        if (options !== "destroy") {

            options = _.extend(defaultOptions, options);

            // this.scope("pagination").twbsPagination(options);
            options._this.find("[id=pagination_test]").twbsPagination(options);

            options._this.find("[id=pagination_test]").find("ul").addClass("page-item");
        }
    },

    /*
 * 현재 조회된 페이지를 조회한다.
 */
    currentPage : function (options) {

        return this.find("[id=pagination_test]").twbsPagination('getCurrentPage');
    }

};
