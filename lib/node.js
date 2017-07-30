const find = require('@arr/find');
const filter = require('@arr/filter');
const { findWhere, toLower, splice } = require('./util');

const getChild = (el, fn, isMany) => (isMany ? filter : find)(el.childNodes, fn) || null;

class Node {
	constructor(type, name) {
		this.nodeType = type;
		this.nodeName = name;
		this.childNodes = [];
	}

	get nextSibling() {
		let p = this.parentNode;
		if (p) return p.childNodes[findWhere(p.childNodes, this, true) + 1];
	}

	get previousSibling() {
		let p = this.parentNode;
		if (p) return p.childNodes[findWhere(p.childNodes, this, true) - 1];
	}

	get firstChild() {
		return this.childNodes[0];
	}

	get lastChild() {
		return this.childNodes[this.childNodes.length - 1];
	}

	getElementById(str) {
		return getChild(this, o => (o.getAttribute('id') === str) && o);
	}

	getElementsByClassName(str) {
		return getChild(this, o => ~(o.className || '').indexOf(str), true);
	}

	querySelector(str) {
		console.log('qs got', str);
		var isID = /#(.*)/.exec(str);
		if (isID) return this.getElementById(isID[1]);
		var isCls = /(.*)\.(.*)/.exec(str);
		if (isCls) {
			var el = isCls[1];
			var cls = isCls[2];
			if (el) {
				var th = this.childNodes.filter(o => toLower(o.nodeName) === el);
				if (cls) {
					return filter(th)
					return th.filter(o => ~(o.className || '').indexOf(cls))[0];
				} else {
					return th[0];
				}
			}
		}
		return find(this.childNodes, o => toLower(o.nodeName)===str);
	}

	appendChild(child) {
		this.insertBefore(child);
	}

	insertBefore(child, ref) {
		child.remove();
		child.parentNode = this;
		ref ? splice(this.childNodes, ref, child) : this.childNodes.push(child);
	}

	replaceChild(child, ref) {
		if (ref.parentNode === this) {
			this.insertBefore(child, ref);
			ref.remove();
		}
	}

	removeChild(child) {
		splice(this.childNodes, child);
	}

	remove() {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	}
}

module.exports = Node;
