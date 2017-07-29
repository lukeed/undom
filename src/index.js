import Element from './element';
import Event from './event';
import Node from './node';
import Text from './text';

const createTextNode = str => new Text(str);
const createElement = type => new Element(null, type.toUpperCase());

function createElementNS(ns, type) {
	let element = createElement(type);
	element.namespace = ns;
	return element;
}

class Document extends Element {
	constructor() {
		super(9, '#document'); // DOCUMENT_NODE

		const html = this.documentElement = createElement('html');
		html.appendChild(this.head = createElement('head'));
		html.appendChild(this.body = createElement('body'));
		this.appendChild(html);
	}
}

export default function () {
	const document = new Document();
	const defaultView = { document, Document, Node, Text, Element, SVGElement:Element, Event };
	return Object.assign(document, defaultView, { defaultView, createElement, createElementNS, createTextNode });
}
