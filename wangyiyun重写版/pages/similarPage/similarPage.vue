<template>
	<view class="similar night">
		<similarcomp></similarcomp>
		<homebanner :page="page" :musicelist="musicelist" :isminshow="top"></homebanner>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				top: 100,
				musicelist: helper.cloudmusice,
				page: 2
			};
		},
		onLoad() {
			this.getcloud()
		},
		methods: {
			getcloud() {
				let key = uni.getStorageSync('cookie')
				if(!key) return
				if(!helper.cloudmusice.length || helper.cloudmusice.length != this.musicelist.length) {
					
					uni.request({
						url: `${helper.url}/user/cloud`,
						data: {
							cookie: key
						},
						success: (res) => {
							this.musicelist = res.data.data
							// console.log(res)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}else {
					this.musicelist = helper.cloudmusice
				}
			}
		}
	}
</script>

<style lang="scss">
	.similar {
		width: 100%;
		height: 100vh;
		background-color: var(--indexgbcolor);
	}
</style>
