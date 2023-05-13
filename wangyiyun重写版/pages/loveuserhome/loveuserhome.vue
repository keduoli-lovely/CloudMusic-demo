<template>
	<view class="love">
		<view class="bg">

		</view>
		<view class="header-bg">
			<image src="/static/video/1.jpg" mode="widthFix"></image>
		</view>
		<view class="header">
			<view class="header-left" @click="back">
				<image src="/static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>

			<view class="header-right">
				<image src="/static/icon/Android更多.png" mode="aspectFit"></image>
			</view>


		</view>


		<view class="about">
			<view class="top">
				<view class="topbox">
					<view class="pic">
						<view class="picbox">
							
							<view class="Pendants">
								<image src="/static/img/109951164255589642.jpg" mode="aspectFill"></image>
							</view>						
							<view class="img-tit">
								<image src="/static/img/ban2.png" mode="aspectFill"></image>
							</view>
						</view>
						
					</view>
					<view class="name">
						神里凌华
						<view class="wyy">
							<image src="/static/img/wyy.png" mode="heightFix"></image>
						</view>
						<view class="vip">
							<image src="/static/img/2.png" mode="heightFix"></image>
						</view>
					</view>
					<view class="livenum">
						<text class="t1">13 关注</text>
						<text class="t2">356.3万 粉丝</text>
						<text class="t3">Lv.8</text>
					</view>
					<view class="detail">
						网易音乐人、歌手、作词、作曲
					</view>
					<view class="box">
						<view class="focus">
							关注
						</view>
					
						<view class="chat">
							聊天
						</view>
					
						<view class="more">
							<view class="more-icon">
								<image src="/static/icon/返回4.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					
					<view class="else">
						<view class="tarbar">
							<view class="home" v-for="(item, i) in tarbar" :key="i">
								{{item}}
							</view>
						</view>
					
						<!-- // 组件 -->
					<liveuserhome></liveuserhome>
					
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
				tarbar: ['主页', '歌曲', '专辑', '动态', '视频']
			};
		},
		onLoad(e) {
			console.log(e.id)
			this.getlivedetail(e.id)
		},
		methods: {
			getlivedetail(id) {
				uni.request({
					url: `${helper.url}/user/event?uid=${id}`,
					success: (res) => {
						console.log(res)
					}
				})
			},
			back() {
				uni.reLaunch({
					url: '/pages/concern/concern'
				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.love {
		width: 100%;
		.header-bg {
			opacity: .8;
			// height: 50%;
		}

		.header {
			padding: 30rpx 20rpx;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 140rpx;

			.header-left,
			.header-right {
				z-index: 5;
				width: 50rpx;
				height: 50rpx;
			}

		}

		.bg {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #151515;
		}

		.about {
			position: relative;
			.top {
				position: absolute;
				top: -50rpx;
				left: 3%;
				width: 94%;
				// height: 400rpx;
				background-color: #000;
				opacity: .8;
				border-radius: 14rpx;
				.topbox {
					position: relative;
					width: 100%;
					height: 100%;
					.pic {
						position: absolute;
						top: -90rpx;
						left: 50%;
						transform: translateX(-50%);
						width: 140rpx;
						height: 140rpx;
						// overflow: hidden;
						.picbox {
							position: relative;
							width: 100%;
							height: 100%;
							.Pendants {
								z-index: 5;
								top: -35rpx;
								left: 50%;
								transform: translateX(-50%);
								position: absolute;
								width: 145%;
								height: 145%;
							}
							.img-tit {
								position: absolute;
								overflow: hidden;
								border-radius: 50%;
								width: 100%;
								height: 100%;
							}
						}
					}
					
					.name {
						display: flex;
						justify-content: center;
						align-items: center;
						padding-top: 80rpx;
						color: #fff;
						font-weight: 550;
						font-size: 38rpx;
						text-align: center;
						.wyy {
							margin: 0 20rpx;
							height: 45rpx;
							vertical-align: middle;
						}
						.vip {
							height: 40rpx;
						}
					}
					
					.livenum,
					.detail,
					.box {
						margin-top: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #666;
						font-size: 28rpx;
						.t2 {
							margin: 0 30rpx;
						}
					}
					
					.box {
						border-bottom: 1rpx solid #666;
						padding-bottom: 50rpx;
						.focus,
						.chat {
							padding: 6rpx 45rpx;
							// background-color: #fff;
							border-radius: 40rpx;
							border: 1rpx solid #666;
							color: #fff;
						}
						.chat {
							margin: 0 20rpx;
						}
						.more {
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 15rpx;
							width: 55rpx;
							height: 55rpx;
							border: 1rpx solid #666;
							border-radius: 50%;
							.more-icon {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
					
					.else {
						margin-top: 160rpx;
						.tarbar {
							padding-bottom: 35rpx;
							color: #fff;
							display: flex;
							justify-content: space-around;
						}
					}
				}
				
			}
		}

	}
</style>