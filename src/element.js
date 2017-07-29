import Node from './node';
import filter from '@arr/filter';
import { findWhere, toLower, splice, createAttributeFilter } from './util';

const isElement = el => el.nodeType === 1;

export default class Element extends Node {
	constructor(type, name) {
		super(type || 1, name); // ELEMENT_NODE
		this.attributes = [];
		this.__handlers = {};
		this.style = {};
		Object.defineProperty(this, 'id', {
			get: _ => this.getAttribute('id'),
			set: v => this.setAttribute('id', v)
		});
		Object.defineProperty(this, 'className', {
			get: _ => this.getAttribute('class'),
			set: v => this.setAttribute('class', v)
		});
		Object.defineProperty(this.style, 'cssText', {
			get: _ => this.getAttribute('style'),
			set: v => this.setAttribute('style', v)
		});
	}

	get children() {
		return filter(this.childNodes, isElement);
	}

	setAttribute(key, value) {
		this.setAttributeNS(null, key, value);
	}

	getAttribute(key) {
		return this.getAttributeNS(null, key);
	}

	removeAttribute(key) {
		this.removeAttributeNS(null, key);
	}

	setAttributeNS(ns, name, value) {
		let attr = findWhere(this.attributes, createAttributeFilter(ns, name));
		if (!attr) this.attributes.push(attr = { ns, name });
		attr.value = String(value);
	}

	getAttributeNS(ns, name) {
		let attr = findWhere(this.attributes, createAttributeFilter(ns, name));
		return attr && attr.value;
	}

	removeAttributeNS(ns, name) {
		splice(this.attributes, createAttributeFilter(ns, name));
	}

	addEventListener(type, handler) {
		(this.__handlers[toLower(type)] || (this.__handlers[toLower(type)] = [])).push(handler);
	}

	removeEventListener(type, handler) {
		splice(this.__handlers[toLower(type)], handler, 0, true);
	}

	dispatchEvent(event) {
		let t = event.currentTarget = this,
			c = event.cancelable,
			l, i;
		do {
			l = t.__handlers && t.__handlers[toLower(event.type)];
			if (l) for (i=l.length; i--; ) {
				if ((l[i].call(t, event)===false || event._end) && c) break;
			}
		} while (event.bubbles && !(c && event._stop) && (event.target=t=t.parentNode));
		return !event.defaultPrevented;
	}
}
