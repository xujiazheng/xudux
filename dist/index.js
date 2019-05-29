'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BehaviorSubject = require('./BehaviorSubject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subject = void 0;
var mainState = {};

// 判断state是否改变 
var isModifyState = function isModifyState(state, nextMainState) {
    for (var key in state) {
        if (state[key] !== nextMainState[key]) {
            return true;
        }
    }
    return false;
};
// 改变state
var _SetState = function _SetState(nextState) {
    if (subject) {
        var nextMainState = Object.assign({}, mainState, nextState);
        subject.next(mainState = nextMainState);
    }
};

// 初始化state

exports.default = function (initState) {
    _SetState(mainState = initState);
};

var connect = exports.connect = function connect(mapState) {
    if (!subject) {
        subject = new _BehaviorSubject.BehaviorSubject(mainState);
    }
    return function (WrapComponent) {
        return function WrapComponentHOC(props) {
            if (typeof mapState !== 'function' || Object.keys(mapState(mainState)).length === 0) {
                return _react2.default.createElement(WrapComponent, _extends({}, props, { setState$: _SetState }));
            }

            var _useState = (0, _react.useState)(mapState(mainState)),
                _useState2 = _slicedToArray(_useState, 2),
                state = _useState2[0],
                setState = _useState2[1];
            // 观察者


            var observer = function observer(nextMainState) {
                if (isModifyState(state, nextMainState)) {
                    mainState = nextMainState;
                    setState(mapState(mainState));
                }
            };
            (0, _react.useEffect)(function () {
                var subscription = subject.subscribe(observer);
                return function () {
                    subscription.unsubscribe();
                };
            });

            return _react2.default.createElement(WrapComponent, _extends({}, state, props, { setState$: _SetState }));
        };
    };
};