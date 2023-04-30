<template>
	<view class="video">
		<view class="topvideo">
			<view class="back" @click="back" v-show="state">
				<image src="../../static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>
			<!-- 视频标签 -->
			<video src="/static/video/すずめfeat十明.mp4" class="mv" controls page-gesture="true" enable-play-gesture="true"poster="/static/video/1.jpg" autoplay @play="play"></video>
		</view>
		
		<view class="bottomcont">
			<view class="header">
				<!-- briefly 简述 -->
				<view class="briefly">
					<text class="t1">简介</text>
				</view>
				<!-- remarks 评论 -->
				<view class="remarks">
					<text class="t2">评论</text>
				</view>
				<view class="title">
					<!-- 音乐图标 -->
					<view class="musicicon">
						<image src="../../static/video/音乐，符号2.png" mode="aspectFit"></image>
					</view>
					<!-- 滑动的歌曲名称 -->
					<view class="tit">
						すずめfeat十明
					</view>
					<!-- 添加到喜欢图标 -->
					<view class="liveicon">
						<image src="../../static/video/爱心.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				state: false,
				index: null,
				name: null
			};
		},
		onLoad(e) {
			console.log(e)
			this.name = e.title
			this.id = e.id
			this.index = e.index
		},
		methods: {
			back() {
				if(this.index == 1) {
					uni.reLaunch({
							url: `/pages/playlist/playlist?id=${this.id}`
					})
				}else if(this.index == 2) {
					uni.reLaunch({
							url: `/pages/goindex/goindex?name=${this.name}`
					})
				}
		},
			play() {
				this.state = !this.state
			}
		}
	}
</script>

<style lang="scss">
	.video {
		
		.topvideo {
			position: relative;
			width: 750rpx;
			height: 420rpx;
			.mv {
				width: 100%;
				height: 100%;
			}
			.back {
				z-index: 99;
				position: absolute;
				top: 20rpx;
				left: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}
		
		.bottomcont {
			
			.header {
				padding: 20rpx 35rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				background-color: #202023;
				flex-wrap: nowrap;
				border-bottom: 2rpx solid rgba(255,255,255,.4);
				.briefly {
					font-weight: 600;
					white-space: nowrap;
					flex: 1;
					margin-right: 40rpx;
				}
				.remarks {
					white-space: nowrap;
					flex: 1;
				}
				.title {
					white-space: nowrap;
					width: 300rpx;
					margin-left: 200rpx;
					flex: 6;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.musicicon {
						width: 30rpx;
						height: 30rpx;
					}
					.liveicon {
						width: 45rpx;
						height: 45rpx;
					}
					.tit {
						width: 280rpx;
						text-align: center;
						color: #fff;
					}
				}
			}
		}
	}
</style>
