<template>
	<view class="livehome">
		<view class="announcement">
			<view class="top">
				<view class="left">
					<view class="top-icon">
						<image src="../../static/img/2.png" mode="heightFix"></image>
					</view>
					<view class="title">
						音乐公告板
					</view>
				</view>
				<view class="right">
					<text class="t4">124</text>
					<view class="addlive">
						<image src="/static/icon/点赞1.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="con">
				珂朵莉,世界第一可爱
			</view>
			
			<view class="musice">
				<view class="musice-pic">
					<image src="/static/video/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="text">
					<view class="title">
						把回忆拼好给你
					</view>
					<text class="t5">-</text>
					<view class="name">
						王拾浪
					</view>
				</view>
			</view>
		</view>
		
		<view class="hotopus">
			<view class="title">
				TA的热门作品
			</view>
			<view class="hotlist">
				<view class="hot-pic">
					<image src="/static/video/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="hot-detail">
					<view class="hot-title">
						把回忆拼好给你
					</view>
					<view class="hot-name">
						王拾浪
					</view>
				</view>
			</view>
			<view class="hotlist">
				<view class="hot-pic">
					<image src="/static/video/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="hot-detail">
					<view class="hot-title">
						把回忆拼好给你
					</view>
					<view class="hot-name">
						王拾浪
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="baike">
			<view class="bai-title">
				艺人百科
			</view>
			
			<view class="bai-illustrate">
				<view class="bai-box">
					<view class="bai-icon">
						<image src="/static/img/wyy.png" mode="heightFix"></image>
					</view>
					<view class="bai-wyy">
						网易云音乐人
					</view>
				</view>
				
				<view class="bai-name">
					艺人名:<text class="t11">王拾浪</text>
				</view>
				<view class="bai-name">
					身份:<text class="t11">歌手、作词、作曲</text>
				</view>
				<view class="bai-name">
					歌手简介:<text class="t11">kkkkkkkkkkk</text>
				</view>
			</view>
			
			<view class="bg-pic">
				<view class="bg-icon">
					<image src="/static/video/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="bai-text-box">
					<view class="bg-text">
						第2届网易云音乐原创人aaaaaaaa
					</view>
					<view class="back">
						年度最佳演绎-获奖
					</view>
						
				</view>
				<view class="see-all">
					全部<view class="all-pic">
						<image src="/static/icon/前往.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<view class="see-more">
				查看更多<view class="more-icon">
					<image src="/static/icon/前往.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"liveuserhome",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.livehome {
		width: 100%;
		padding: 20rpx;
		.announcement {
			border-radius: 14rpx;
			background-color: #666;
			padding: 20rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				.left {
					display: flex;
					align-items: center;
					.top-icon {
						margin-right: 12rpx;
						height: 35rpx;
					}
				}
				.right {
					display: flex;
					.addlive {
						width: 40rpx;
						height: 40rpx;
					}
					.t4 {
						margin-right: 10rpx;
					}
				}
			}
			
			.con {
				color: #fff;
				padding: 20rpx 0;
			}
			
			.musice {
				border-radius: 14rpx;
				display: flex;
				background-color: #999;
				.musice-pic {
					margin-right: 20rpx;
					width: 85rpx;
					height: 85rpx;
					border-radius: 14rpx;
					overflow: hidden;
				}
				.text {
					color: #fff;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					.t5 {
						margin: 0 5rpx;
					}
				}
			}
		}
	
		.hotopus,
		.baike {
			border-radius: 14rpx;
			padding: 20rpx;
			margin-top: 30rpx;
			background-color: #666;
			.title,
			.bai-title {
				margin-bottom: 20rpx;
				font-size: 38rpx;
				font-weight: 550;
				color: #fff;
			}
			.hotlist:last-child {
				margin-bottom: 0;
			}
			.hotlist {
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				.hot-pic {
					margin-right: 20rpx;
					width: 100rpx;
					height: 100rpx;
					border-radius: 14rpx;
					overflow: hidden;
				}
				.hot-detail {
					.hot-title {
						color: #fff;
						font-weight: 530;
					}
					.hot-name {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	
		.baike {
			color: #999;
			.bai-illustrate {
				.bai-box {
					display: flex;
					.bai-icon {
						height: 38rpx;
					}
					.bai-wyy {
						margin-left: 10rpx;
					}
				}
				.bai-name {
					margin-top: 20rpx;
					.t11 {
						margin-left: 10rpx;
					}
				}
				.bai-name:last-child {
					margin-bottom: 40rpx;
				}
			}
			.bg-pic {
				padding: 20rpx;
				display: flex;
				align-items: center;
				height: 150rpx;
				border-top: 1rpx solid #999;
				border-bottom: 1rpx solid #999;
				.bg-icon {
					margin-right: 30rpx;
					width: 120rpx;
					height: 120rpx;
					overflow: hidden;
					border-radius: 50%;
				}
				.bai-text-box {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: calc(750rpx - 405rpx);
					.bg-text,
					.back {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.bg-text {
						font-size: 32rpx;
						color: #fff;
					}
					.back {
						margin-top: 10rpx;
						font-size: 26rpx;
					}
				}
				.see-all {
					white-space: nowrap;
					height: 40rpx;
					display: flex;
					align-items: center;
					line-height: 40rpx;
					.all-pic {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
			.see-more {
				margin: 40rpx 0 20rpx; 
				display: flex;
				justify-content: center;
				height: 40rpx;
				line-height: 40rpx;
				.more-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>