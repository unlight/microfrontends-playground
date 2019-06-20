import * as loadScript from '@shinin/load-script';
import * as cherrytree from 'cherrytree';
import './style.css';

async function main() {
    loadScript('header.js');
    loadScript('nav.js');
    const router = cherrytree({
        log: true,
        pushState: true,
    });

    router.map(route => {
        route('app', { path: '/', abstract: true }, () => {
            route('home', { path: '/', url: './entry_list.js', element: 'entry-list-component' });
            route('search', { path: '/search', url: './entry_list.js', element: 'entry-list-component' });
        });
    });

    router.use(async (transition) => {
        const route = transition.routes.find(route => route.options.url && route.options.path === transition.path);
        if (route) {
            const { path, url, element } = route.options;
            await loadScript(url);
            // const parent = transition.routes[i - 1]
            // var containerEl = parent ? parent.view.el.querySelector('.outlet') : document.body
            // containerEl.appendChild(view.render().el)
            const primaryOutletElement = document.querySelector('[data-role="primary-outlet"]');
            primaryOutletElement.appendChild(document.createElement(element));
        }
    });

    router.listen();

    document.addEventListener('navigate', event => {
        console.log('navigate', event.detail.href);
        router.transitionTo(event.detail.href)
    });
}

main();
