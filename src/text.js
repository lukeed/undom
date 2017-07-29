import Node from './node';

export default class Text extends Node {
	constructor(text) {
		super(3, '#text'); // TEXT_NODE
		this.nodeValue = text;
	}
	set textContent(text) {
		this.nodeValue = text;
	}
	get textContent() {
		return this.nodeValue;
	}
}
