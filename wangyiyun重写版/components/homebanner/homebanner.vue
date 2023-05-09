<template>
	<view class="homebanner">
		<view class="top">
			<view class="top-left">
				<view class="playicon">
					<image src="/static/icon/Recent.png" mode="aspectFit"></image>
				</view>
				<view class="text">
					播放全部
				</view>
				<view class="num">
					(300)
				</view>
			</view>
			<view class="topright">
				<view class="allicon">
					<image src="/static/icon/多选.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<view class="musicelist">
			<view class="row"
			 v-for="(item, index) in musicelist" :key="index" @click="startgq(item.data.id, item.data.al.picUrl, item.data.name, item.data.ar[0].name, topnum)" >
				<view class="row-left">
					<view class="title">
						{{item.data.name}}
					</view>
					<view class="name">
						{{item.data.ar[0].name}} - {{item.data.al.name}}
						{{item.data.alia[0]}}
					</view>
				</view>
				<view class="row-right">
					<view class="playmv"  v-if="item.data.mv" @click="getmv(item.data.id, item.data.name)">
						<view class="playmask">
							<image src="/static/icon/播放4.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="more">
						<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
		<minmusic
		v-show="this.$store.state.showplaycomponent"
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd"
		:love="love"
		:indexk="isindex"
		:isshow="isshow"
		:top="topnum"
		@stopkk="bilibili"
		ref="child"></minmusic>
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
				dd: helper.contminlist.dd,
				topnum: helper.plnumstr,
				isindex: 1,
				isplay: false,
				isshow: 1,
				numk: 1,
				keduoli: 100,
			};
		},
		props: ['musicelist', 'isminshow'],
		mounted() {
			this.$nextTick(() => {
				this.child = this.$refs.child
			})
		},
		methods: {
			okxian(e) {
				this.$store.commit('changeshow', e)
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
						this.child.down()
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
			bilibili() {
				// if(this.numk != e) {
				// 	this.numk = 1
					
					
					if(this.keduoli == 0) {
						uni.hideTabBar()
						this.dd = -100
					}else {
						uni.showTabBar({
							fail() {
								console.log('珂朵莉')
							}
						})
						this.dd = -95
						
					}
					helper.contminlist.dd = -100
					// console.log(11,'k')
				// } else {
				// 	console.log(11,'k1')
					
				// 	this.numk = e
				// 	helper.contminlist.dd = 0
				// }
			},
			getmv(id,name) {
				uni.navigateTo({
					url: `/pages/video/video?id=${id}&index=3&title=${name}`
				})
			}
		},
		computed: {
			showhomein() {
				this.$store.state.showhome
			}
		},
		watch: {
			isminshow(val) {
				this.keduoli = val
				this.bilibili()
			},
			showhomein(val) {
				if(val == 0) {
					helper.contminlist.dd = -100
					this.dd = -100
				}
			}
		}
	}
</script>

<style lang="scss">
	.homebanner {
		overflow: hidden;
		padding: 30rpx;
		.top {
			padding-bottom: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.top-left {
				display: flex;
				.playicon {
					margin-right: 10rpx;
					width: 45rpx;
					height: 45rpx;
				}
				.text {
					margin-right: 15rpx;
					color: var(--indexfontcolor);
				}
				.num {
					color: var(--searchlistfontcolor);
				}
			}
			.topright {
				.allicon {
					width: 45rpx;
					height: 45rpx;
				}
			}
		}
	
		.musicelist {
			overflow-y: auto;
			height: 100vh;
			.row:first-child {
				padding-top: 0;
			}
			.row {
				padding-top: 50rpx;
				display: flex;
				justify-content: space-between;
				color: var(--indexfontcolor);
				.row-left {
					.title {
						color: var(--indexfontcolor);
						font-size: 34rpx;
					}
					.name {
						width: 550rpx;
						overflow-x: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: 26rpx;
						color: var(--searchlistfontcolor);
					}
				}
				.row-right{
					display: flex;
					align-items: center;
					.playmv {
						margin-right: 20rpx;
						box-sizing: border-box;
						padding: 0 0 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 1rpx solid var(--bordercolor);
						width: 50rpx;
						height: 40rpx;
						border-radius: 14rpx;
						.playmask {
							width: 20rpx;
							height: 20rpx;
						}
					}
					.more {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	
	}
</style>
