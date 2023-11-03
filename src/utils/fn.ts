const MC = (a: string, b: string, c: string) => {
	let TotalDiff =
		a.charCodeAt(0) +
		2 * Number(a.slice(1)) -
		(b.charCodeAt(0) + Number(b.slice(1))) -
		(c.charCodeAt(0) + Number(c.slice(1)));

	let CharDiff = a.charCodeAt(0) - b.charCodeAt(0) - c.charCodeAt(0);
	console.log("TDIFF:", TotalDiff);
	console.log("CHARDIFF: ", CharDiff);
	return TotalDiff === CharDiff;
};

MC("a11", "b11", "c11");
