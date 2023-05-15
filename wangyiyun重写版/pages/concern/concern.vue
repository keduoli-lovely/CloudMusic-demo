<template>
	<view class="concern night">
		<view class="mask-essay" v-if="showmore" @click="sendcon">

		</view>
		
		<view class="header" v-show="showheader">
			<indexleftbar></indexleftbar>
			
			<view class="header-title">
				动态
			</view>

			<view class="addessay">
				<view class="essayicon" @click="sendcon">
					<image src="/static/icon/add.png" mode="aspectFit"></image>
				</view>

				<view class="more" v-if="showmore">
					<view class="mask">

					</view>
					<view class="sendtext">
						发图文
					</view>
					<view class="sendvideo">
						发视频
					</view>
					<view class="ksong">
						k歌
					</view>
					<view class="recording">
						录声音
					</view>
				</view>
			</view>
		</view>

		<view class="owned">
			<view class="myowned">
				<view class="owed-img" style="background-color: #D9AFD9;
background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);padding: 15rpx;
">
					<image src="/static/icon/全球.png" mode="aspectFill"></image>
				</view>
				<text class="t1">我的圈子</text>
			</view>

			<view class="scrollowned">

				<view class="myowned" v-for="(item, index) in follow" :key="index" >
					<view class="owed-img" @click.stop="getliveuserhome(item.id)">
						<image :src="item.img1v1Url" mode="aspectFill"></image>
					</view>
					<text class="t1">{{item.name}}</text>
				</view>

				<view class="myowned">
					<view class="owed-img" style="background-color: #666;padding: 14rpx;width: 90rpx,height: 90rpx">
						<image src="/static/icon/更多2.png" mode="aspectFill"></image>
					</view>
					<text class="t1">全部好友</text>
				</view>
			</view>

		</view>


		<view class="choose">
			<view class="line">
				<!-- // 线条 -->
			</view>
			<view class="choosebar">
				<view class="bar-left">
					我的关注
				</view>

				<view class="bar-right">
					<view class="all" v-for="(item, index) in barlist" :key="index" @click="getdet(index)" :class="index == subind ? 'atv' : ''">
						{{item}}
					</view>
				</view>
			</view>

			<view class="con">

			</view>
		</view>
		
		<spareWheel v-if="issparewheel || subind == 2"></spareWheel>
		
		<NewsThatCares 
		v-show="subind == 0 || subind == 1"
		v-for="(item, index) in liveusertolive" 
		:name="item.user.nickname" 
		:pic="item.user.avatarUrl"
		:id="item.user.userId" 
		:con="item.json" 
		:livenum="item.info.likedCount" 
		:plun="item.info.commentCount"
		:give="item.insiteForwardCount"
		:listpic="item.pics"
		:time="item.eventTime"
		:threadId="item.threadId"
		></NewsThatCares>
		
		

		<minmusic 
		v-show="$store.state.showplaycomponent" 
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd" 
		:love="love"
		:indexk="isindex" 
		:top="topnum" 
		:isshow="isshow" 
		@stopkk="bilibili"
		ref="child"
		></minmusic>
		
		<ReviewDetails></ReviewDetails>
		
		<view class="bg">
			
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				lasttime: '',
				isindex: 1,
				isshow: 1,
				dd: -95,
				numk: 1,
				showmore: false,
				follow: [],
				liveusertolive: [],
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				topnum: helper.contminlist.topnum,
				love: helper.contminlist.islove,
				// 阻止没有数据还发送请求
				stopsend: false,
				barlist: ['全部', '音乐人', '朋友'],
				subind: 0
			};
		},
		onLoad() {
			let key = uni.getStorageSync('cookie')
			if(key) {
				this.getliveuser()
				this.gethot()
				this.stopsend = false
			}
		},
		onReachBottom() {
			this.gethot()
			if(!this.stopsend) {
				uni.showToast({
					title: '加载中...',
					duration: 1500,
					mask: true,
					icon: 'none'
				});
			}else {
				uni.showToast({
					title: '没有更多了',
					duration: 1500,
					mask: true,
					icon: 'none'
				});
			}		
		},
		mounted() {
			uni.$on('conceplay', this.playmin)
			uni.$on('lovedown', this.lovedownplay)
			
		},
		beforeDestroy() {
			this.$off('lovedown')
		},
		methods: {
			lovedownplay() {
				try{
					this.$refs.child.down()
				}catch(e){
					console.log('珂朵莉世界第一可爱')
				}
			},
			getdet(i) {
				this.subind = i
			},
			bilibili(e) {
				if (this.numk != e) {
					this.numk = 1
					uni.showTabBar({
						fail() {
							console.log('珂朵莉')
						}
					})
					helper.contminlist.dd = -100
					this.dd = -95
				} else {
					this.dd = -100
					this.numk = e
					helper.contminlist.dd = 0
				}
			},
			playmin(e) {
				this.startgq(e.id, e.img, e.title, e.name)
			},
			stormusiclist(e, img, title, name, size, love) {
				let value = uni.getStorageSync('musiclist');
				let np = false
				if (value) {
					let kenum = value.findIndex(function(item) {
						return item.e === e
					})
					if (kenum >= 0) {
						this.$store.commit('changeSubscript', kenum)
					} else if (kenum <= 0) {
						this.$store.commit('changeSubscript', 0)
					}
				}

				if (value.length > 0) {
					let keke = value.filter((item) => {
						return item.e == e
					})
					if (keke.length == 0) {
						np = true
					} else {
						np = false
					}
				} else if (!value || value.length === 0) {
					uni.setStorageSync('musiclist', [{
						e,
						title,
						name,
						img,
						size,
						love
					}])

				}

				if (np) {
					let tp = value
					tp.unshift({
						e,
						title,
						name,
						img,
						size,
						love
					})
					uni.setStorageSync('musiclist', tp);
				}
			},
			islove(id) {
				let idlist = uni.getStorageSync('userliveid')
				let x
				if (idlist) {
					x = idlist.some(item => {
						return item === id
					})
				}
				return x
			},
			startgq(id, img, title, name) {
				uni.hideTabBar()
				uni.request({
					url: `${helper.url}/check/music?id=${id}`,
					success: (res) => {
						this.isplay = res.data.success


						if (!this.isplay) {
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
							if (uni.getStorageSync('musiclist').length <= 1) {
								helper.audiok.src = ''
								this.$store.commit('changeControl', 1)
							} else {
								try{
									this.$refs.child.down()
								}catch(e){
									console.log('珂朵莉世界第一可爱')
								}
							}
						})
						this.id = id
						helper.moredetail.push({
							"name": title,
							"singer": name
						})
						this.hello = 0

						this.$store.commit('changeControl', 0)
						uni.request({
							url: `${helper.url}/comment/music?id=${id}&limit=1`,
							success: (res) => {
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
							url: `${helper.url}/song/url/v1?id=${id}&level=exhigh`,
							success: (res) => {

								this.musicpic = img
								helper.contminlist.musicpic = img

								this.name = title
								helper.contminlist.name = title

								this.ren = name
								helper.contminlist.ren = name


								this.dd = 0
								helper.contminlist.dd = 0

								this.$store.commit('changeshow', 1)

								helper.audiok.autoplay = true
								helper.audiok.src = res.data.data[0].url

							}
						})
					}
				})
			},
			gethot() {
				if(this.stopsend) return
				let key = uni.getStorageSync('cookie')
				uni.request({
					url: `${helper.url}/event?pagesize=30`,
					data: {
						cookie: key
					},
					success: (res) => {
						if (this.lasttime == res.data.lasttime) {
							this.stopsend = true
							uni.showToast({
								title: '没有更多了',
								duration: 1500,
								mask: true,
								icon: 'none'
							});
							return

						}
						this.lasttime = res.data.lasttime
						let rows = res.data.event
						this.liveusertolive = [...rows, ...this.liveusertolive]
					}
				})

			},
			getliveuser() {
				let key = uni.getStorageSync('cookie')
				if (!key && !this.follow) return
				uni.request({
					url: `${helper.url}/artist/sublist`,
					data: {
						cookie: key
					},
					success: (res) => {
						console.log(res)
						this.follow = res.data.data
					}
				})
			},
			sendcon() {
				this.showmore = !this.showmore
			},
			getliveuserhome(id) {
				uni.reLaunch({
					url: `/pages/loveuserhome/loveuserhome?id=${id}`
				})
			}
		},
		computed: {
			issparewheel() {
				return this.liveusertolive.length == 0 ? true : false
			},
			showheader() {
				return this.$store.state.showheader
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}

	.concern {
		overflow-x: hidden;
		padding: 140rpx 20rpx 140rpx;
		width: 750rpx;
		height: 100%;
		// overflow: hidden;
		background-color: var(--searchlistbgcolor);
		.bg {
			z-index: -1;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--searchlistbgcolor);
		}
		.mask-essay {
			z-index: 99;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.header {
			display: flex;
			justify-content: space-between;
			padding: 40rpx 40rpx 40rpx 30rpx;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 140rpx;
			z-index: 999;
			// background-color: #999;
			background-color: var(--searchlistbgcolor);

			.header-title {
				font-size: 34rpx;
				color: var(--indexfontcolor);
			}

			.addessay {
				position: relative;
				height: 60rpx;

				.essayicon {
					width: 50rpx;
					height: 50rpx;
					overflow: hidden;
					border-radius: 50%;
					background-color: red;
					border: 8rpx solid red;
				}

				.more {
					position: absolute;
					right: -28rpx;
					top: 80rpx;
					width: 280rpx;
					padding: 0 40rpx;
					background-color: skyblue;
					border-radius: 14rpx;

					.mask {
						position: relative;
						width: 100%;
						height: 1rpx;
					}

					.mask::before {
						content: '';
						position: absolute;
						top: -16rpx;
						left: 170rpx;
						width: 0;
						height: 0;
						border: 38rpx;
						border-bottom: 20rpx solid skyblue;
						border-right: 20rpx solid transparent;
						border-left: 20rpx solid transparent;
					}

					.sendtext,
					.sendvideo,
					.ksong,
					.recording {
						padding: 30rpx;
						border-bottom: 1rpx solid #e0e0e0;
					}

					.recording {
						border: 0;
					}
				}
			}
		}

		.owned {
			display: flex;
			align-items: center;
			margin-bottom: 38rpx;

			.myowned {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-right: 30rpx;
				.owed-img {
					margin-bottom: 8rpx;
					width: 110rpx;
					height: 110rpx;
					overflow: hidden;
					border-radius: 50%;
					background-color: #fff;
				}

				.t1 {
					color: var(--indexfontcolor);
					font-size: 28rpx;
				}
			}

			.scrollowned {
				overflow-x: auto;
				display: flex;
			}
		}

		.choose {
			position: relative;
			padding-top: 10rpx;

			.line {
				position: absolute;
				top: 0;
				left: -30rpx;
				width: 150%;
				height: 1rpx;
				background-color: var(--bordercolor);
			}

			.choosebar {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bar-left {
					flex: 4;
					color: var(--indexfontcolor);
				}

				.bar-right {
					color: var(--btnfontcolor);
					flex: 3;
					display: flex;
					justify-content: space-between;

					.atv {
						color: var(--indexfontcolor);
					}
				}
			}
		}
	}
</style>