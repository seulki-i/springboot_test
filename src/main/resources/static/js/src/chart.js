$(document).ready(function () {
    Page.init();
});

const Page = {
    init: function () {
        ChartScope.init();
    }
};

const ChartScope = {
    $el: $("#ChartScope"),
    view : echarts.init(document.getElementById('charView')),
    chart_data: [], //초기 날짜
    chart_data1: [], //A
    chart_data2: [], //B
    chart_data3: [], //C
    interval: null,

    init: function () {
        const _this = this;

        _this.bind.buttons(_this);

        _this.getList();

        ChartScope.interval = setInterval(function () {
            _this.getList();
        }, 10000);

    },

    bind: {
        buttons: function (_this) {
            $("#reloadBtn").on("click", function () {
                _this.getList();
            });

            $("#stopBtn").on("click", function () {
                clearInterval(ChartScope.interval);
            });
        }
    },


    getList: function () {
        console.log("getList");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/findTenList",
            dataType: 'json',
            // data: ,
            success: function success(response) {
                _this.methods.data(response);
            }
        });
    },

    methods: {
        data: function (response) {
            //Todo 초기화를 할 좋은 방법
            ChartScope.chart_data = []
            ChartScope.chart_data1 = []
            ChartScope.chart_data2 = []
            ChartScope.chart_data3 = []

            $.each(response, function (i, e) {
                if (e.net === 'A') {
                    ChartScope.chart_data1.push(e.wait);
                    ChartScope.chart_data.push(e.dt);
                } else if (e.net === 'B') {
                    ChartScope.chart_data2.push(e.wait);
                } else if (e.net === 'C') {
                    ChartScope.chart_data3.push(e.wait);
                }
            });

            ChartScope.methods.eCharts();
        },

        eCharts: function (response) {
            const _this = this;

            const option = {
                title: {
                    text: 'test'
                },
                tooltip: {},
                legend: { //위에 보여지는
                    data: ['A', 'B', 'C'],
                },
                xAxis: [ // 시간
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: ChartScope.chart_data
                    }
                ],
                yAxis: [
                    { // 전송대기건수
                        type: 'value',
                        min: 0,
                        max: 1000
                    }
                ],
                series: [
                    {
                        name: 'A',
                        type: 'line',
                        itemStyle: {color: 'red'},
                        markLine: {
                            lineStyle: {type: 'dotted'}, //실선 : solid
//                            label: {
//                                normal: {
//                                    show: false
//                                },
//                                formatter: '임계치'
//                            },
                            symbol: 'none', // 화살표? 표기 설정
                            data: [{
                                yAxis: 600 //임계치
                            }]
                        },
                        data: ChartScope.chart_data1
                    },
                    {
                        name: 'B',
                        type: 'line',
                        itemStyle: {color: 'blue'},
                        markLine: {
                            lineStyle: {type: 'dotted'},
                            symbol: 'none',
                            data: [{
                                yAxis: 360
                            }]
                        },
                        data: ChartScope.chart_data2
                    },
                    {
                        name: 'C',
                        type: 'line',
                        itemStyle: {color: 'green'},
                        markLine: {
                            lineStyle: {type: 'dotted'},
                            symbol: 'none',
                            data: [{
                                yAxis: 240
                            }]
                        },
                        data: ChartScope.chart_data3
                    }

                ]
            };

            ChartScope.view.setOption(option);
        }
    }

}