import i18n from './i18n';

/**
 * @param {string} method HTTP method
 * @param {string} url HTTP Url
 * @param {string} [body] payload for POST requests
 * @returns {*} the request response or null
 */

import { INotifier } from './INotifier';

let notifier: INotifier|null = null;

export function init(n: INotifier) {
    notifier = n;
}

export async function request(method: string, url: string, body?: string) {
    return new Promise(function(resolve, reject) {
        const req = new XMLHttpRequest();
        req.responseType = 'json';
        let timer = window.setTimeout(() => {
            timer = -1;
            if (notifier) {
                notifier.showLoadingIndicator();
            }
        }, 1000);
        req.onprogress = (event) => {
            if (event.lengthComputable) {
                console.log(event.loaded * 100 / event.total)
            }
        };
        req.onerror = (event) => {
            if (notifier) {
                notifier.snack(i18n.communicationError);
            }
            reject();
        };
        req.onabort = (event) => {
            reject();
        }
        req.onload = (event) => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                if (notifier) {
                    notifier.snack(i18n.communicationError);
                }
                reject();
            }
        }
        req.onloadend = (event) => {
            if (timer !== -1) {
                clearTimeout(timer);
            }
            if (notifier) {
                notifier.hideLoadingIndicator();
            }
        };
        req.open(method, url);
        req.send(body);
    });
}

export async function get(url: string) {
    return await request('GET', url);
}

export async function post(url: string, body: string, onResponse?: Function) {
    return await request('POST', url, body);
}
