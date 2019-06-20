import * as loadScript from '@shinin/load-script';
import * as cherrytree from 'cherrytree';
import { PlainObject } from 'simplytyped';
import './style.css';

loadScript('header.js');
loadScript('nav.js');
const router = cherrytree({
    log: false,
    pushState: false,
});

router.map(route => {
    route('app', { path: '/', abstract: true }, () => {
        route('home', { path: '', url: './home.js', tag: 'home-component' }, () => {
            route('feature1', { path: 'home/feature1' });
            route('feature2', { path: 'home/feature2' });
        });
        route('search', { path: 'search', url: './entry_list.js', tag: 'entry-list-component' });
    });
});

router.use(async (transition) => {
    const { route, parent } = findRoute(transition);
    if (route) {
        let { path, url, tag, component } = route.options;
        console.log("tag", tag);
        console.log("url", url);
        if (url) {
            await loadScript(url);
        }
        if (!component) {
            if (!tag) {
                component = document.createElement('div');
                component.innerText = path;
            } else {
                component = document.createElement(tag);
            }
        }
        let root = document;
        if (parent && parent.options.tag) {
            root = document.querySelector(parent.options.tag);
        }
        const outletElement = root.querySelector('[data-role="outlet"]');
        if (!outletElement) {
            throw new Error('Missing outlet element');
        }
        outletElement.innerHTML = '';
        outletElement.appendChild(component);
    } else {
        console.log('route notfound');
    }
});

router.listen();

document.addEventListener('navigate', event => {
    console.log('navigate', event.detail.href);
    router.transitionTo(event.detail.href)
});

declare namespace CherryTree {
    type Route = {
        name: string;
        options: PlainObject;
        params: PlainObject;
        path: string;
    };

    type Transition = {
        id: number;
        routes: Route[];
        /**
         * Path with query string.
         */
        path: string;
        /**
         * Path without query string.
         */
        pathname: string;
    };
}
// route: CherryTree.Route, transition: CherryTree.Transition
export function findRoute(transition: CherryTree.Transition) {
    const result = { route: undefined as CherryTree.Route | undefined, parent: undefined as CherryTree.Route | undefined };
    for (let index = transition.routes.length - 1; index >= 0; index--) {
        const route = transition.routes[index];
        if (route.options.abstract) {
            continue;
        }
        if (route.path === transition.pathname || route.path === transition.pathname.slice(1)) {
            result.route = route;
            result.parent = transition.routes[index - 1];
            break;
        }
    }
    return result;
}
