<template>
	<view class="homecomponent night" :style="{top: top + '%'}">
		<homeheader @changetop="changetop"></homeheader>
		<homebanner :musicelist="musicelist" :isminshow="top"></homebanner>
		
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				top: 100,
				musicelist: helper.Recentmusic,
			};
		},
		methods: {
			getmusice() {
				let key = uni.getStorageSync('cookie')
				this.top = 0
				if(key) {
					if(!helper.Recentmusic.length || helper.Recentmusic.length != this.musicelist.length) {
						uni.request({
							url: `${helper.url}/record/recent/song?limit=50`,
							data: {
								cookie: key
							},
							success: (res) => {
								// console.log(res.data.data.list)
								this.musicelist = res.data.data.list
								helper.Recentmusic = this.musicelist
							}
						})
					}else {
						this.musicelist = helper.Recentmusic
					}
				}
			},
			
			changetop(e) {
				this.top = e
				document.title = "我的"
			}
		}
	}
</script>

<style lang="scss">
	.homecomponent {
		transition: top .4s ease;
		overflow: hidden;
		z-index: 99;
		position: fixed;
		// top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--indexgbcolor);
	}
</style>
