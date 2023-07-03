<template>
	<view class="myhome night" @touchmove="movechangeop" @touchstart="keduoli1">
		<view class="header" v-if="showheader">

			<view class="afterdiv" :style="{opacity: opactiv}">

			</view>
			<indexleftbar></indexleftbar>
			<view class="state">
				<!-- <input type="text" class="ipt" v-model="textstate"> -->
			</view>
			<view class="search" @click="getSearchHome">
				<image src="../../static/icon/3.1-搜索.png" mode="aspectFit"></image>
			</view>
		</view>

		<view class="banner">
			<view class="user">
				<view class="pic">
					<image :src="userheadpic" mode="aspectFill"></image>
				</view>
				<view class="login-online" v-if="loginState">
					<view class="name">
						{{username}}
					</view>
					<view class="grade">
						<view class="concern">
							<text class="t1">{{follow}}</text>
							<text class="t2">关注</text>
						</view>
						<view class="followers">
							<text class="t3">{{followeds}}</text>
							<text class="t4">粉丝</text>
						</view>
						<view class="lv">
							<text class="t5">LV.</text>
							<text class="t6">10</text>
						</view>
					</view>
				</view>

				<view class="out-line" v-if="!loginState" @click="login">
					<text class="out-text">立即登入</text>
					<view class="out-icon">
						<image src="/static/icon/前往.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>

			<view class="content">
				<view class="box" @click="getRecentmusice">
					<image src="../../static/icon/Recent.png" mode="aspectFit"></image>
					<text class="t10">最近播放</text>
				</view>

				<view class="box" @click="localfile">
					<image src="../../static/icon/本地.png" mode="aspectFit"></image>
					<text class="t10">本地/下载</text>
				</view>

				<view class="box" @click.stop="getcloud">
					<image src="../../static/icon/云盘2.png" mode="aspectFit"></image>
					<text class="t10">云盘</text>
				</view>

				<view class="box" @click="localfile">
					<image src="../../static/icon/已购.png" mode="aspectFit"></image>
					<text class="t10">已购</text>
				</view>

				<view class="box" @click="localfile">
					<image src="../../static/icon/好友.png" mode="aspectFit"></image>
					<text class="t10">我的好友</text>
				</view>

				<view class="box" @click="localfile">
					<image src="../../static/icon/收藏.png" mode="aspectFit"></image>
					<text class="t10">收藏和赞</text>
				</view>

				<view class="box" @click="localfile">
					<image src="../../static/icon/播客1.png" mode="aspectFit"></image>
					<text class="t10">我的播客</text>
				</view>

				<view class="box addicon" @click="localfile">
					<image src="../../static/icon/添加1.png" mode="aspectFit"></image>
					<text class="t10">音乐应用</text>
				</view>

			</view>

			<view class="live" @click.stop="getlivemusic">
				<view class="live-pic">
					<image :src="userlive.imgurl" mode="aspectFill"></image>
				</view>
				<view class="live-box">

					<view class="title">
						我喜欢的音乐
						<view class="text-header">
							{{userlive.num}}
						</view>
					</view>

					<view class="icon-header">
						<view class="icon">
							<image src="../../static/icon/心动.png" mode="aspectFit"></image>
						</view>
						<text class="t10">心动模式</text>
					</view>


				</view>
			</view>

		</view>

		<MyHomegather ref="gather"></MyHomegather>

		<minmusic v-show="$store.state.showplaycomponent" :imgk="musicpic" :name="name" :ren="ren" :dd="dd" :love="love"
			:indexk="isindex" :top="topnum" :isshow="isshow" @stopkk="bilibili" ref="child"></minmusic>

	</view>
</template>

<script>
	import helper from '../../common/helper';
	import nullFn from '../../utils/nullFn.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				textstate: '',
				isindex: 1,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd: -95,
				topnum: helper.contminlist.topnum,
				love: helper.contminlist.islove,
				isshow: 1,
				key: uni.getStorageSync('cookie'),
				opnum: 0,
				opactiv: 0,
				userlive: '',
				userlivemusice: [],
			};
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.gather.getsong()
				uni.$on('simllardown', this.simllarON)
				uni.$on('playlistdown', this.playlistON)
			})
		},
		mounted() {
			this.picone()
		},
		beforeDestroy() {
			this.$off('simllardown')
			this.$off('playlistdown')
		},
		methods: {
			playlistON() {
				try {
					this.$refs.child.down()
				} catch (e) {
					console.log('珂朵莉世界第一可爱')
				}
			},
			simllarON() {
				try {
					this.$refs.child.down()
				} catch (e) {
					console.log('珂朵莉世界第一可爱')
				}
			},
			keduoli1(e) {
				this.opnum = e.touches[0].pageY
			},
			movechangeop(e) {
				this.opactiv = (this.opnum - e.touches[0].pageY)

			},
			// 本地文件
			localfile() {
				uni.showToast({
					title: 'error',
					duration: 1000,
					icon: 'none'
				});
			},
			// 云盘
			getcloud() {
				if (!this.key) {
					uni.reLaunch({
						url: '/pages/login/login'
					})
					return
				}
				uni.reLaunch({
					url: '/pages/similarPage/similarPage?page=2'
				})
			},
			// 获取最近播放的歌曲
			getRecentmusice() {
				if (!this.key) {

					uni.reLaunch({
						url: '/pages/login/login'
					})
					return
				}
				this.picone()
				uni.navigateTo({
					url: '/pages/similarPage/similarPage?page=1'
				})
			},
			// 获取喜欢列表的第一首歌的图片作为页面的背景
			picone() {
				let live = uni.getStorageSync('userlive')
				let userliveid = uni.getStorageSync('userliveid')
				let key = uni.getStorageSync('cookie')
				if (!key) return
				this.userlive = live
				if (!live || !userliveid.length) {

					uni.request({
						url: `${helper.url}/playlist/detail?id=${live.userid}`,
						data: {
							cookie: this.key
						},
						success: (res) => {
							let tracks = res.data.playlist.tracks
							tracks.forEach(item => {
								this.userlivemusice.push(item.id)
							})

							this.$store.commit('getlivemusicelist', this.userlivemusice)
							uni.setStorageSync('userliveid', this.userlivemusice)
						}
					})
				} else {
					this.$store.commit('getlivemusicelist', userliveid)
				}
			},
			getlivemusic() {
				let userliveid = uni.getStorageSync('userliveid')

				if (!this.key) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				if (userliveid) {
					uni.reLaunch({
						url: '/pages/playlist/playlist?page=2'
					})
				} else {
					this.picone()
					uni.reLaunch({
						url: '/pages/playlist/playlist?page=2'
					})
				}
			},
			cludelist() {
				uni.request({
					url: `${helper.url}/user/cloud`,
					success: (res) => {}
				})
			},
			login() {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			getSearchHome() {
				uni.navigateTo({
					url: "/pages/searchhome/searchhome?page=2"
				})
			},
			bilibili(e) {

				nullFn(true, -95, this)
				this.dd = this.$store.state.showandnone
				// if (this.numk != e) {
				// 	this.numk = 1
				// 	uni.showTabBar({
				// 		fail() {
				// 			console.log('珂朵莉')
				// 		}
				// 	})
				// 	helper.contminlist.dd = -100
				// 	this.dd = -95
				// } else {

				// 	this.numk = e
				// 	helper.contminlist.dd = 0
				// }
			},
		},
		computed: {
			...mapState(['loginState', 'userheadpic', 'username', 'followeds', 'follow', 'userid', 'livemusicelist']),
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

	.myhome {
		padding-top: 180rpx;
		height: 100%;
		background-color: var(--indexgbcolor);

		.header {
			width: 100%;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 30rpx;
			height: 180rpx;

			// background-color: var(--indexgbcolor);
			.afterdiv {
				transition: all .9s ease;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 180rpx;
				content: '';
				background-color: var(--indexgbcolor);
				// opacity: 0;
			}

			.state {
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 15rpx 0 15rpx 30rpx;
				font-size: 22rpx;
				width: 200rpx;
				height: 60rpx;
				// background-color: #fff;
				border-radius: 60rpx;
				// .ipt {
				// 	width: 100%;
				// 	height: 70%;
				// }
			}

			.search {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.banner {
			width: 100%;
			padding: 60rpx 30rpx 40rpx;
			background-color: var(--indexgbcolor);

			.user {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 80rpx;
				position: relative;
				width: 100%;
				height: 200rpx;
				border-radius: 16rpx;
				background-color: var(--indexiconbgcolor);

				.pic {
					// z-index: 10;
					position: absolute;
					top: 0;
					left: 50%;
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					overflow: hidden;
					transform: translate(-50%, -50%);
				}

				.login-online {
					text-align: center;

					.name {
						color: var(--indexfontcolor);
						padding: 10rpx;
					}

					.grade {
						white-space: nowrap;
						padding: 0 0 10rpx;
						// width: 75%;
						display: flex;
						align-items: center;
						justify-content: center;
						color: var(--searchlistfontcolor);

						.concern {
							padding-right: 20rpx;

							.t1 {
								padding-right: 10rpx;
							}

							.t2 {
								font-size: 32rpx;
								font-weight: 520;
							}
						}

						.followers {
							padding: 0 20rpx;
							height: 1em;
							line-height: 1em;
							border-left: 1rpx solid var(--bordercolor);
							border-right: 1rpx solid var(--bordercolor);

							.t3 {
								padding-right: 10rpx;
							}

							.t4 {
								font-size: 32rpx;
								font-weight: 520;
							}
						}

						.lv {
							padding-left: 20rpx;

							.t5 {
								font-weight: 520;
								padding-right: 10rpx;
							}

							.t6 {
								font-size: 32rpx;

							}
						}
					}
				}

				.out-line {
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.out-text {
						font-size: 40rpx;
						font-weight: 550;
						color: #fff;
					}

					.out-icon {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.content {
				margin-top: 50rpx;
				padding: 20rpx;
				height: 350rpx;
				display: flex;
				flex-wrap: wrap;
				background-color: var(--indexiconbgcolor);
				color: var(--indexfontcolor);
				border-radius: 18rpx;

				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 25%;

					image {
						margin-bottom: 10rpx;
						width: 80rpx;
						height: 80rpx;
					}
				}

				.addicon {}
			}

			.live {
				padding: 20rpx 20rpx 20rpx 30rpx;
				margin-top: 50rpx;
				height: 180rpx;
				color: var(--indexfontcolor);
				background-color: var(--indexiconbgcolor);
				border-radius: 14rpx;
				display: flex;
				align-items: center;

				.live-pic {
					margin-right: 20rpx;
					overflow: hidden;
					border-radius: 8rpx;
					width: 130rpx;
					height: 120rpx;
					background-color: #333;
				}

				.live-box {
					width: 85%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						font-size: 32rpx;
						font-weight: 600;

						.text-header {
							line-height: 1.6;
							font-size: 26rpx;
							color: var(--searchlistfontcolor);
						}
					}

					.icon-header {
						box-sizing: content-box;
						white-space: nowrap;
						padding: 6rpx 5rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 160rpx;
						height: 48rpx;
						background-color: transparent;
						border-radius: 35rpx;
						border: 1rpx solid var(--bordercolor);

						.icon {
							margin-right: 6rpx;
							width: 35rpx;
							height: 35rpx;
						}

						.t10 {
							color: var(--indexfontcolor);
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>