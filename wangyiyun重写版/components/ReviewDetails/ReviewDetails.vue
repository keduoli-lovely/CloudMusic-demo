<template>
	<view class="Reviewdetails" :style="{top: revtop + '%'}">
		<view class="top">
			<view class="left">
				<view class="back-icon" @click.stop="back">
					<image src="/static/icon/系统返回2.png" mode="aspectFit"></image>
				</view>
				<view class="text">
					动态
				</view>
			</view>

			<view class="right">
				<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
			</view>
		</view>

		<view class="con">
			<view class="header">
				<view class="user-pic">
					<image :src="context.bgimg" mode="aspectFill"></image>
				</view>
				<view class="user-name">
					<view class="name">
						{{context.name}}
					</view>
					<view class="sned-time">
						{{context.time}}
					</view>
				</view>
			</view>

			<view class="con-box">
				<view class="con-text">
					{{context.con}}
				</view>

				<view class="con-pic" v-if="context.pic">

					<view class="con-pic-row" v-for="(item, i) in context.pic " :key="i">
						<image :src="item.rectangleUrl" mode="aspectFill"></image>
					</view>

				</view>
			</view>
		</view>

		<view class="floor">
			<view class="floor-bar">
				<!-- // 评论 -->
				<view class="floor-pl">
					评论<text class="t1">13</text>
				</view>
				<!-- // forward : 转发 -->
				<view class="forward">
					转发<text class="t1">13</text>
				</view>

				<view class="Like">
					赞<text class="t1">13</text>
				</view>
			</view>

			<view class="pl-box">
				<view class="bar-title">
					精彩评论
				</view>

				<view class="row-comments"  v-for="(item,i) in hotComments" :key="i">
					<view class="row-left">
						<view class="row-left-pic">
							<image :src="item.user.avatarUrl
" mode="aspectFill"></image>
						</view>
					</view>

					<view class="row-right">
						<view class="row-user-dt">
							<view class="row-right-rop">
								<view class="row-user-name">
									{{item.user.nickname
}}
								</view>
								<view class="row-user-add">
									155
									<view class="row-user-add-icon">
										<image src="/static/icon/点赞1.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>

							<view class="row-user-send-time">
								{{item.timeStr}}
							</view>
						</view>

						<view class="row-user-pl">
							{{item.content}}
						</view>


						<view class="row-more">
							<view class="more-num">
								3条回复
							</view>
							<view class="more-icon">
								<image src="/static/icon/前往.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		name: "ReviewDetails",
		data() {
			return {
				context: '',
				hotComments: [],
				comments: []
			};
		},
		mounted() {
			uni.$on('sendmsg', this.getdata)
		},
		methods: {
			getthread(id) {
				uni.request({
					url: `${helper.url}/comment/event?threadId=${id}`,
					success: (res) => {
						console.log(res)
						this.hotComments = res.data.hotComments
						this.comments = res.data.comments
					}
				})
			},
			getdata(e) {
				console.log(e)
				this.context = e
				this.getthread(e.id)
			},
			back() {
				document.body.style.cssText = ``
				this.$store.commit('changeshowrevtop', 100)
			} 
		},
		computed: {
			revtop() {
				return this.$store.state.showrevtop
			}
		}
	}
</script>

<style lang="scss">
	.Reviewdetails {
		z-index: 999;
		position: fixed;
		// top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		background-color: #151515;
		color: #fff;
		transition: all .6s ease;

		.top {
			padding: 50rpx 30rpx 35rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;

				.back-icon {
					margin-right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}

				.text {
					font-size: 38rpx;
				}
			}

			.right {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.con {
			padding: 0 30rpx;

			.header {
				display: flex;
				.user-pic {
					margin-bottom: 25rpx;
					width: 90rpx;
					height: 90rpx;
					overflow: hidden;
					border-radius: 50%;
				}
				.user-name {
					padding-top: 10rpx;
					margin-left: 20rpx;
					.sned-time {
						font-size: 24rpx;
						color: #666;
					}
				}
			}
		}

		.con-box {
			.con-text {}

			.con-pic {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 10rpx;

				.con-pic-row {
					width: 33%;
					height: 240rpx;
				}
			}
		}

		.floor {
			margin-top: 50rpx;
			padding: 0 30rpx;

			.floor-bar {
				padding: 20rpx 0;
				width: 65%;
				display: flex;
				justify-content: space-between;

				.floor-pl,
				.forward,
				.Like {
					display: flex;
					align-items: center;

					.t1 {
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #666;
					}
				}
			}

			.pl-box::before {
				content: '';
				position: absolute;
				top: 0;
				left: -10%;
				width: 150%;
				height: 1rpx;
				background-color: #666;
			}

			.pl-box {
				padding: 30rpx 0;
				position: relative;
				// border-top: 1rpx solid #666;
				.bar-title {
					letter-spacing: 5rpx;
					font-size: 30rpx;
					margin-bottom: 30rpx;
				}
				.row-comments {
					margin-bottom: 30rpx;
					display: flex;
					// align-items: center;

					.row-left {
						.row-left-pic {
							width: 80rpx;
							height: 80rpx;
							overflow: hidden;
							border-radius: 50%;
						}
					}

					.row-right {
						margin-left: 20rpx;
						flex: 7;

						.row-right-rop {
							display: flex;
							justify-content: space-between;

							.row-user-name {}

							.row-user-add {
								display: flex;

								.row-user-add-icon {
									margin-left: 20rpx;
									width: 40rpx;
									height: 40rpx;
								}

							}
						}

						.row-user-send-time {
							font-size: 24rpx;
							color: #666;
						}

						.row-user-pl {
							padding: 20rpx 0;
						}
						
						.row-more {
							display: flex;
							align-items: center;
							
							.more-num {	
								color: blue;
								font-size: 28rpx;
							}
							.more-icon {
								width: 38rpx;
								height: 38rpx;
							}
						}
					}
				}
			}
		}
	}
</style>