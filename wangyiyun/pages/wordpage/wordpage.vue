<template>
	<view class="wordpage">

		<!-- // 评论顶部 -->
		<view class="navbar">
			<!-- // 评论顶部的返回图标 -->
			<view class="navback" @click="back">
				<image src="../../static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>
			<!-- // 评论以及评论数量 -->
			<view class="wordnum">
				<view class="text1">
					评论
				</view>
				<view class="text2">
					{{'('+ total + ')'}}
				</view>
			</view>
			<!-- // 分享图标 -->
			<view class="navgive">
				<image src="../../static/icon/3.1分享.png" mode="aspectFit"></image>
			</view>
		</view>


		<!-- // 你点评论的歌曲,显示歌曲图片,名字,歌手 -->
		<view class="centerbox">
			<!-- // 歌曲图片区 -->
			<view class="centerpic">
				<image :src="fewmus.img" mode="aspectFill"></image>
			</view>
			<!-- // 歌名 歌手,关注按钮-->
			<view class="centertitle">
				<view class="title">
					{{fewmus.title}}
				</view>
				<text class="line">-</text>
				<view class="singer">
					{{fewmus.name}}
				</view>
				<text class="radius">·</text>

				<view class="focussinger">
					关注
				</view>
			</view>
		</view>


		<!-- // 评论区内容 -->

		<view class="content-read">
			<view class="read-top">
				<view class="read-text">
					评论区
				</view>
				<!-- // 评论排序栏 -->
				<view class="read-bar">
					<view class="read-hot" v-for="(item, index) in readlist" 
						@click="clickbar(index),getbtnlist(index)"
						:class="barindex === index ? 'textatv' : ''"
						>
						{{item}}
					</view>

				</view>
			</view>

			<!-- // 评论区版心内容 -->

			<view class="read-banner">

				<!-- // 一个一个评论区楼层 -->
				<view class="minbanner" v-for="(item, i) in hotpl" :key="i">
					<!-- // 版心顶部 -->
					<view class="leftbox">
						<view class="left-pic">
							<image :src="item.user.avatarUrl
" mode="aspectFill"></image>
						</view>
					</view>

					<view class="right-text">

						<view class="right-line">

						</view>
						<view class="right-top">
							<view class="text-name">
								{{item.user.nickname}}
								<view class="text-time">
									{{item.timeStr}}
								</view>
							</view>

							<view class="orientation">
								<view class="orientation-num">
									{{ item.likedCount > 10000 ? (item.likedCount / 10000).toFixed(1) + '万' : item.likedCount }}
								</view>
								<view class="orientation-icon">
									<image src="../../static/icon/点赞.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>

						<view class="content-text-box">
							<p class="read-text-content">
								{{item.content}}
							</p>
							<view class="floor-all" @click="getfloor(item.commentId,id, i)" v-if="totalCount[i]">
								{{totalCount[i]}}条回复 <view class="flooricon">
									<image src="/static/icon/更多.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="pl-btn" @click="getpl(id)">
					加载更多
				</view>

			</view>
		</view>

		<!-- // Reply 回复的意思 -->
		<view class="Reply">
			<view class="Reply-text">
				<textarea type="text" auto-height placeholder="珂朵莉世界第一可爱"
					placeholder-style="color: rgba(255,255,255,.6)" v-model="sendtext" id="Reply-input"></textarea>
			</view>

			<view class="Reply-send">
				<view class="Reply-icon">
					<image src="../../static/icon/发送-提交.png" mode="aspectFit"></image>
				</view>
				<view class="Reply-send-text">
					发送
				</view>
			</view>
		</view>


		<view class="maskfloor" v-if="isfloor" @click="changefloor"></view>

		<!-- // 点击回复,弹起楼层的详情 -->
		<!-- todo: 本想复用css,但是由于比较简单,而查找对应css比较难,就没有复用 -->

		<view class="floor-box" v-if="isfloor">
			<!-- // 顶部返回等 -->
			<view class="floor-back">
				<view class="back-icon" @click="changefloor">
					<image src="../../static/icon/系统返回2.png" mode="aspectFit"></image>
				</view>
				<view class="back-text">
					回复
					<text class="text5">{{'(' + totalCount[plid] + ')'}}</text>
				</view>
			</view>
			<!-- // 顶部回复的内容 -->
			<view class="read-banner">
				<!-- // 一个一个评论区楼层 -->
				<view class="minbanner">
					<!-- // 版心顶部 -->

					<view class="leftbox">
						<view class="left-pic">
							<image :src="floortitle.user.avatarUrl" mode="aspectFill"></image>
						</view>
					</view>

					<view class="right-text">

						<view class="right-line">

						</view>
						<view class="right-top">
							<view class="text-name">
								<!-- {{floortitle.user.nickname}} -->
								{{floortitle.user.nickname}}
								<view class="text-time">
									{{floortitle.timeStr}}
								</view>
							</view>

							<view class="orientation">
								<view class="orientation-num">
									{{ floortitle.likedCount > 10000 ? (floortitle.likedCount / 10000).toFixed(1) + '万' : floortitle.likedCount }}
								</view>
								<view class="orientation-icon">
									<image src="../../static/icon/点赞.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>

						<view class="content-text-box">
							<p class="read-text-content" style="padding-bottom: 40rpx;">
								{{floortitle.content}}
							</p>
						</view>
					</view>
				</view>

				<!-- // 回复的内容,上方是被回复的那一条 -->

				<view class="keduoli-text" style="overflow: auto">
					<view class="keduoli-top">
						全部回复
					</view>
					<view class="minbanner" v-for="(con, i) in floorcon" :key="i">
						<!-- // 版心顶部 -->

						<view class="leftbox">
							<view class="left-pic">
								<image :src="con.user.avatarUrl" mode="aspectFill"></image>
							</view>
						</view>

						<view class="right-text">

							<view class="right-line">

							</view>
							<view class="right-top">
								<view class="text-name">
									{{con.user.nickname}}
									<view class="text-time">
										{{con.timeStr}}
									</view>
								</view>

								<view class="orientation">
									<view class="orientation-num">
										{{ con.likedCount > 10000 ? (con.likedCount / 10000).toFixed(1)+ '万' : con.likedCount }}
									</view>
									<view class="orientation-icon">
										<image src="../../static/icon/点赞.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>

							<view class="content-text-box">
								<p class="read-text-content" style="padding-bottom: 40rpx;">
									{{con.content}}
								</p>
							</view>
						</view>
					</view>

					<view class="pl-btn" style="margin: 50rpx auto 80rpx;" @click="getfloor(getfloorlist[plid], id)">
						加载更多
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				id: 1403318151,
				readlist: ['最热', '最新', '推荐'],
				barindex: 0,
				newpl: [],
				hotpl: [],
				toppic: [],
				fewmus: null,
				total: '',
				sendtext: '',
				isfloor: false,
				floortitle: [],
				floorcon: [],
				totalCount: [],
				plid: 0,
				getfloorlist: []
			};
		},
		onLoad(e) {
			let commentsid = uni.getStorageSync('musiclist')[e.few]
			this.id = commentsid.e
			// console.log(e,commentsid)
			this.getpl(commentsid.e)
			this.getpic(commentsid)
		},
		methods: {
			getbtnlist(e) {
				if(e === 0) {
					this.gethot(this.id)
				}else if(e === 1) {
					this.getnew(this.id)
				}else {
					console.log(e)
				}
			},
			getnew(e) {
				uni.request({
					url: `${helper.url}/comment/music?id=${e}&limit=20&type=0`,
					success: (res) => {
						// console.log(res)
						this.hotpl = res.data.comments
						this.totalCount = []
						this.getplid()
					}
				})
			},
			gethot(e) {
				uni.request({
					url: `${helper.url}/comment/hot?id=${e}&limit=20&type=0`,
					success: (res) => {
						this.hotpl = res.data.hotComments
						this.totalCount = []
						this.getplid()
					}
				})
			},
			changefloor() {
				this.isfloor = false
			},
			getfloor(id1, id2, i) {
				// console.log(id1,id2, this.getfloorlist)
				let keduoli2 = this.floorcon.length + 20
				// console.log(i)
				this.plid = i
				// console.log(id1,id2)
				uni.request({
					url: `${helper.url}/comment/floor?parentCommentId=${id1}&id=${id2}&limit=20&offset=${keduoli2}&type=0`,
					success: (res) => {
						// console.log(res)
						this.floortitle = res.data.data.ownerComment
						this.floorcon = [...this.floorcon, ...res.data.data.comments]
						this.isfloor = true
						// console.log(res)
					}
				})
			},
			back() {
				uni.navigateBack({
					url: '/pages/goindex/goindex'
				})
			},
			clickbar(e) {
				this.barindex = e
			},
			getpl(e) {
				
				let keduoli1 = this.hotpl.length + 20
				// console.log(e)
				uni.request({
					url: `${helper.url}/comment/hot?id=${e}&limit=20&offset=${keduoli1}&type=0`,
					success: (res) => {
						// console.log(res)
						this.total = res.data.total
						this.hotpl = [...this.hotpl, ...res.data.hotComments]
						// console.log(res, this.hotpl)
						this.getplid()
					}
				})
			},
			
			// 获取所有评论者的id
			getplid() {
				for (let i = 0; i < this.hotpl.length; i++) {
					this.getfloorlist.push(this.hotpl[i].commentId)
					this.getpllist(this.hotpl[i].commentId,this.id)
				}
			},
			getpllist(id1, id2) {
				// console.log(id1,id2)
				uni.request({
					url: `${helper.url}/comment/floor?parentCommentId=${id1}&id=${id2}&type=0`,
					success: (res) => {
						this.totalCount.push(res.data.data.totalCount)
						// console.log(this.totalCount)
					}
				})
			},
			getpic(list) {
				this.fewmus = list
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}

	.wordpage {
		background-color: #151515;
		overflow: auto;
		width: 750rpx;
		height: 100vh;

		.navbar {
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 150rpx;
			background-color: #2c2c2c;

			.navback,
			.navgive {
				width: 50rpx;
				height: 50rpx;
			}

			.wordnum {
				display: flex;
				width: 75%;
				justify-content: start;
				font-size: 35rpx;
				color: #fff;
			}
		}

		.centerbox {
			display: flex;
			padding: 30rpx 20rpx 40rpx;
			// align-items: center;
			// padding: 0 20rpx;
			background-color: #151515;
			border-bottom: 2rpx solid #141414;

			// height: 150rpx;
			.centerpic {
				margin-right: 20rpx;
				overflow: hidden;
				background-size: cover;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.centertitle {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: #fff;

				.line,
				.radius {
					padding: 0 8rpx;
				}

				.focussinger {
					color: #e6483e;
				}
			}
		}

		.content-read {
			// margin-bottom: 100rpx;
			padding: 0 20rpx;
			background-color: #151515;

			.read-top {
				padding: 40rpx 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;

				.read-text {
					font-size: 34rpx;
					font-weight: 600;
				}

				.read-bar {
					display: flex;

					.read-hot {
						font-size: 30rpx;
						color: #a9a9a9;

						&:nth-child(2) {
							padding: 0 25rpx;
							border-left: 2rpx solid #1e1e1e;
							border-right: 2rpx solid #1e1e1e;
						}

						&:nth-child(1) {
							margin-right: 25rpx;
							// border-left: 2rpx solid #fff;
						}

						&:nth-child(3) {
							margin-left: 25rpx;
							// border-left: 2rpx solid #fff;
						}
					}

					.textatv {
						font-weight: 600;
						color: #fff;
					}
				}
			}
		}

		.read-banner {
			.minbanner {
				&:last-child {
					padding-bottom: 105rpx;
				}

				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;

				.leftbox {
					margin-right: 20rpx;

					.left-pic {
						background-size: cover;
						width: 80rpx;
						height: 80rpx;
						overflow: hidden;
						border-radius: 50%;
						background-color: #fff;
					}
				}

				.right-text {
					position: relative;
					width: 100%;

					.right-line {
						position: absolute;
						bottom: 10rpx;
						left: 0;
						width: 150%;
						height: 2rpx;
						background-color: rgba(255, 255, 255, .2);
					}

					.right-top {
						padding-bottom: 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #fff;

						.text-name {
							font-size: 28rpx;
							letter-spacing: 5rpx;

							.text-time {
								font-size: 20rpx;
								letter-spacing: 0;
								color: #797979;
							}
						}

						.orientation {
							display: flex;
							color: #797979;

							.orientation-icon {
								margin-left: 8rpx;
								width: 40rpx;
								height: 40rpx;
							}
						}
					}

					.content-text-box {
						.read-text-content {
							line-height: 1.4;
							color: #fff;
							padding-bottom: 30rpx;
						}

						.floor-all {
							padding-bottom: 35rpx;
							display: flex;
							align-items: center;
							color: #607e92;
							font-size: 26rpx;

							.flooricon {
								width: 30rpx;
								height: 30rpx;
							}
						}
					}
				}
			}
			.pl-btn {
				width: 40%;
				padding: 38rpx 20rpx;
				background-color: rgba(255, 255, 255, .2);
				border-radius: 8rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				margin: 50rpx auto 150rpx;
			}
		}

		.Reply {
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background-color: #1d1c21;

			.Reply-text {
				min-width: 400rpx;
				// max-width: 500rpx;
				color: #fff;

				#Reply-input {
					width: 100%;
					height: 100%;
				}
			}

			.Reply-send {
				display: flex;
				// justify-content: space-between;
				align-items: center;

				// width: 150rpx;
				.Reply-icon {
					margin-right: 20rpx;
					width: 40rpx;
					height: 40rpx;
				}

				.Reply-send-text {
					color: rgba(255, 255, 255, .6);
					font-weight: 550;
					white-space: nowrap;
				}
			}
		}

		.floor-box {
			overflow-y: auto;
			background-color: #141414;
			// overflow: hidden;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			z-index: 10;
			position: fixed;
			padding: 0 20rpx;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 92%;
			// background-color: skyblue;

			.floor-back {
				padding: 30rpx 0 50rpx;
				display: flex;
				align-items: center;

				.back-icon {
					margin-right: 25rpx;
					width: 50rpx;
					height: 50rpx;
				}

				.back-text {
					color: #fff;
				}
			}
		}

		.keduoli-text {
			.keduoli-top {
				color: #fff;
				padding: 50rpx 0 30rpx;
			}
		}

		.maskfloor {
			z-index: 5;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .2);
		}
	}
</style>