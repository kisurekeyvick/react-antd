import * as React from 'react';
import TypescriptKnowledge from './typescript';
import TypescriptKnowledgeTwo from './typescript-two';
import ESJSKnowledge from './base-js';
import ESJSKnowledgeTwo from './base-js-two';
import ESJSKnowledgeThree from './base-js-three';
import GITUsing from './git';
import Regular from './regular'; 
import SeniorJsOne from './senior-js-one';
import ReactJsOne from './react-js-one';
import ReactJsTwo from './react-js-two';
import Arithmetic from './arithmetic';
import REDUX from './redux';

export default class BaseKnowledge extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <ESJSKnowledge />
                <TypescriptKnowledge />
                <ESJSKnowledgeTwo />
                <GITUsing />
                <Regular />
                <ESJSKnowledgeThree />
                <TypescriptKnowledgeTwo />
                <SeniorJsOne />
                <ReactJsOne />
                <ReactJsTwo />
                <Arithmetic />
                <REDUX />
            </div>
        )
    }
}