import { 
    // renderDom,
    createElement,
    render,
    diff,
    patch
} from './vDomCreater';

const vDom1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
]);

const vDom2 = createElement('ul', { class: 'list-group' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('div', { class: 'item' }, ['3']),
]);

const el = render(vDom1);
// renderDom(el, window.root);  这一步渲染dom
const patchs = diff(vDom1, vDom2);
patch(el, patchs);
