<template>
	<view class="similar night">
		<view class="Recent" v-if="page == 1">
			<homeheader></homeheader>
		</view>
		
		<view class="Clouddisk" v-else-if="page == 2">
			<similarcomp></similarcomp>	
		</view>
		
		<homebanner
			:page="page" 
			:musicelist="musicelist" 
			:isminshow="topmach"
			@fulldata="playmin"
		></homebanner>
		
		<minmusic
		v-show="this.$store.state.showplaycomponent"
		:imgk="musicpic"
		:name="name" 
		:ren="ren" 
		:dd="dd" 
		:love="love"
		:top="topnum" 
		@stopkk="bilibili"
		ref="minch"></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				love: helper.contminlist.islove,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd:  helper.contminlist.dd,
				topnum: helper.plnumstr,
				topmach: 100,
				musicelist: helper.cloudmusice,
				page: 1
			};
		},
		onLoad(e) {
			this.page = e.page
			if(this.page == 1) {
				document.title = "最近播放"
				this.getmusice()
			}else if(this.page == 2) {
				document.title = "音乐云盘"
				this.getcloud()
			}	
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
			playmin(e) {
				this.startgq(e.id, e.img, e.title, e.name, e.size)
			},
			bilibili(e) {
				if (this.num != e) {
					this.num = 1
					this.dd = -100
					helper.contminlist.dd = -100
				} else {
					this.num = e
					this.dd = 0
					helper.contminlist.dd = 0
				}
			},
			islove(id) {
				let idlist = uni.getStorageSync('musiceid')
				let x
				if(idlist) {
					x = idlist.some(item => {
						return item === id
					})					
				}
				return x
			},
			stormusiclist(e, img, title, name, size, love) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				
				if(value) {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if(kenum >= 0) {
						this.$store.commit('changeSubscript', kenum)
					}else if(kenum <= 0) {
						this.$store.commit('changeSubscript', 0)
					}
				}
					
				if(value.length > 0) {
					let keke = value.filter((item) => {
						return item.e == e
					})
					if(keke.length == 0) {
						np = true
					}else {
						np = false
					}
				}else if(!value || value.length === 0) {
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size,
						love
					}])
				
				}
				
				if(np) {
					// console.log(np)
					let tp = value
					tp.unshift({
						e,
						title,
						name,
						img,
						size,
						love
					})
					// console.log(tp)
					uni.setStorageSync('musiclist', tp);
				}
			},
			startgq(id,img, title, name,playsize) {
				uni.request({
					url: `${helper.url}/check/music?id=${id}`,
					success: (res) => {
						this.isplay = res.data.success
				
				
						if(!this.isplay) {
							uni.showToast({
								title: res.data.message,
								duration: 1000,
								mask: true,
								icon: 'none'
							});
							return
						}
						
				getApp().watchmusice()
				this.love = this.islove(id)
				helper.contminlist.islove = this.love
				helper.audiok.onEnded(() => {
					if (uni.getStorageSync('musiclist') <= 1) {
						helper.audiok.stop()
						this.$store.commit('changeControl', 1)
					} else {
						
						this.$nextTick(() => {
							if(this.$refs.minch)
							this.$refs.minch.down()
						})
					}
				})
				
				
				this.id = id
				helper.moredetail.push({
					"name": title,
					"singer": name
				})
				
				this.$store.commit('changeControl', 0)
				uni.request({
					url: `${helper.url}/comment/music?id=${id}&limit=1`,
					success: (res) => {
						// console.log(res)
						let sizek = res.data.total
						if (sizek < 10000) {
							this.topnum = '999+'
							helper.plnumstr = '999+'
						} else if (sizek >= 10000 && sizek < 100000) {
							this.topnum = '1w+'
							helper.plnumstr = '1w+'
						} else if (sizek > 100000) {
							
							this.topnum = '10w+'
							helper.plnumstr = '10w+'
						}
						this.stormusiclist(id, img, title, name, this.topnum, this.love)
					}
				})
			
				uni.request({
					// url: `http://localhost:3000/song/url/v1?id=${k}&level=exhigh`,
					url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
					success: (res) => {
			
						this.musicpic = img
						helper.contminlist.musicpic = img
						
						this.name = title
						helper.contminlist.name = title
						
						this.ren = name
						helper.contminlist.ren = name
						
						// this.$paper.ch = true
						
						this.dd = 0
						helper.contminlist.dd = 0
						
						this.$store.commit('changeshow', 1)
						
						// console.log('1',res.data.data[0].url)
						helper.audiok.autoplay = true
						helper.audiok.src = res.data.data[0].url
			
					}
				  })
				}
			  })
			},
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
		overflow: hidden;
		background-color: var(--indexgbcolor);
	}
</style>
