/**
 * @description bezierPointsMaker 生成贝塞尔曲线点
 * (c) 2018 heweifeng
 * @param {Array} anchorpoints 控制点数组
 * @param {Number} pointsAmount 需要生成的点数量, 数量越多越平滑
 * @return {Array} points 贝塞尔曲线点数组
 * */
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.bezierPointsMaker = factory());
}(this, (function() {
	'use strict';
	function bezierPointsMaker (anchorpoints, pointsAmount) {
		return this.init(anchorpoints, pointsAmount);
	};
	bezierPointsMaker.prototype = {
		/**
		 * @description 初始化函数
		 * @param {Array} anchorpoints 控制点数组
		 * @param {Number} pointsAmount 生成的点数量
		 * @return {Array} points 贝塞尔曲线点数组
		 */
		init: function(anchorpoints, pointsAmount) {
			var self = this;
            var points = [];
            for (var i = 0; i < pointsAmount; i++) {
                var point = self.multiPointBezier(anchorpoints, i / pointsAmount);
                points.push(point);
            }
            return points;
        },
        /**
         * @description 计算贝塞尔曲线点
         * @param {Array} points 控制点数组
         * @param {Number} t 第几个点占总点数的分数
         * @return {Object} x,z 坐标
         */
        multiPointBezier: function(points, t) {
            var len = points.length;
            var x = 0, z = 0;
            for (var i = 0; i < len; i++) {
                var point = points[i];
                x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.calCoefficient(len - 1, i));
                z += point.z * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.calCoefficient(len - 1, i));
            }
            return { x: x, z: z };
        },
        /**
         * @description 计算系数
         * @param {Number} start 控制点数组的最后一位索引值
         * @param {Number} end 当前索引
         * @return {Number} 系数
         */
        calCoefficient: function(start, end) {
        		var cs = 1, bcs = 1;
            while (end > 0) {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        }
    }

	return bezierPointsMaker;

})));