

const aboutToMusice = (page, long, _this) => {
	console.log(_this)
	let num = -100
	if(page) {
		num = -95
		_this.$store.commit('oldAndnew', long)
	}else {
		num = -100
		_this.$store.commit('oldAndnew', long)
	}

}

export default aboutToMusice