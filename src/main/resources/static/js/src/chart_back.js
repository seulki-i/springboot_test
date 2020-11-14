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
    chart_data: [], //초기 날짜
    chart_data1: [], //skt
    chart_data2: [], //kt
    chart_data3: [], //lg

    new_data: [],
    new_data1: [],
    new_data2: [],
    new_data3: [],


    init: function () {
        const _this = this;

        _this.bind.buttons(_this);

        _this.findAll();

        //10초에 한번씩 reload
//        setInterval(function() {
//        		_this.reload();
//        	}, 10000);

    },

    bind: {
        buttons: function (_this) {
            $("#reloadBtn").on("click", function () {
                _this.reload();
            });
        }
    },


    findAll: function () {
        console.log("findAll");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/findAll",
            dataType: 'json',
            // data: ,
            success: function success(response) {
                _this.methods.data(response);
            }
        });
    },

    findLast: function () {
        console.log("last");
        const _this = this;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/web/lastList",
            dataType: 'json',
            // data: ,
            success: function success(response) {
                _this.methods.newData(response);
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
                if (e.net === 'skt') {
                    ChartScope.chart_data1.push(e.wait);
                    ChartScope.chart_data.push(e.dt);
                } else if (e.net === 'kt') {
                    ChartScope.chart_data2.push(e.wait);
                } else if (e.net === 'lg') {
                    ChartScope.chart_data3.push(e.wait);
                }
            });

            ChartScope.methods.eCharts();
        },

        newData: function (response) {
            //Todo 초기화를 할 좋은 방법
            ChartScope.new_data = []
            ChartScope.new_data1 = []
            ChartScope.new_data2 = []
            ChartScope.new_data3 = []

            $.each(response, function (i, e) {
                if (e.net === 'skt') {
                    ChartScope.new_data.push(e.dt);
                    ChartScope.new_data1.push(e.wait);
                } else if (e.net === 'kt') {
                    ChartScope.new_data2.push(e.wait);
                } else if (e.net === 'lg') {
                    ChartScope.new_data3.push(e.wait);
                }
            });
        },

        eCharts: function (response) {
            const _this = this
            const view = echarts.init(document.getElementById('charView'));

            const option = {
                title: {
                    text: 'test'
                },
                tooltip: {},
                legend: { //위에 보여지는
                    data: ['skt', 'kt', 'lg'],
                },
                xAxis: [ // 시간 담아
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: ChartScope.chart_data
                    }
                ],
                yAxis: [
                    { // 설정
                        type: 'value',
                        min: 0,
                        max: 1000
                    }
                ],
                series: [
                    {
                        name: 'skt',
                        type: 'line',
                        itemStyle: {color: 'red'},
                        markLine:{
                            lineStyle: {type: 'solid'},
                            data:[{
                                yAxis: 600 //임계치
                            }]
                        },
                        data: ChartScope.chart_data1
                    },
                    {
                        name: 'kt',
                        type: 'line',
                        itemStyle: {color: 'blue'},
                        markLine:{
                            lineStyle: {type: 'solid'},
                            data:[{
                                yAxis: 360
                            }]
                        },
                        data: ChartScope.chart_data2
                    },
                    {
                        name: 'lg',
                        type: 'line',
                        itemStyle: {color: 'green'},
                        markLine:{
                            lineStyle: {type: 'solid'},
                            data:[{
                                yAxis: 240
                            }]
                        },
                        data: ChartScope.chart_data3
                    }

                ]
            };

            view.setOption(option); //처음에 그림


            //todo 이걸 멈추는 이벤트를 만들어야할꺼같은뎅

            // 데이터 생성 삭제
            //  setInterval(function () {
            //
            //       ChartScope.findLast(); //최신데이터 가져오기
            //
            //      const data0 = option.series[0].data; //sk
            //      const data1 = option.series[1].data; //kt
            //      const data2 = option.series[2].data; //lg
            //
            //
            //      //데이터의 가장 왼쪽 값을 제거
            //      data0.shift();
            //      //데이터의 가장 오른쪽 값을 추가
            //      data0.push(ChartScope.new_data1[0]);
            //
            //      data1.shift();
            //      data1.push(ChartScope.new_data2[0]);
            //
            //      data2.shift();
            //      data2.push(ChartScope.new_data3[0]);
            //
            //      //x축에 시간 데이터 추가
            //      option.xAxis[0].data.shift();
            //      option.xAxis[0].data.push(ChartScope.new_data[0]);
            //
            //      //차트에 반영
            //      view.setOption(option);
            //  }, 10000); // 10초
        }
    }

}