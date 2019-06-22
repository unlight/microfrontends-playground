import * as loadScript from '@shinin/load-script';
import { PlainObject } from 'simplytyped';
import 'a-wc-router/src/router';
import { RouterElement } from 'a-wc-router/src/routes-router';
import './style.css';

loadScript('header.js');
loadScript('nav.js');

window.addEventListener('navigate', (event) => {
    RouterElement.navigate(event.detail.href);
});
