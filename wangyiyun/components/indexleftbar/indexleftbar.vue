<template>
	<view class="indexbar night">
		<view class="indexbarmask" @click="isbgmask" v-show="ischange">
			
		</view>
		<view class="moreicon" @click="isbgmask">
			<image src="/static/icon/更多5.png" mode="aspectFit"></image>
		</view>

		<view class="morelist" v-show="ischange" @touchmove="movemorebox" @touchstart="startmovebox" @touchend="endmovebox" :style="{left: leftbox+ 'rpx'}">
			<!-- 更多列表页面 -->
			<view class="user-top">
				<!-- 用户头像 -->
				<view class="user">
					<view class="user-pic">
						<image src="../../static/img/ban2.png" mode="aspectFill"></image>
					</view>
					<!-- // 用户名称 -->
					<view class="user-name">
						珂朵莉
					</view>
					<!-- // 前网用户中心的小箭头 -->
					<view class="getuserhomeicon">
						<image src="/static/icon/前进.png" mode="aspectFit"></image>
					</view>
				</view>

				<!-- // 扫一扫图标 -->
				<view class="qricon">
					<image src="../../static/icon/扫一扫.png" mode="aspectFit"></image>
				</view>
			</view>

			<!-- // 更多页面的列表 -->

			<view class="morepagelist">
				<view class="list1">
					<view class="list1text">
						<view class="list1icon">
							<image src="/static/icon/排序.png" mode="aspectFit"></image>
						</view>
						<view class="list1text">
							珂朵莉世界第一
						</view>
					</view>
					
					<view class="toget">
						<image src="../../static/icon/前往.png" mode="aspectFit"></image>
					</view>
					
					<view class="listline">

					</view>
				</view>

				<view class="list1">
					<view class="list1text">
						<view class="list1icon">
							<image src="/static/icon/排序.png" mode="aspectFit"></image>
						</view>
						<view class="list1text">
							珂朵莉世界第一
						</view>
					</view>
					
					<view class="toget">
						<image src="../../static/icon/前往.png" mode="aspectFit"></image>
					</view>
					
					<view class="listline">

					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexleftbar",
		data() {
			return {
				ischange: false,
				movestart: 0,
				movebox: 0,
				leftbox: 0
			};
		},
		methods: {
			isbgmask() {
				// console.log()
				this.leftbox = 0
				this.ischange = !this.ischange
			},
			// 计算手指滑动并隐藏更多列表页面
			movemorebox(e) {
				this.movebox = e.changedTouches[0].pageX
				// console.log(this.movestart,this.movebox)
				this.leftbox = -(this.movestart - this.movebox)
				// console.log(this.leftbox)
				// console.log(e.changedTouches[0].pageX)
			},
			startmovebox(e) {
				this.movestart = e.changedTouches[0].pageX
				// console.log(e.changedTouches[0].pageX)
			},
			endmovebox(e) {
				
				if(this.leftbox > -300) {
					this.leftbox = 0
					this.ischange = true
					
				}else {
					this.leftbox = -700
					this.ischange = !this.ischange
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.indexbar {
		box-sizing: border-box;
		.indexbarmask {
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
		}
		.moreicon {
			margin: 0 40rpx 0 0;
			width: 42rpx;
			height: 42rpx;
		}

		.morelist {
			padding: 30rpx;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
			width: 600rpx;
			height: 100%;
			background-color: #151515;

			.user-top {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.user {
					display: flex;
					align-items: center;

					.user-pic {
						margin-right: 15rpx;
						overflow: hidden;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.user-name {
						color: var(--listboxfontcolor);
						font-size: 36rpx;
					}

					.getuserhomeicon {
						width: 35rpx;
						height: 35rpx;
					}
				}

				.qricon {
					width: 60rpx;
					height: 60rpx;
				}
			}

			.morepagelist {
				overflow: hidden;
				box-sizing: border-box;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				margin-top: 20rpx;
				padding: 0 20rpx;
				width: 100%;
				height: 400rpx;
				background-color: var(--topsearchbgcolor);

				.list1 {
					position: relative;
					padding: 24rpx 0 30rpx 14rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.listline {
						position: absolute;
						left: 10rpx;
						bottom: 0;
						width: 140%;
						height: 1rpx;
						background-color: var(--bordercolor);
					}

					.list1text {
						display: flex;
						align-items: center;
						.list1icon {
							padding-right: 15rpx;
							width: 60rpx;
							height: 60rpx;
						}

						.list1text {
							color: var(--listboxfontcolor);
							font-size: 36rpx;
						}
					}
					.toget {
						width: 39rpx;
						height: 39rpx;
					}
				}
			}
		}
	}
</style>