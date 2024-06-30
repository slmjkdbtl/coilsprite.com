window.addEventListener("scroll", () => {
	const scroll = window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
	console.log(scroll)
	document.body.style.setProperty("--scroll", scroll + "")
}, false)
