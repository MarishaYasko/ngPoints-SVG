// FAKE POINTS DATA-SET: polygon
const FIGURE_DATASET_SINGLE_TRIANGLE = {
    selector: 'polygon',
    elemStrokeWidth: 2,
    elemColors: ['red', 'pink'],
    styles: `fill:pink;stroke:red;stroke-width:2`,
    figure: {
        points: '200,10 250,190 160,210',
        gradient: false,
        cords: {
            x: 100,
            y: 100
        }
    }
};
const FIGURE_DATASET_SINGLE_CIRCLE = {
    selector: 'circle',
    elemStrokeWidth: 1,
    elemColors: ['lightpink', 'darkpink'],
    styles: `cx:50; cy: 50; r:40; stroke: black; stroke-width:3; fill:red`,
    figure: {
        params: {
            width: 60,
            height: 60
        },
        gradient: true,
        cords: {
            x: 100,
            y: 100
        }
    }
};
const FIGURE_DATASET_SINGLE_RECTANGLE= {
    selector: 'rect',
    elemStrokeWidth: 4,
    elemColors: ['yellow', 'pink'],
    styles: `height: 80px; width: 80px; fill:rgb(0,0,255);stroke-width:4;stroke:rgb(0,100,200)`,
    figure: {
        params: {
            width: 80,
            height: 80
        },
        gradient: true,
        cords: {
            x: 100,
            y: 100
        }
    }
};

function FAKE_DATA_SET(type) {
    if (type === 'triangle') {
        return FIGURE_DATASET_SINGLE_TRIANGLE;
    }
    if (type === 'square') {
        return FIGURE_DATASET_SINGLE_RECTANGLE;
    }
    if (type === 'circle') {
        return FIGURE_DATASET_SINGLE_CIRCLE;
    }
}

/**
 * @module ngPoints
 */
(function() {
    'use strict';

    angular.module('ngPoints', [])

        .factory('pointsFactory', pointsFactory)

        .controller('PointsCtrl', function() {})

        .component('triangleElem', TriangleElem())

        .component('squareElem', SquareElem())

        .component('circleElem', CircleElem());

    function TriangleElem() {

        function TriangleCtrl(pointsFactory) {
            const $ctrl = this;
            $ctrl.figureData = pointsFactory.getFigureData('triangle');
            $ctrl.element = pointsFactory.createElement('triangle', this.figureData);
            // there maybe create elements set
            $ctrl.figureDataSet = pointsFactory.createElementSet(20, this.element);
            $ctrl.name = 'Triangle';
        }

        TriangleCtrl.$inject = ['pointsFactory'];

        return {
            template: `<div class="triangle figure">
            <svg id="triangle-points" width="90%" height="600">
                <polygon ng-repeat="poly in trCtrl.figureDataSet track by $index" points="{{poly.params.points}}" style="{{poly.params.styles}}" />
            </svg></div>`,
            controller: TriangleCtrl,
            controllerAs: 'trCtrl'
        };
    }

    function SquareElem() {
        const component = {
            template: `<div>
            <svg id="square-points" width="90%" height="600"><rect ng-repeat="square in sqCtrl.figureDataSet track by $index"
            style="{{square.styles}}" />' +
            </svg></div>`,
            controller: SquareCtrl,
            controllerAs: 'sqCtrl'
        };

        SquareCtrl.$inject = ['pointsFactory'];

        function SquareCtrl(pointsFactory) {
            const $ctrl = this;
            $ctrl.figureData = pointsFactory.getFigureData('square');
            $ctrl.element = pointsFactory.createElement('square', this.figureData);
            // there maybe create elements set
            $ctrl.figureDataSet = pointsFactory.createElementSet(20, this.element);
            $ctrl.name = 'Square';
        }

        return component;
    }

    function CircleElem() {
        const component = {
            template: `<div>
            <svg id="circle-points" width="90%" height="600"><circle ng-repeat="circle in circleCtrl.figureDataSet track by $index"
            style="{{circle.styles}}" />' +
            </div>`,
            controller: CircleCtrl,
            controllerAs: 'circleCtrl'
        };

        CircleCtrl.$inject = ['pointsFactory'];

        function CircleCtrl(pointsFactory) {
            const $ctrl = this;
            $ctrl.element = pointsFactory.getFigureData('circle');
            $ctrl.figureDataSet = pointsFactory.createElementSet(40, this.element);
            $ctrl.name = 'Circle';
        }

        return component;
    }

    pointsFactory.$inject = ['$http'];

    /**
     * @function pointsFactory
     * @returns {{pointsData: *, createElementSet: createElementSet, createElement: createElement, getFigureData: getFigureData}}
     */
    // adding $http after
    function pointsFactory() {
        let pointsData = null;
        function animatePoints(animationProperties) {
            const Animation = {
                properties: animationProperties.props,
                name: animationProperties.name
            }
        }

        function createElementSet(figureCount, elementData) {
            const elements = [];
            for (let i = 0; i < figureCount; i++) {
                elements.push(elementData);
            }
            return elements;
        }
        
        function createElement(elementType, data) {
            if (elementType === 'triangle') {
                return {
                    selector: 'polygon',
                    styles: `${data.styles}`,
                    params: {
                        points: `${data.figure.points}`,
                        text: 'i am a friendly Polygon!',
                        cords: {
                            x: data.figure.cords.x,
                            y: data.figure.cords.y
                        }
                    }
                }
            }
            if (elementType === 'square') {
                return {
                    selector: 'rectangle',
                    colors: data.elemColors,
                    styles: `${data.styles}`,
                    params: {
                        cords: {
                            x: data.figure.cords.x,
                            y: data.figure.cords.y
                        }
                    }
                }
            }
            if (elementType === 'circle') {
                return {
                    selector: 'circle',
                    colors: data.elemColors,
                    styles: `${data.styles}`,
                    params: {
                        cords: {
                            x: data.figure.cords.x,
                            y: data.figure.cords.y
                        }
                    }
                }
            }
        }

        /**
         * @param type
         * sample get data:
         ** pointsFactory.getFigureData('triangle', FIGURE_DATASET_SINGLE_TRIANGLE).then(function(data) {
             $ctrl.figureData = data;
         }); **/
        function getFigureData(type) {
            // return $http.get(`${url}/data-set`);
            return FAKE_DATA_SET(type);
        }
        
        return {pointsData, createElementSet, createElement, getFigureData};
    }

})();
