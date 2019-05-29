import React, {useState, useEffect} from 'react';
import {BehaviorSubject} from './BehaviorSubject';
let subject;
let mainState = {};

// 判断state是否改变 
const isModifyState = (state, nextMainState) => {
    for (let key in state) {
        if (state[key] !== nextMainState[key]) {
            return true;
        }
    }
    return false;
};
// 改变state
const _SetState = (nextState) => {
    if (subject) {
        let nextMainState = Object.assign({}, mainState, nextState);
        subject.next((mainState = nextMainState));
    }
};

// 初始化state
export default (initState) => {
    _SetState((mainState = initState));
};

export const connect = function (mapState) {
    if (!subject) {
        subject = new BehaviorSubject(mainState);
    }
    return function (WrapComponent) {
        return function WrapComponentHOC (props) {
            if (typeof mapState !== 'function' || Object.keys(mapState(mainState)).length === 0) {
                return (
                    <WrapComponent {...props} setState$={_SetState} ></WrapComponent>
                );
            }
            let [state, setState] = useState(mapState(mainState));
            // 观察者
            const observer = (nextMainState) => {
                if (isModifyState(state, nextMainState)) {
                    mainState = nextMainState;
                    setState(mapState(mainState));
                }
            };
            useEffect(() => {
                let subscription = subject.subscribe(observer);
                return () => {
                    subscription.unsubscribe();
                }
            });

            return (
                <WrapComponent {...state} {...props} setState$={_SetState} ></WrapComponent>
            );
        }
    }
};
