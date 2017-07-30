/*
const NODE_TYPES = {
	ELEMENT_NODE: 1,
	ATTRIBUTE_NODE: 2,
	TEXT_NODE: 3,
	CDATA_SECTION_NODE: 4,
	ENTITY_REFERENCE_NODE: 5,
	COMMENT_NODE: 6,
	PROCESSING_INSTRUCTION_NODE: 7,
	DOCUMENT_NODE: 9
};
*/

function toLower(str) {
	return str.toLowerCase();
}

function splice(arr, item, add, byValueOnly) {
	let i = arr ? findWhere(arr, item, true, byValueOnly) : -1;
	if (~i) add ? arr.splice(i, 0, add) : arr.splice(i, 1);
	return i;
}

function findWhere(arr, fn, returnIndex, byValueOnly) {
	let i = arr.length;
	while (i--) if (typeof fn==='function' && !byValueOnly ? fn(arr[i]) : arr[i]===fn) break;
	return returnIndex ? i : arr[i];
}

function createAttributeFilter(ns, name) {
	return o => o.ns===ns && toLower(o.name)===toLower(name);
}

module.exports = {
	splice,
	toLower,
	findWhere,
	createAttributeFilter
}
